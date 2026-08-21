import ContentPage from "@/components/ContentPage";

export default function TermsPage() {
  return (
    <ContentPage title="Terms of Service" subtitle="Last updated: today">
      <p>
        Welcome to Ficlet. By using Ficlet, you agree to these terms. If you
        don&apos;t agree, please don&apos;t use the service.
      </p>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-100">1. The service</h2>
        <p className="text-sm text-neutral-400">
          Ficlet uses artificial intelligence to generate short, original
          fiction scenes based on your choices. It&apos;s meant for personal
          entertainment and creative inspiration.
        </p>

        <h2 className="text-lg font-semibold text-neutral-100">2. Accounts</h2>
        <p className="text-sm text-neutral-400">
          You may need an account to access certain features. You&apos;re
          responsible for keeping your account information accurate and secure.
        </p>

        <h2 className="text-lg font-semibold text-neutral-100">3. Content rules</h2>
        <p className="text-sm text-neutral-400">
          You agree not to use Ficlet to generate explicit sexual content,
          content involving minors in romantic or sexual contexts, content about
          real people, or content that infringes on anyone&apos;s rights. We may
          refuse or remove content that breaks these rules.
        </p>

        <h2 className="text-lg font-semibold text-neutral-100">4. Your ficlets</h2>
        <p className="text-sm text-neutral-400">
          You can use the ficlets you generate for personal enjoyment and
          personal creative projects. You may not resell raw outputs as-is or
          claim they were written by a human.
        </p>

        <h2 className="text-lg font-semibold text-neutral-100">5. Original content</h2>
        <p className="text-sm text-neutral-400">
          Ficlet creates original characters and settings inspired by the tropes
          you choose. Ficlet is not affiliated with, endorsed by, or connected
          to any existing franchise, book, show, or game.
        </p>

        <h2 className="text-lg font-semibold text-neutral-100">6. Payments</h2>
        <p className="text-sm text-neutral-400">
          Paid plans and credit packs are described on the Pricing page.
          Subscriptions renew until cancelled. See the Refund Policy for refund
          details.
        </p>

        <h2 className="text-lg font-semibold text-neutral-100">7. Disclaimer</h2>
        <p className="text-sm text-neutral-400">
          Ficlet is provided &quot;as is.&quot; AI-generated content can be
          unpredictable, and we don&apos;t guarantee it will always meet your
          expectations. Ficlet is for entertainment and is not professional,
          legal, medical, or psychological advice.
        </p>

        <h2 className="text-lg font-semibold text-neutral-100">8. Limitation of liability</h2>
        <p className="text-sm text-neutral-400">
          To the maximum extent allowed by law, Ficlet and its creators
          aren&apos;t liable for any indirect or consequential damages arising
          from your use of the service.
        </p>

        <h2 className="text-lg font-semibold text-neutral-100">9. Changes</h2>
        <p className="text-sm text-neutral-400">
          We may update these terms from time to time. Continued use of Ficlet
          after changes means you accept the updated terms.
        </p>

        <h2 className="text-lg font-semibold text-neutral-100">10. Contact</h2>
        <p className="text-sm text-neutral-400">
          Questions about these terms? Email{" "}
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