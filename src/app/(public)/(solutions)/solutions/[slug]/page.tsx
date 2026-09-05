// filepath: src/app/(public)/(solutions)/solutions/[slug]/page.tsx
import { db } from "@/lib/db";
import { solutionsProjects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SolutionDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [project] = await db
    .select()
    .from(solutionsProjects)
    .where(eq(solutionsProjects.slug, slug))
    .limit(1);

  if (!project || !project.isPublished) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">

      {/* Back Link */}
      <Link
        href="/solutions"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-8"
      >
        ← Back to Deployed Systems
      </Link>

      {/* Header */}
      <div className="border-b border-slate-200 pb-8 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
          {project.title}
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          {project.abstract}
        </p>
      </div>

      {/* Hero Image */}
      {project.heroAssetUrl && (
        <div className="relative h-80 w-full rounded-2xl overflow-hidden mb-12 shadow-md">
          <Image
            src={project.heroAssetUrl}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Tech Stack */}
      <div className="mb-12">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
          Tech Stack
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span key={tech} className="badge-blue">{tech}</span>
          ))}
        </div>
      </div>

      {/* Architecture Notes */}
      {project.architectureContent ? (
        <div className="card p-8 bg-slate-50">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            System Architecture Notes
          </h2>
          <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap font-mono">
            {project.architectureContent}
          </div>
        </div>
      ) : (
        <div className="card p-8 text-center border-dashed bg-slate-50">
          <p className="text-slate-400 text-sm">Architecture notes coming soon.</p>
        </div>
      )}

      {/* CTA */}
      <div className="card p-8 text-center mt-10">
        <h3 className="font-bold text-slate-900 text-lg mb-2">
          Interested in a similar system?
        </h3>
        <p className="text-slate-500 text-sm mb-5">
          We design and deploy custom enterprise AI solutions.
        </p>
        <Link href="/contact?type=enterprise" className="btn-blue text-sm">
          Get in Touch →
        </Link>
      </div>

    </div>
  );
}