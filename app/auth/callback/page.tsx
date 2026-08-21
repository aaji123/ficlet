"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const redirect = params.get("redirect") || "/generate";

    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        router.replace(error ? "/login" : redirect);
      });
    } else {
      supabase.auth.getSession().then(({ data }) => {
        router.replace(data.session ? redirect : "/login");
      });
    }
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
        <p className="mt-4 text-neutral-400">Signing you in…</p>
      </div>
    </main>
  );
}