import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-6 py-5">
        <span className="font-semibold text-purple-400">Ficlet</span>

        <nav className="flex gap-5 text-sm text-neutral-400">
          <Link href="/pricing" className="hover:text-white">
            Pricing
          </Link>
          <Link href="/login" className="hover:text-white">
            Login
          </Link>
        </nav>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-purple-400">
          Ficlet
        </p>

        <h1 className="max-w-xl text-4xl font-bold leading-tight sm:text-5xl">
          Generate the story you’ve been craving.
        </h1>

        <p className="mt-4 max-w-md text-lg text-neutral-400">
          Pick your tropes, choose your dream scenario, and get a personalized
          fantasy chapter instantly.
        </p>

        <Link
          href="/generate"
          className="mt-8 rounded-xl bg-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-purple-900/30 transition-all hover:bg-purple-500 active:scale-95"
        >
          Get my free Ficlet
        </Link>

        <p className="mt-4 text-sm text-neutral-500">
          No credit card required.
        </p>
      </div>
    </main>
  );
}