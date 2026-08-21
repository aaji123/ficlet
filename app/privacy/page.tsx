import ContentPage from "@/components/ContentPage";

export default function PrivacyPage() {
  return (
    <ContentPage title="Privacy Policy" subtitle="Last updated: today">
      <p>
        This explains what we collect, why, and how we handle it. The short
        version: we collect as little as we need to make Ficlet work.
      </p>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-100">What we collect</h2>
        <p className="text-sm text-neutral-400">
          We collect your email address when you create an account, the story
          choices you make, and the ficlets you generate. If you make a
          purchase, our payment provider handles your payment details — we
          don&apos;t store your card number.
        </p>

        <h2 className="text-lg font-semibold text-neutral-100">How we use it</h2>
        <p className="text-sm text-neutral-400">
          We use your information to provide the service, save your library,
          process payments, and send you important account emails. We
          don&apos;t sell your personal information.
        </p>

        <h2 className="text-lg font-semibold text-neutral-100">AI providers</h2>
        <p className="text-sm text-neutral-400">
          To generate your ficlets, your story choices are sent to an AI
          provider. We don&apos;t send more personal information than needed to
          create your story.
        </p>

        <h2 className="text-lg font-semibold text-neutral-100">Cookies & analytics</h2>
        <p className="text-sm text-neutral-400">
          We may use privacy-friendly analytics to understand how Ficlet is
          used, so we can improve it. We don&apos;t use invasive tracking.
        </p>

        <h2 className="text-lg font-semibold text-neutral-100">Your rights</h2>
        <p className="text-sm text-neutral-400">
          You can ask us what data we have about you, request corrections, or
          ask us to delete your account and data. Email us and we&apos;ll help.
        </p>

        <h2 className="text-lg font-semibold text-neutral-100">Data retention</h2>
        <p className="text-sm text-neutral-400">
          We keep your data while your account is active. If you delete your
          account, we remove your personal data within a reasonable period.
        </p>

        <h2 className="text-lg font-semibold text-neutral-100">Age</h2>
        <p className="text-sm text-neutral-400">
          Ficlet isn&apos;t intended for children. You should be old enough to
          form a binding contract in your region to use the service.
        </p>

        <h2 className="text-lg font-semibold text-neutral-100">Contact</h2>
        <p className="text-sm text-neutral-400">
          Privacy questions? Email{" "}
          <a
            href="mailto:support@ficlet.app"
            className="text-purple-400 hover:underline"
          >
            support@ficlet.app
          </a>
          .
        </p>
      </div>
    </ContentPage>
  );
}