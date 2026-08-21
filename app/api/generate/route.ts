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

function extractJson(raw: string) {
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) return null;

  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing OPENROUTER_API_KEY. Check your .env.local file." },
        { status: 500 }
      );
    }

    const body: GenerateInput = await request.json();

    if (!body.tropes || body.tropes.length === 0) {
      return NextResponse.json(
        { error: "Please choose at least one trope." },
        { status: 400 }
      );
    }

    const systemPrompt = `
You are Ficlet, an AI story engine that creates personalized, trope-based fantasy/fanfic-style scenes and short chapters.

Your job is to write a single emotionally engaging scene based on the user's selected story ingredients.

Content rules:
- Do not write explicit sexual content.
- Do not include minors in romantic or sexual contexts.
- Do not use real people.
- Do not use copyrighted franchise characters.
- Use original fictional characters and settings inspired by the requested tropes.
- Keep the tone emotionally compelling, immersive, and readable.

Output rules:
- Return ONLY valid JSON.
- Do not include markdown.
- Do not include explanations.
- Use this exact JSON structure:

{
  "title": "string",
  "premise": "string",
  "story": "string"
}

If the request violates the content rules, return:

{
  "blocked": true,
  "message": "Ficlet can't generate that type of content. Try a fictional fantasy romance scenario instead."
}

The story should be around 700 to 1000 words.
    `.trim();

    const userPrompt = `
Create a Ficlet using these story ingredients:

Vibe: ${body.vibe}
Tropes: ${body.tropes.join(", ")}
Love interest archetype: ${body.loveInterest}
Point of view: ${body.pov}
Emotional payoff: ${body.payoff}
Ending style: ${body.ending}

Remember:
- Return only valid JSON.
- Include title, premise, and story.
- The story should feel emotionally satisfying and trope-driven.
    `.trim();

    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Ficlet",
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 1800,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter error:", errorText);

      return NextResponse.json(
        {
          error:
            "The AI provider returned an error. Check your OpenRouter API key, model name, and credits.",
        },
        { status: 500 }
      );
    }

    const data = await response.json();

    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "The AI did not return a story. Please try again." },
        { status: 500 }
      );
    }

    const parsed = extractJson(content);

    if (parsed?.blocked) {
      return NextResponse.json({
        blocked: true,
        message:
          parsed.message ||
          "Ficlet can't generate that type of content. Try a fictional fantasy romance scenario instead.",
      });
    }

    if (parsed?.story) {
      return NextResponse.json({
        title: parsed.title || "Untitled Ficlet",
        premise: parsed.premise || "",
        story: parsed.story,
      });
    }

    // Fallback if the AI did not return valid JSON
    return NextResponse.json({
      title: "Untitled Ficlet",
      premise: "",
      story: content,
    });
  } catch (error) {
    console.error("Generate API error:", error);

    return NextResponse.json(
      { error: "Something went wrong while generating your Ficlet." },
      { status: 500 }
    );
  }
}