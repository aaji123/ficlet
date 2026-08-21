import Link from "next/link";

export default function DashboardPage() {
  // TODO: Phase 4/6 — check auth, then show library, credits, and plan here
  const signedIn = false;

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

      <div className="mx-auto max-w-2xl px-6 py-16">
        {signedIn ? (
          <div>
            <h1 className="text-3xl font-bold">Your library</h1>
            <p className="mt-2 text-neutral-400">Your saved ficlets live here.</p>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-3xl font-bold">Your library</h1>
            <p className="mt-3 text-neutral-400">
              Sign in to save your ficlets, see your credits, and manage your
              plan.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/login"
                className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-500"
              >
                Log in
              </Link>
              <Link
                href="/generate"
                className="rounded-xl border border-neutral-700 px-6 py-3 font-semibold text-white transition hover:bg-neutral-800"
              >
                Generate a free Ficlet
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}