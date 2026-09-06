// filepath: src/app/(public)/(solutions)/solutions/page.tsx
import Link from "next/link";
import { db } from "@/lib/db";
import { solutionsProjects } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import ArchitectureCard from "@/components/ui/ArchitectureCard";
import OrbBackground from "@/components/ui/OrbBackground";

export default async function SolutionsPage() {
  const projects = await db
    .select()
    .from(solutionsProjects)
    .where(eq(solutionsProjects.isPublished, true))
    .orderBy(desc(solutionsProjects.createdAt));

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      {/* Header with orbs */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-100 px-10 py-14 mb-14">
        <OrbBackground variant="blue" />
        <div className="relative z-10">
          <p className="section-label mb-2">Production deployments</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            Deployed Systems
          </h1>
          <p className="text-slate-600 text-base max-w-2xl leading-relaxed">
            Enterprise-grade AI systems, edge robotics, and multi-agent architectures — built and shipped by the Daksh Dynamics engineering team.
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="py-24 text-center card border-dashed">
          <p className="text-slate-400 text-sm mb-4">No deployment records published yet.</p>
          <Link href="/contact?type=enterprise" className="btn-blue text-sm inline-flex">
            Discuss a Project →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ArchitectureCard
              key={project.id}
              title={project.title}
              abstract={project.abstract}
              tags={project.techStack}
              href={`/solutions/${project.slug}`}
              heroAssetUrl={project.heroAssetUrl}
              liveLink={project.liveLink}
            />
          ))}
        </div>
      )}

    </div>
  );
}
