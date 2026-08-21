import ContentPage from "@/components/ContentPage";

const faqs = [
  {
    q: "What is Ficlet?",
    a: "Ficlet is an AI that writes short, personalized fantasy scenes — called ficlets — based on the tropes and story ingredients you choose. Pick a vibe, a few tropes, and an ending, and you get a custom scene in seconds.",
  },
  {
    q: "Is Ficlet free?",
    a: "Yes. Your first ficlet is free in exchange for your email. After that, you can subscribe to the Dreamer Pass or buy a credit pack.",
  },
  {
    q: "How long is a ficlet?",
    a: "Most ficlets are around 700 to 1000 words — a satisfying single scene you can read in a few minutes.",
  },
  {
    q: "Do you write about characters from my favorite shows or books?",
    a: "No. Ficlet creates original characters and settings inspired by the tropes you love. This keeps things safe and original, while still giving you the dynamics you enjoy.",
  },
  {
    q: "What kind of content is allowed?",
    a: "Romance, tension, angst, comfort, dark themes, and morally complex characters are all welcome. We don't generate explicit sexual content, content involving minors, or content about real people.",
  },
  {
    q: "Can I use the stories I generate?",
    a: "Yes. You can use your ficlets for personal enjoyment and personal creative projects. Just don't resell raw outputs as-is or claim they were written by a human.",
  },
  {
    q: "What's the difference between the subscription and credits?",
    a: "The Dreamer Pass ($5/month) gives you 10 ficlets every day and is best if you generate often. A credit pack ($3 for 10) never expires and is best if you only want to generate occasionally.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. The Dreamer Pass can be cancelled anytime, and you'll keep access until the end of your billing period.",
  },
  {
    q: "How do I get help?",
    a: "We offer email-only support. Visit the Support page for details — we usually reply within 24–48 hours.",
  },
];

export default function FaqPage() {
  return (
    <ContentPage title="FAQ" subtitle="Answers to common questions.">
      {faqs.map((faq) => (
        <details
          key={faq.q}
          className="group rounded-xl border border-neutral-800 bg-neutral-900/50 p-5"
        >
          <summary className="cursor-pointer list-none font-medium text-neutral-100">
            {faq.q}
          </summary>
          <p className="mt-3 text-sm text-neutral-400">{faq.a}</p>
        </details>
      ))}
    </ContentPage>
  );
}