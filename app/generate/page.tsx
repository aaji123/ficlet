"use client";

import { useState } from "react";

export default function GeneratePage() {
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [vibe, setVibe] = useState("Dark Romance");
  const [tropes, setTropes] = useState<string[]>([]);
  const [loveInterest, setLoveInterest] = useState("Morally Grey Prince");
  const [pov, setPov] = useState("Second Person (You)");
  const [payoff, setPayoff] = useState("Confession");
  const [ending, setEnding] = useState("Bittersweet");

  const availableTropes = [
    "Enemies to Lovers", "Forced Proximity", "One Bed", "Fake Dating", 
    "Slow Burn", "Arranged Marriage", "Grumpy x Sunshine", "Hurt/Comfort"
  ];

  const toggleTrope = (trope: string) => {
    setTropes((prev) =>
      prev.includes(trope) ? prev.filter((t) => t !== trope) : [...prev, trope]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Later, we will connect this to the AI API
    setTimeout(() => {
      setIsLoading(false);
      alert("Generation complete! (Next step: connect to AI and show result page)");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-neutral-950 pb-20">
      <header className="sticky top-0 z-10 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
        <a href="/" className="text-purple-400 font-semibold">← Back</a>
        <h1 className="text-lg font-bold">Create your Ficlet</h1>
        <div className="w-12" /> {/* Spacer for centering */}
      </header>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto px-6 py-8 space-y-8">
        
        {/* Vibe */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-300">Story Vibe</label>
          <select value={vibe} onChange={(e) => setVibe(e.target.value)} className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none">
            <option>Dark Romance</option>
            <option>Cozy Fantasy</option>
            <option>Gothic Horror</option>
            <option>Romantic Fantasy</option>
            <option>Academy Setting</option>
          </select>
        </div>

        {/* Tropes */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-neutral-300">Choose your Tropes (Pick 2-4)</label>
          <div className="flex flex-wrap gap-2">
            {availableTropes.map((trope) => (
              <button
                key={trope}
                type="button"
                onClick={() => toggleTrope(trope)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
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

        {/* Love Interest */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-300">Love Interest Archetype</label>
          <select value={loveInterest} onChange={(e) => setLoveInterest(e.target.value)} className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none">
            <option>Morally Grey Prince</option>
            <option>Cold Assassin</option>
            <option>Charming Villain</option>
            <option>Stoic Bodyguard</option>
            <option>Sarcastic Rival</option>
          </select>
        </div>

        {/* POV */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-300">Point of View</label>
          <select value={pov} onChange={(e) => setPov(e.target.value)} className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none">
            <option>Second Person (You)</option>
            <option>First Person (I)</option>
            <option>Third Person (She/He/They)</option>
          </select>
        </div>

        {/* Emotional Payoff */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-300">Emotional Payoff</label>
          <select value={payoff} onChange={(e) => setPayoff(e.target.value)} className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none">
            <option>Confession</option>
            <option>Almost Kiss</option>
            <option>Jealousy Scene</option>
            <option>Caretaking / Hurt-Comfort</option>
            <option>Betrayal Reveal</option>
          </select>
        </div>

        {/* Ending */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-300">Ending Style</label>
          <select value={ending} onChange={(e) => setEnding(e.target.value)} className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none">
            <option>Happy</option>
            <option>Bittersweet</option>
            <option>Tragic</option>
            <option>Cliffhanger</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || tropes.length === 0}
          className="w-full rounded-xl bg-purple-600 px-6 py-4 font-semibold text-white text-lg shadow-lg shadow-purple-900/30 hover:bg-purple-500 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Dreaming up your story..." : "Generate my free Ficlet"}
        </button>
        
        {tropes.length === 0 && (
          <p className="text-center text-sm text-red-400">Please select at least one trope.</p>
        )}
      </form>
    </main>
  );
}