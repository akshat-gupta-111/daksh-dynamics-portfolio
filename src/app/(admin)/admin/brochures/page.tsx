// filepath: src/app/(admin)/admin/brochures/page.tsx
import Link from "next/link";
import { db } from "@/lib/db";
import { siteBrochures } from "@/lib/db/schema";
import { deleteBrochure, toggleBrochurePublish } from "./actions";
import { desc } from "drizzle-orm";

export default async function BrochuresPage() {
  const brochures = await db.select().from(siteBrochures).orderBy(desc(siteBrochures.createdAt));

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-wide uppercase">Brochures</h1>
          <p className="font-mono text-gray-400 text-sm mt-1">{"// "} DOWNLOADABLE_ASSETS · shown as buttons on home page cards</p>
        </div>
        <Link href="/admin/brochures/new" className="bg-white text-black font-bold text-xs uppercase tracking-widest px-4 py-2 hover:bg-accent transition-colors">
          + Add Brochure
        </Link>
      </div>

      {brochures.length === 0 ? (
        <div className="brutalist-box p-12 text-center">
          <p className="font-mono text-gray-500 text-sm">No brochures yet. Add one to show a download button on the home page cards.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {brochures.map((b) => (
            <div key={b.id} className="brutalist-box p-5 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className={`font-mono text-xs px-2 py-0.5 rounded ${b.type === "solutions" ? "bg-blue-900/40 text-blue-400" : "bg-violet-900/40 text-violet-400"}`}>
                    {b.type.toUpperCase()}
                  </span>
                  <span className={`font-mono text-xs ${b.isPublished ? "text-green-400" : "text-gray-500"}`}>
                    {b.isPublished ? "● LIVE" : "○ DRAFT"}
                  </span>
                </div>
                <p className="font-bold text-sm text-white truncate">{b.title}</p>
                <a
                  href={b.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-gray-500 hover:text-accent transition-colors truncate block max-w-sm"
                >
                  {b.fileUrl}
                </a>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Toggle publish */}
                <form action={toggleBrochurePublish}>
                  <input type="hidden" name="id" value={b.id} />
                  <input type="hidden" name="current" value={String(b.isPublished)} />
                  <button
                    type="submit"
                    className={`font-mono text-xs px-3 py-1.5 border transition-colors ${
                      b.isPublished
                        ? "border-gray-700 text-gray-400 hover:border-red-500 hover:text-red-400"
                        : "border-gray-700 text-gray-400 hover:border-green-500 hover:text-green-400"
                    }`}
                  >
                    {b.isPublished ? "Unpublish" : "Publish"}
                  </button>
                </form>

                {/* Delete */}
                <form action={deleteBrochure}>
                  <input type="hidden" name="id" value={b.id} />
                  <button
                    type="submit"
                    className="font-mono text-xs px-3 py-1.5 border border-gray-700 text-gray-400 hover:border-red-500 hover:text-red-400 transition-colors"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
