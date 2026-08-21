import { NextResponse } from "next/server";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

type GenerateInput = {
  vibe: string;
  tropes: string[];
  loveInterest: string;
  pov: string;
  payoff: string;
  ending: string;
};

type Outline = {
  blocked?: boolean;
  message?: string;
  title: string;
  premise: string;
  protagonist: string;
  loveInterest: string;
  beats: string[];
  emotionalArc: string;
};

const CONTENT_RULES = `
Content rules:
- Do not write explicit sexual content.
- Do not include minors in romantic or sexual contexts.
- Do not use real people.
- Do not use copyrighted franchise characters.
- Use original fictional characters and settings inspired by the requested tropes.
`.trim();

function getHeaders(apiKey: string) {
  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "Ficlet",
  };
}

function extractJson(raw: string) {
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}

// Step 1: plan the scene (non-streaming)
async function generateOutline(
  apiKey: string,
  model: string,
  input: GenerateInput
): Promise<Outline> {
  const systemPrompt = `
You are a story architect for Ficlet, an app that creates personalized trope-based fantasy scenes.

Your job is to plan ONE emotionally compelling scene based on the user's story ingredients.
Do not write the full scene yet. Just plan it.

${CONTENT_RULES}

Return ONLY valid JSON with this exact structure:
{
  "blocked": false,
  "title": "a short evocative title",
  "premise": "1-2 sentence premise",
  "protagonist": "brief description of the protagonist",
  "loveInterest": "brief description of the love interest",
  "beats": ["beat 1", "beat 2", "beat 3", "beat 4", "beat 5"],
  "emotionalArc": "how the emotion shifts from start to end"
}

If the request violates the content rules, return ONLY:
{
  "blocked": true,
  "message": "Ficlet can't generate that type of content. Try a fictional fantasy romance scenario instead."
}

Make the beats specific, vivid, and emotionally charged. Include tension, a turning point, and the requested emotional payoff.
  `.trim();

  const userPrompt = `
Story ingredients:
Vibe: ${input.vibe}
Tropes: ${input.tropes.join(", ")}
Love interest archetype: ${input.loveInterest}
Point of view: ${input.pov}
Emotional payoff: ${input.payoff}
Ending style: ${input.ending}

Plan the scene and return only the JSON.
  `.trim();

  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: getHeaders(apiKey),
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 800,
    }),
  });

  if (!response.ok) {
    throw new Error("Outline generation failed");
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("No outline returned");
  }

  const parsed = extractJson(content);

  if (parsed?.blocked) {
    return {
      blocked: true,
      message: parsed.message,
      title: "",
      premise: "",
      protagonist: "",
      loveInterest: "",
      beats: [],
      emotionalArc: "",
    };
  }

  if (parsed?.beats) {
    return {
      title: parsed.title || "Untitled Ficlet",
      premise: parsed.premise || "",
      protagonist: parsed.protagonist || "",
      loveInterest: parsed.loveInterest || "",
      beats: parsed.beats || [],
      emotionalArc: parsed.emotionalArc || "",
    };
  }

  // Fallback if JSON parsing failed
  return {
    title: "Untitled Ficlet",
    premise: "",
    protagonist: "",
    loveInterest: input.loveInterest,
    beats: [
      "Establish the setting and tension",
      "Bring the two characters together",
      "Raise the emotional stakes",
      "Deliver the emotional payoff",
      "Land the ending",
    ],
    emotionalArc: "tension to release",
  };
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing OPENROUTER_API_KEY. Check your .env.local file." },
      { status: 500 }
    );
  }

  let input: GenerateInput;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }

  if (!input.tropes || input.tropes.length === 0) {
    return NextResponse.json(
      { error: "Please choose at least one trope." },
      { status: 400 }
    );
  }

  // ---- Step 1: plan the scene ----
  let outline: Outline;
  try {
    outline = await generateOutline(apiKey, model, input);
  } catch (error) {
    console.error("Outline error:", error);
    return NextResponse.json(
      { error: "Could not plan the story. Please try again." },
      { status: 500 }
    );
  }

  // If blocked, return normal JSON (not a stream)
  if (outline.blocked) {
    return NextResponse.json({
      blocked: true,
      message:
        outline.message ||
        "Ficlet can't generate that type of content. Try a fictional fantasy romance scenario instead.",
    });
  }

  // ---- Step 2: stream the prose ----
  const encoder = new TextEncoder();

  const proseSystemPrompt = `
You are a skilled fiction writer for Ficlet.

Write ONE vivid, emotionally immersive scene based on the provided outline.

${CONTENT_RULES}

Writing guidelines:
- Show, don't tell.
- Use vivid sensory detail.
- Write natural, character-revealing dialogue.
- Build emotional tension and let it breathe.
- Stay tightly focused on the scene; no summarizing or rushing.
- Match the requested point of view exactly.
- Match the requested tone and ending style.
- Aim for 700 to 1000 words.
- Always complete the scene fully with a clear, satisfying ending. Never stop mid-scene.

Write ONLY the story prose. Do not include the title, commentary, or explanations.
  `.trim();

  const proseUserPrompt = `
Write the scene using this plan:

Title: ${outline.title}
Premise: ${outline.premise}
Protagonist: ${outline.protagonist}
Love interest: ${outline.loveInterest}
Emotional arc: ${outline.emotionalArc}

Scene beats to follow in order:
${outline.beats.map((b, i) => `${i + 1}. ${b}`).join("\n")}

Additional story ingredients:
Vibe: ${input.vibe}
Tropes: ${input.tropes.join(", ")}
Point of view: ${input.pov}
Emotional payoff: ${input.payoff}
Ending style: ${input.ending}

Now write the scene prose only.
  `.trim();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Send meta first so the client can show title/premise immediately
        const meta = {
          type: "meta",
          title: outline.title,
          premise: outline.premise,
        };
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(meta)}\n\n`));

        const response = await fetch(OPENROUTER_URL, {
          method: "POST",
          headers: getHeaders(apiKey),
          body: JSON.stringify({
            model,
            stream: true,
            messages: [
              { role: "system", content: proseSystemPrompt },
              { role: "user", content: proseUserPrompt },
            ],
            temperature: 0.8,
            max_tokens: 2500,
          }),
        });

        if (!response.ok || !response.body) {
          const errEvent = {
            type: "error",
            message: "The AI provider returned an error while writing.",
          };
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(errEvent)}\n\n`)
          );
          controller.close();
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;

            const data = trimmed.slice(5).trim();
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              const delta = parsed?.choices?.[0]?.delta?.content;
              if (delta) {
                const textEvent = { type: "text", content: delta };
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify(textEvent)}\n\n`)
                );
              }
            } catch {
              // ignore malformed chunks
            }
          }
        }

        const doneEvent = { type: "done" };
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(doneEvent)}\n\n`));
        controller.close();
      } catch (error) {
        console.error("Stream error:", error);
        const errEvent = {
          type: "error",
          message: "Something went wrong while streaming the story.",
        };
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(errEvent)}\n\n`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}