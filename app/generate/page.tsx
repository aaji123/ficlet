"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

type Phase = "form" | "planning" | "streaming" | "done" | "paywall";

const AVAILABLE_TROPES = [
  "Enemies to Lovers",
  "Forced Proximity",
  "One Bed",
  "Fake Dating",
  "Slow Burn",
  "Arranged Marriage",
  "Grumpy x Sunshine",
  "Hurt/Comfort",
];

export default function GeneratePage() {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);

  const [phase, setPhase] = useState<Phase>("form");
  const [title, setTitle] = useState("");
  const [premise, setPremise] = useState("");
  const [chunks, setChunks] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [vibe, setVibe] = useState("Dark Romance");
  const [tropes, setTropes] = useState<string[]>([]);
  const [loveInterest, setLoveInterest] = useState("Morally Grey Prince");
  const [pov, setPov] = useState("Second Person (You)");
  const [payoff, setPayoff] = useState("Confession");
  const [ending, setEnding] = useState("Bittersweet");

  // Email gate state
  const [gateEmail, setGateEmail] = useState("");
  const [gateStatus, setGateStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [gateError, setGateError] = useState("");

  // On mount: restore form from localStorage + check auth
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ficlet-form");
      if (saved) {
        const f = JSON.parse(saved);
        if (f.vibe) setVibe(f.vibe);
        if (Array.isArray(f.tropes)) setTropes(f.tropes);
        if (f.loveInterest) setLoveInterest(f.loveInterest);
        if (f.pov) setPov(f.pov);
        if (f.payoff) setPayoff(f.payoff);
        if (f.ending) setEnding(f.ending);
      }
    } catch {}

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setAuthReady(true);
    });
  }, []);

  // Persist form selections so they survive the login redirect
  useEffect(() => {
    if (!authReady) return;
    localStorage.setItem(
      "ficlet-form",
      JSON.stringify({ vibe, tropes, loveInterest, pov, payoff, ending })
    );
  }, [vibe, tropes, loveInterest, pov, payoff, ending, authReady]);

  const toggleTrope = (trope: string) => {
    setTropes((prev) =>
      prev.includes(trope) ? prev.filter((t) => t !== trope) : [...prev, trope]
    );
  };

  const sendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setGateStatus("sending");
    setGateError("");

    const { error } = await supabase.auth.signInWithOtp({
      email: gateEmail,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?redirect=/generate`,
      },
    });

    if (error) {
      setGateStatus("error");
      setGateError(error.message);
    } else {
      setGateStatus("sent");
    }
  };

  const resetAll = () => {
    setPhase("form");
    setTitle("");
    setPremise("");
    setChunks([]);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tropes.length === 0) {
      setError("Please choose at least one trope.");
      return;
    }
    if (!user) return;

    setError(null);
    setTitle("");
    setPremise("");
    setChunks([]);
    setPhase("planning");

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const token = session?.access_token;
      if (!token) throw new Error("Please log in to generate.");

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ vibe, tropes, loveInterest, pov, payoff, ending }),
      });

      const contentType = response.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Generation failed.");
        if (data.blocked) throw new Error(data.message || "Content blocked.");
        if (data.paywall) {
          setPhase("paywall");
          return;
        }
        throw new Error("Unexpected response.");
      }

      if (!response.ok || !response.body) throw new Error("Generation failed.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() || "";

        for (const event of events) {
          const trimmed = event.trim();
          if (!trimmed.startsWith("data:")) continue;
          const dataStr = trimmed.slice(5).trim();
          if (!dataStr) continue;

          try {
            const parsed = JSON.parse(dataStr);
            if (parsed.type === "meta") {
              setTitle(parsed.title || "");
              setPremise(parsed.premise || "");
              setPhase("streaming");
            } else if (parsed.type === "text") {
              setChunks((prev) => [...prev, parsed.content]);
            } else if (parsed.type === "done") {
              setPhase("done");
            } else if (parsed.type === "error") {
              throw new Error(parsed.message || "Stream error.");
            }
          } catch (err: any) {
            if (!(err instanceof SyntaxError)) throw err;
          }
        }
      }

      setPhase("done");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setPhase("form");
    }
  };

  // ---------- PAYWALL VIEW ----------
  if (phase === "paywall") {
    return (
      <main className="min-h-screen bg-neutral-950 pb-20">
        <header className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-950/80 px-6 py-4 backdrop-blur-md">
          <div className="mx-auto flex max-w-2xl items-center justify-between">
            <Link href="/" className="font-semibold text-purple-400">
              ← Home
            </Link>
            <span className="text-sm text-neutral-500">Ficlet</span>
          </div>
        </header>

        <div className="mx-auto max-w-2xl px-6 py-16 text-center">
          <h1 className="text-3xl font-bold">You&apos;ve used your free Ficlet</h1>
          <p className="mt-4 text-neutral-400">
            Unlock more stories with the Dreamer Pass or a credit pack.
          </p>
          <Link
            href="/pricing"
            className="mt-8 inline-block rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-500"
          >
            See plans
          </Link>
          <button
            onClick={resetAll}
            className="mx-auto mt-6 block text-neutral-400 hover:text-white"
          >
            ← Back
          </button>
        </div>
      </main>
    );
  }

  // ---------- RESULT VIEW ----------
  if (phase === "planning" || phase === "streaming" || phase === "done") {
    return (
      <main className="min-h-screen bg-neutral-950 pb-20">
        <header className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-950/80 px-6 py-4 backdrop-blur-md">
          <div className="mx-auto flex max-w-2xl items-center justify-between">
            <button onClick={resetAll} className="font-semibold text-purple-400">
              ← New Ficlet
            </button>
            <span className="text-sm text-neutral-500">
              {phase === "planning" ? "Planning…" : "Your Ficlet"}
            </span>
          </div>
        </header>

        <div className="mx-auto max-w-2xl px-6 py-10">
          {phase === "planning" ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
              <p className="mt-6 text-neutral-400">Planning your story…</p>
            </div>
          ) : (
            <>
              {title && <h1 className="ficlet-fade text-3xl font-bold">{title}</h1>}
              {premise && (
                <p className="ficlet-fade mt-4 rounded-xl border border-purple-900/40 bg-purple-950/20 p-4 text-purple-200">
                  {premise}
                </p>
              )}
              <div className="mt-8 whitespace-pre-wrap leading-relaxed text-neutral-200">
                {chunks.map((chunk, i) => (
                  <span key={i} className="ficlet-fade">
                    {chunk}
                  </span>
                ))}
              </div>
              {phase === "done" && (
                <button
                  onClick={resetAll}
                  className="mt-10 w-full rounded-xl bg-purple-600 px-6 py-4 text-lg font-semibold text-white transition-all hover:bg-purple-500 active:scale-95"
                >
                  Create another Ficlet
                </button>
              )}
            </>
          )}
        </div>
      </main>
    );
  }

  // ---------- FORM VIEW ----------
  return (
    <main className="min-h-screen bg-neutral-950 pb-20">
      <header className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-950/80 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <Link href="/" className="font-semibold text-purple-400">
            ← Back
          </Link>
          <h1 className="text-lg font-bold">Create your Ficlet</h1>
          <div className="w-12" />
        </div>
      </header>

      <div className="mx-auto max-w-lg px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-300">Story Vibe</label>
            <select
              value={vibe}
              onChange={(e) => setVibe(e.target.value)}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-900 p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>Dark Romance</option>
              <option>Cozy Fantasy</option>
              <option>Gothic Horror</option>
              <option>Romantic Fantasy</option>
              <option>Academy Setting</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-neutral-300">Choose your Tropes</label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_TROPES.map((trope) => (
                <button
                  key={trope}
                  type="button"
                  onClick={() => toggleTrope(trope)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    tropes.includes(trope)
                      ? "bg-purple-600 text-white shadow-md shadow-purple-900/50"
                      : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                  }`}
                >
                  {trope}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-300">Love Interest Archetype</label>
            <select
              value={loveInterest}
              onChange={(e) => setLoveInterest(e.target.value)}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-900 p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>Morally Grey Prince</option>
              <option>Cold Assassin</option>
              <option>Charming Villain</option>
              <option>Stoic Bodyguard</option>
              <option>Sarcastic Rival</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-300">Point of View</label>
            <select
              value={pov}
              onChange={(e) => setPov(e.target.value)}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-900 p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>Second Person (You)</option>
              <option>First Person (I)</option>
              <option>Third Person (She/He/They)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-300">Emotional Payoff</label>
            <select
              value={payoff}
              onChange={(e) => setPayoff(e.target.value)}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-900 p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>Confession</option>
              <option>Almost Kiss</option>
              <option>Jealousy Scene</option>
              <option>Caretaking / Hurt-Comfort</option>
              <option>Betrayal Reveal</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-300">Ending Style</label>
            <select
              value={ending}
              onChange={(e) => setEnding(e.target.value)}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-900 p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>Happy</option>
              <option>Bittersweet</option>
              <option>Tragic</option>
              <option>Cliffhanger</option>
            </select>
          </div>

          {/* If logged in, show the generate button */}
          {authReady && user && (
            <>
              {error && (
                <div className="rounded-lg border border-red-900 bg-red-950/30 p-4 text-sm text-red-300">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={tropes.length === 0}
                className="w-full rounded-xl bg-purple-600 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-purple-900/30 transition-all hover:bg-purple-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Generate my free Ficlet
              </button>
              {tropes.length === 0 && (
                <p className="text-center text-sm text-neutral-500">
                  Choose at least one trope to generate.
                </p>
              )}
            </>
          )}
        </form>

        {/* If NOT logged in, show the email gate */}
        {authReady && !user && (
          <div className="mt-6 rounded-xl border border-purple-900/40 bg-purple-950/20 p-6">
            {gateStatus === "sent" ? (
              <div>
                <p className="text-purple-200">
                  Check your email! We sent you a magic link to unlock your free Ficlet.
                </p>
                <p className="mt-2 text-sm text-neutral-400">
                  (If you don&apos;t see it, check your spam folder.)
                </p>
              </div>
            ) : (
              <form onSubmit={sendMagicLink} className="space-y-3">
                <p className="font-medium text-neutral-100">
                  Enter your email to unlock your free Ficlet
                </p>
                <input
                  type="email"
                  required
                  value={gateEmail}
                  onChange={(e) => setGateEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-900 p-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {gateStatus === "error" && gateError && (
                  <p className="text-sm text-red-300">{gateError}</p>
                )}
                <button
                  type="submit"
                  disabled={gateStatus === "sending"}
                  className="w-full rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-500 disabled:opacity-50"
                >
                  {gateStatus === "sending" ? "Sending…" : "Email me my free Ficlet"}
                </button>
                <p className="text-xs text-neutral-500">1 free ficlet. No credit card.</p>
              </form>
            )}
          </div>
        )}
      </div>
    </main>
  );
}