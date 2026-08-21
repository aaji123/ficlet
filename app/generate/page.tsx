"use client";

import { useState } from "react";

type FicletResult = {
  title: string;
  premise: string;
  story: string;
};

export default function GeneratePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<FicletResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [vibe, setVibe] = useState("Dark Romance");
  const [tropes, setTropes] = useState<string[]>([]);
  const [loveInterest, setLoveInterest] = useState("Morally Grey Prince");
  const [pov, setPov] = useState("Second Person (You)");
  const [payoff, setPayoff] = useState("Confession");
  const [ending, setEnding] = useState("Bittersweet");

  const availableTropes = [
    "Enemies to Lovers",
    "Forced Proximity",
    "One Bed",
    "Fake Dating",
    "Slow Burn",
    "Arranged Marriage",
    "Grumpy x Sunshine",
    "Hurt/Comfort",
  ];

  const toggleTrope = (trope: string) => {
    setTropes((prev) =>
      prev.includes(trope)
        ? prev.filter((t) => t !== trope)
        : [...prev, trope]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (tropes.length === 0) {
      setError("Please choose at least one trope.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vibe,
          tropes,
          loveInterest,
          pov,
          payoff,
          ending,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Generation failed.");
      }

      if (data.blocked) {
        throw new Error(data.message || "Content blocked.");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  if (result) {
    return (
      <main className="min-h-screen bg-neutral-950 pb-20">
        <header className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-950/80 px-6 py-4 backdrop-blur-md">
          <div className="mx-auto flex max-w-2xl items-center justify-between">
            <button
              onClick={() => setResult(null)}
              className="font-semibold text-purple-400"
            >
              ← New Ficlet
            </button>
            <span className="text-sm text-neutral-500">Your result</span>
          </div>
        </header>

        <div className="mx-auto max-w-2xl px-6 py-10">
          <h1 className="text-3xl font-bold">{result.title}</h1>

          {result.premise && (
            <p className="mt-4 rounded-xl border border-purple-900/40 bg-purple-950/20 p-4 text-purple-200">
              {result.premise}
            </p>
          )}

          <div className="mt-8 whitespace-pre-wrap leading-relaxed text-neutral-200">
            {result.story}
          </div>

          <button
            onClick={() => setResult(null)}
            className="mt-10 w-full rounded-xl bg-purple-600 px-6 py-4 text-lg font-semibold text-white transition-all hover:bg-purple-500 active:scale-95"
          >
            Create another Ficlet
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 pb-20">
      <header className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-950/80 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <a href="/" className="font-semibold text-purple-400">
            ← Back
          </a>
          <h1 className="text-lg font-bold">Create your Ficlet</h1>
          <div className="w-12" />
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-lg space-y-8 px-6 py-8"
      >
        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-300">
            Story Vibe
          </label>
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
          <label className="block text-sm font-medium text-neutral-300">
            Choose your Tropes
          </label>
          <div className="flex flex-wrap gap-2">
            {availableTropes.map((trope) => (
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
          <label className="block text-sm font-medium text-neutral-300">
            Love Interest Archetype
          </label>
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
          <label className="block text-sm font-medium text-neutral-300">
            Point of View
          </label>
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
          <label className="block text-sm font-medium text-neutral-300">
            Emotional Payoff
          </label>
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
          <label className="block text-sm font-medium text-neutral-300">
            Ending Style
          </label>
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

        {error && (
          <div className="rounded-lg border border-red-900 bg-red-950/30 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || tropes.length === 0}
          className="w-full rounded-xl bg-purple-600 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-purple-900/30 transition-all hover:bg-purple-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Dreaming up your story..." : "Generate my free Ficlet"}
        </button>

        {tropes.length === 0 && (
          <p className="text-center text-sm text-neutral-500">
            Choose at least one trope to generate.
          </p>
        )}
      </form>
    </main>
  );
}