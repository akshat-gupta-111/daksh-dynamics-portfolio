// filepath: src/app/(admin)/admin/deployments/page.tsx
import Link from "next/link";
import { db } from "@/lib/db";
import { solutionsProjects } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { deleteDeployment, toggleDeploymentPublish } from "./actions";

export default async function DeploymentsListPage() {
  const projects = await db
    .select()
    .from(solutionsProjects)
    .orderBy(desc(solutionsProjects.createdAt));

  return (
    <div className="max-w-5xl">
      <div className="flex items-end justify-between mb-8 border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-wide uppercase">Deployments</h1>
          <p className="font-mono text-gray-400 text-sm mt-1">
            {"//"} {projects.length} TOTAL RECORDS
          </p>
        </div>
        <Link
          href="/admin/deployments/new"
          className="font-mono text-xs text-accent border border-accent px-4 py-2 hover:bg-accent hover:text-black transition-colors"
        >
          + LOG NEW
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="py-24 text-center border border-gray-800 border-dashed brutalist-box">
          <span className="font-mono text-gray-500 text-sm animate-pulse">
            {">"} NO_RECORDS_FOUND...
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {/* Header row */}
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-4 py-2 font-mono text-[10px] text-gray-600 uppercase">
            <span>Title</span>
            <span>Status</span>
            <span className="w-20 text-center">Edit</span>
            <span className="w-28 text-center">Publish</span>
            <span className="w-20 text-center">Delete</span>
          </div>

          {projects.map((p) => (
            <div
              key={p.id}
              className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center brutalist-box px-4 py-4 hover:bg-gray-900/40 transition-colors"
            >
              <div>
                <p className="font-sans font-semibold text-sm text-white truncate">{p.title}</p>
                <p className="font-mono text-[10px] text-gray-500 mt-0.5">/{p.slug}</p>
              </div>

              <span
                className={`font-mono text-[10px] px-2 py-0.5 border ${
                  p.isPublished
                    ? "border-accent text-accent"
                    : "border-gray-700 text-gray-500"
                }`}
              >
                {p.isPublished ? "LIVE" : "DRAFT"}
              </span>

              <Link
                href={`/admin/deployments/${p.id}/edit`}
                className="w-20 text-center font-mono text-[10px] border border-gray-700 px-3 py-1.5 hover:border-accent hover:text-accent transition-colors"
              >
                EDIT
              </Link>

              <form action={toggleDeploymentPublish}>
                <input type="hidden" name="id" value={p.id} />
                <input type="hidden" name="current" value={String(p.isPublished)} />
                <button
                  type="submit"
                  className="w-28 font-mono text-[10px] border border-gray-700 px-3 py-1.5 hover:border-accent hover:text-accent transition-colors"
                >
                  {p.isPublished ? "UNPUBLISH" : "PUBLISH"}
                </button>
              </form>

              <form action={deleteDeployment}>
                <input type="hidden" name="id" value={p.id} />
                <button
                  type="submit"
                  className="w-20 font-mono text-[10px] border border-gray-700 px-3 py-1.5 hover:border-red-600 hover:text-red-500 transition-colors"
                >
                  DELETE
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
