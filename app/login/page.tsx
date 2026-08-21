"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

function LoginForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/generate";

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirect)}`,
      },
    });

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
    } else {
      setStatus("sent");
    }
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
        <h1 className="text-3xl font-bold">Welcome</h1>
        <p className="mt-2 text-neutral-400">
          Log in with your email. No password needed.
        </p>

        {status === "sent" ? (
          <div className="mt-8 rounded-xl border border-purple-900/40 bg-purple-950/20 p-6">
            <p className="text-purple-200">
              Check your email! We sent you a magic link. Click it to sign in.
            </p>
            <p className="mt-2 text-sm text-neutral-400">
              (If you don&apos;t see it, check your spam folder.)
            </p>
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

            {status === "error" && errorMsg && (
              <div className="rounded-lg border border-red-900 bg-red-950/30 p-3 text-sm text-red-300">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-xl bg-purple-600 px-6 py-4 font-semibold text-white transition-all hover:bg-purple-500 active:scale-95 disabled:opacity-50"
            >
              {status === "sending" ? "Sending…" : "Send magic link"}
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

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-950" />}>
      <LoginForm />
    </Suspense>
  );
}