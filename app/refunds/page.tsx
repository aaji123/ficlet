import ContentPage from "@/components/ContentPage";

export default function RefundsPage() {
  return (
    <ContentPage
      title="Refund Policy"
      subtitle="Fair and simple."
    >
      <p>
        Because Ficlet generates digital content instantly, we handle refunds a
        little differently than physical goods. Here&apos;s how it works.
      </p>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
        <h2 className="text-lg font-semibold text-neutral-100">
          Dreamer Pass (subscription)
        </h2>
        <p className="mt-2 text-sm text-neutral-400">
          You can cancel anytime. If you&apos;re charged and haven&apos;t used
          your subscription, contact us within 7 days of the charge and
          we&apos;ll refund it. Once you&apos;ve generated stories under a
          billing period, refunds are handled case by case.
        </p>
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
        <h2 className="text-lg font-semibold text-neutral-100">
          Credit packs
        </h2>
        <p className="mt-2 text-sm text-neutral-400">
          Unused credits can be refunded within 14 days of purchase. Once
          credits have been used to generate ficlets, they can&apos;t be
          refunded.
        </p>
      </div>

      <p className="text-sm text-neutral-400">
        To request a refund, email{" "}
        <a
          href="mailto:support@ficlet.app"
          className="text-purple-400 hover:underline"
        >
          support@ficlet.app
        </a>{" "}
        with your account email and order details.
      </p>

      <p className="text-xs text-neutral-600">
        This is a general policy and may be updated. The version on this page is
        the one that applies to your purchase.
      </p>
    </ContentPage>
  );
}