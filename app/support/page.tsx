import ContentPage from "@/components/ContentPage";
import Link from "next/link";

export default function SupportPage() {
  return (
    <ContentPage
      title="Support"
      subtitle="We keep things simple with email-only support."
    >
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
        <h2 className="text-lg font-semibold text-neutral-100">
          Need help?
        </h2>
        <p className="mt-2 text-sm text-neutral-400">
          Email us at{" "}
          <a
            href="mailto:support@ficlet.app"
            className="text-purple-400 hover:underline"
          >
            support@ficlet.app
          </a>{" "}
          and we&apos;ll get back to you within 24–48 hours.
        </p>

        <p className="mt-4 text-sm text-neutral-400">
          To help us help you faster, please include:
        </p>
        <ul className="mt-2 space-y-1 text-sm text-neutral-400">
          <li>• The email you used for your account or purchase</li>
          <li>• A short description of the issue</li>
          <li>• What you expected to happen</li>
        </ul>
      </div>

      <p className="text-sm text-neutral-400">
        Many questions are already answered in the{" "}
        <Link href="/faq" className="text-purple-400 hover:underline">
          FAQ
        </Link>
        , so it&apos;s worth a quick look first.
      </p>

      <p className="text-xs text-neutral-600">
        We don&apos;t offer live chat or phone support. Email lets us help
        everyone thoughtfully and keep Ficlet affordable.
      </p>
    </ContentPage>
  );
}