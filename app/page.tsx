import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-sm uppercase tracking-widest text-purple-400 mb-4 font-semibold">
          Ficlet
        </p>

        <h1 className="text-4xl sm:text-5xl font-bold max-w-xl leading-tight">
          Generate the story you’ve been craving.
        </h1>

        <p className="mt-4 max-w-md text-neutral-400 text-lg">
          Pick your tropes, choose your dream scenario, and get a personalized fantasy chapter instantly.
        </p>

        <Link
          href="/generate"
          className="mt-8 rounded-xl bg-purple-600 px-8 py-4 font-semibold text-white text-lg shadow-lg shadow-purple-900/30 hover:bg-purple-500 transition-all active:scale-95"
        >
          Get my free Ficlet
        </Link>

        <p className="mt-4 text-sm text-neutral-500">
          No credit card required.
        </p>
      </div>
      
      <footer className="py-6 text-center text-xs text-neutral-600">
        © {new Date().getFullYear()} Ficlet. All rights reserved.
      </footer>
    </main>
  );
}