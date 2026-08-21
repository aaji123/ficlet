import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-neutral-950 pb-20">
      <header className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-950/80 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link href="/" className="font-semibold text-purple-400">
            ← Home
          </Link>
          <span className="text-sm text-neutral-500">Ficlet</span>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">Simple pricing</h1>
          <p className="mt-3 text-neutral-400">
            Start free. Upgrade when you want more stories.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {/* Free */}
          <div className="flex flex-col rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
            <h2 className="text-lg font-semibold">Free</h2>
            <p className="mt-2 text-3xl font-bold">
              $0<span className="text-base font-normal text-neutral-400"> </span>
            </p>
            <p className="mt-1 text-sm text-neutral-400">Try Ficlet free.</p>

            <ul className="mt-6 flex-1 space-y-3 text-sm text-neutral-300">
              <li>• 1 free Ficlet</li>
              <li>• Just your email</li>
              <li>• No credit card</li>
            </ul>

            <Link
              href="/generate"
              className="mt-8 rounded-xl border border-neutral-700 px-5 py-3 text-center font-semibold text-white transition hover:bg-neutral-800"
            >
              Start free
            </Link>
          </div>

          {/* Dreamer Pass */}
          <div className="relative flex flex-col rounded-2xl border-2 border-purple-600 bg-neutral-900 p-6 shadow-lg shadow-purple-900/30">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-purple-600 px-3 py-1 text-xs font-semibold text-white">
              Most popular
            </span>

            <h2 className="text-lg font-semibold">Dreamer Pass</h2>
            <p className="mt-2 text-3xl font-bold">
              $5<span className="text-base font-normal text-neutral-400">/month</span>
            </p>
            <p className="mt-1 text-sm text-neutral-400">For regular dreamers.</p>

            <ul className="mt-6 flex-1 space-y-3 text-sm text-neutral-300">
              <li>• 10 Ficlets every day</li>
              <li>• Save your story library</li>
              <li>• All trope packs</li>
              <li>• Cancel anytime</li>
            </ul>

            <Link
              href="/generate"
              className="mt-8 rounded-xl bg-purple-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-purple-500"
            >
              Get Dreamer Pass
            </Link>
          </div>

          {/* Credit Pack */}
          <div className="flex flex-col rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
            <h2 className="text-lg font-semibold">Credit Pack</h2>
            <p className="mt-2 text-3xl font-bold">
              $3<span className="text-base font-normal text-neutral-400"> one-time</span>
            </p>
            <p className="mt-1 text-sm text-neutral-400">No subscription.</p>

            <ul className="mt-6 flex-1 space-y-3 text-sm text-neutral-300">
              <li>• 10 Ficlet credits</li>
              <li>• Credits never expire</li>
              <li>• Use whenever you like</li>
            </ul>

            <Link
              href="/generate"
              className="mt-8 rounded-xl border border-neutral-700 px-5 py-3 text-center font-semibold text-white transition hover:bg-neutral-800"
            >
              Buy credits
            </Link>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-neutral-500">
          Paid checkout is coming online soon. You can always start with a free
          Ficlet today.
        </p>
      </div>
    </main>
  );
}