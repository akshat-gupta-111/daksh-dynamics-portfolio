import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import ImageDropzone from "@/components/admin/ImageDropzone";
import { db } from "@/lib/db";
import { solutionsProjects } from "@/lib/db/schema";
import { updateDeployment } from "../../actions";

export default async function EditDeploymentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (!Number.isInteger(id) || id < 1) {
    notFound();
  }

  const [project] = await db
    .select()
    .from(solutionsProjects)
    .where(eq(solutionsProjects.id, id))
    .limit(1);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8 flex items-end justify-between border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-wide uppercase">Edit Deployment</h1>
          <p className="mt-1 font-mono text-sm text-gray-400">
            {"// "} UPDATE_RECORD: {project.title}
          </p>
        </div>
        <Link
          href="/admin/deployments"
          className="font-mono text-xs text-gray-400 transition-colors hover:text-accent"
        >
          ← CANCEL
        </Link>
      </div>

      <form action={updateDeployment} className="flex flex-col gap-6">
        <input type="hidden" name="id" value={project.id} />

        <ImageDropzone name="heroAssetUrl" initialUrl={project.heroAssetUrl ?? ""} aspectRatio={16/9} />

        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-mono text-xs text-gray-400">PROJECT_TITLE</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            maxLength={255}
            defaultValue={project.title}
            className="brutalist-box bg-transparent px-4 py-3 font-sans text-white focus:border-accent focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="slug" className="font-mono text-xs text-gray-400">URL_SLUG</label>
          <input
            type="text"
            id="slug"
            name="slug"
            required
            pattern="[a-z0-9-]+"
            title="Only lowercase letters, numbers, and hyphens"
            defaultValue={project.slug}
            className="brutalist-box bg-transparent px-4 py-3 font-mono text-sm text-white focus:border-accent focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="abstract" className="font-mono text-xs text-gray-400">ABSTRACT (Max 300 chars)</label>
          <textarea
            id="abstract"
            name="abstract"
            required
            maxLength={300}
            rows={3}
            defaultValue={project.abstract}
            className="brutalist-box resize-none bg-transparent px-4 py-3 font-sans text-white focus:border-accent focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="techStack" className="font-mono text-xs text-gray-400">TECH_STACK (Comma separated)</label>
          <input
            type="text"
            id="techStack"
            name="techStack"
            required
            defaultValue={project.techStack.join(", ")}
            className="brutalist-box bg-transparent px-4 py-3 font-mono text-sm text-white focus:border-accent focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="liveLink" className="font-mono text-xs text-gray-400">LIVE_LINK (Optional)</label>
          <input 
            type="url" 
            id="liveLink" 
            name="liveLink" 
            defaultValue={project.liveLink ?? ""}
            placeholder="e.g., https://navya-rover.example.com"
            className="brutalist-box bg-transparent px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-accent"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="architectureContent" className="font-mono text-xs text-gray-400">
            ARCHITECTURE_NOTES <span className="text-gray-600">(markdown / plain text)</span>
          </label>
          <textarea
            id="architectureContent"
            name="architectureContent"
            rows={8}
            defaultValue={project.architectureContent ?? ""}
            className="brutalist-box resize-y bg-transparent px-4 py-3 font-mono text-sm text-white focus:border-accent focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3 py-2">
          <input
            type="checkbox"
            id="isPublished"
            name="isPublished"
            defaultChecked={project.isPublished}
            className="h-4 w-4 accent-accent bg-black border-gray-800"
          />
          <label htmlFor="isPublished" className="cursor-pointer font-mono text-xs text-gray-400">
            PUBLISH_ON_SOLUTIONS_PAGE
          </label>
        </div>

        <button type="submit" className="mt-4 bg-white px-6 py-4 font-bold uppercase tracking-widest text-black transition-colors hover:bg-accent">
          Save Deployment
        </button>
      </form>
    </div>
  );
}
