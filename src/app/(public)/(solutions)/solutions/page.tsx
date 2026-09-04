// filepath: src/app/(public)/(solutions)/solutions/page.tsx
import { db } from "@/lib/db";
import { solutionsProjects } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import ArchitectureCard from "@/components/ui/ArchitectureCard";

export default async function SolutionsPage() {
  const projects = await db
    .select()
    .from(solutionsProjects)
    .where(eq(solutionsProjects.isPublished, true))
    .orderBy(desc(solutionsProjects.createdAt));

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="border-b border-gray-800 pb-8 mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase mb-4">
          Deployed Systems
        </h1>
        <p className="font-mono text-gray-400 text-sm max-w-2xl leading-relaxed">
          {'//'} ENTERPRISE_ARCHITECTURE_LOGS. Production deployments spanning Edge AI, autonomous robotics, and multi-agent RAG systems.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ArchitectureCard
            key={project.id}
            title={project.title}
            abstract={project.abstract}
            tags={project.techStack}
            href={`/solutions/${project.slug}`}
            heroAssetUrl={project.heroAssetUrl}
          />
        ))}

        {projects.length === 0 && (
          <div className="col-span-full py-24 text-center border border-gray-800 border-dashed brutalist-box">
            <span className="font-mono text-gray-500 text-sm animate-pulse">
              {">"} NO_DEPLOYMENT_RECORDS_PUBLISHED_YET...
            </span>
          </div>
        )}
      </div>

    </div>
  );
}
