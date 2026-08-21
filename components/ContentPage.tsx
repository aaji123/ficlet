import Link from "next/link";
import { ReactNode } from "react";

export default function ContentPage({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
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

      <div className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="text-3xl font-bold">{title}</h1>
        {subtitle && <p className="mt-2 text-neutral-400">{subtitle}</p>}
        <div className="mt-8 space-y-6 leading-relaxed text-neutral-300">
          {children}
        </div>
      </div>
    </main>
  );
}