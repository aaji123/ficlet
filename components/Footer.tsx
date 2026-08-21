import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 px-6 py-10">
      <div className="mx-auto max-w-lg">
        <div className="grid grid-cols-2 gap-4 text-sm text-neutral-400 sm:grid-cols-3">
          <Link href="/pricing" className="hover:text-white">
            Pricing
          </Link>
          <Link href="/login" className="hover:text-white">
            Login
          </Link>
          <Link href="/dashboard" className="hover:text-white">
            Dashboard
          </Link>
          <Link href="/faq" className="hover:text-white">
            FAQ
          </Link>
          <Link href="/support" className="hover:text-white">
            Support
          </Link>
          <Link href="/refunds" className="hover:text-white">
            Refunds
          </Link>
          <Link href="/terms" className="hover:text-white">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>
        </div>

        <p className="mt-8 text-xs text-neutral-600">
          © Ficlet. All rights reserved.
        </p>
      </div>
    </footer>
  );
}