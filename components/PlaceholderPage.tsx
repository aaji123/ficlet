export default function PlaceholderPage({ title, description }: { title: string, description: string }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-3 max-w-md text-neutral-400">{description}</p>
      <a href="/" className="mt-8 text-purple-400 hover:underline">← Back to home</a>
    </main>
  );
}