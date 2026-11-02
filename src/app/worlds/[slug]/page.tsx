import { notFound } from "next/navigation";
import Link from "next/link";
import { worlds } from "@/lib/worlds";

export default async function WorldPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const world = worlds.find((w) => w.slug === slug);
  if (!world) notFound();
  return (
    <main className="min-h-screen pt-28 pb-20">
      <div className="container max-w-4xl">
        <Link href="/#worlds" className="text-muted hover:text-white transition">← Back</Link>
        <p className="text-accent font-mono mt-8">{world.num}</p>
        <h1 className="font-display text-5xl sm:text-7xl font-bold mt-2">{world.title}</h1>
        <p className="mt-4 text-xl text-white/90">{world.subtitle}</p>
        <p className="mt-6 text-muted text-lg leading-relaxed">{world.theme}</p>
      </div>
    </main>
  );
}
