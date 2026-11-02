import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject } from "@/lib/projects";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return (
    <main className="min-h-screen pt-28 pb-20">
      <div className="container max-w-4xl">
        <Link href="/#projects" className="text-muted hover:text-white transition">← Back to works</Link>
        <p className="text-accent font-mono mt-8">{project.num}</p>
        <h1 className="font-display text-5xl sm:text-7xl font-bold mt-2">{project.title}</h1>
        <p className="mt-6 text-muted text-lg leading-relaxed">{project.desc}</p>
        <p className="mt-6 text-white/80 leading-relaxed">{project.details}</p>
        <div className="mt-8 flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <span key={t} className="text-xs px-3 py-1 rounded-full glass text-muted">{t}</span>
          ))}
        </div>
      </div>
    </main>
  );
}
