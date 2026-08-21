"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Phase 4 — connect Supabase magic link here
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-neutral-950 pb-20">
      <header className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-950/80 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <Link href="/" className="font-semibold text-purple-400">
            ← Home
          </Link>
          <span className="text-sm text-neutral-500">Ficlet</span>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-6 py-16">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="mt-2 text-neutral-400">
          Log in with your email. No password needed.
        </p>

        {submitted ? (
          <div className="mt-8 rounded-xl border border-purple-900/40 bg-purple-950/20 p-6">
            <p className="text-purple-200">
              Login is almost ready. In the meantime, you can generate a free
              Ficlet right now.
            </p>
            <Link
              href="/generate"
              className="mt-4 inline-block rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-500"
            >
              Generate my free Ficlet
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-300">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-neutral-700 bg-neutral-900 p-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-purple-600 px-6 py-4 font-semibold text-white transition-all hover:bg-purple-500 active:scale-95"
            >
              Send magic link
            </button>

            <p className="text-center text-xs text-neutral-500">
              We&apos;ll email you a secure link to sign in. No password needed.
            </p>
          </form>
        )}
      </div>
    </main>
  );
}