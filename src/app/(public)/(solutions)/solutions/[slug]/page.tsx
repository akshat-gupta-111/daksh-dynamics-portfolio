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
      <Link href="/solutions" className="font-mono text-xs text-gray-500 hover:text-accent transition-colors mb-8 inline-block">
        {"<"} RETURN_TO_DEPLOYMENTS
      </Link>

      {/* Header */}
      <div className="border-b border-gray-800 pb-8 mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase mb-4">
          {project.title}
        </h1>
        <p className="font-mono text-gray-400 text-base leading-relaxed">
          {project.abstract}
        </p>
      </div>

      {/* Hero Image */}
      {project.heroAssetUrl && (
        <div className="relative h-96 w-full border border-gray-800 brutalist-box mb-12 overflow-hidden">
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
        <h2 className="font-mono text-xs text-gray-500 mb-4">DEPLOYED_TECH_STACK</h2>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span key={tech} className="px-3 py-1 bg-gray-900 border border-gray-800 font-mono text-xs text-accent">
              [{tech}]
            </span>
          ))}
        </div>
      </div>

      {/* Architecture Notes */}
      {project.architectureContent ? (
        <div className="brutalist-box p-8 bg-gray-900/20">
          <p className="font-mono text-xs text-gray-500 mb-6">{"// SYSTEM_ARCHITECTURE_NOTES"}</p>
          <div className="font-mono text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
            {project.architectureContent}
          </div>
        </div>
      ) : (
        <div className="brutalist-box p-8 bg-gray-900/20 font-mono text-sm text-gray-600 text-center border-dashed">
          <p>{"// ARCHITECTURE_NOTES_PENDING"}</p>
        </div>
      )}

    </div>
  );
}