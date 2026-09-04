// filepath: src/app/(admin)/admin/academy/page.tsx
import Link from "next/link";
import { db } from "@/lib/db";
import { academyWorkshops } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { deleteWorkshop, toggleWorkshopPublish } from "./actions";

export default async function AcademyListPage() {
  const workshops = await db
    .select()
    .from(academyWorkshops)
    .orderBy(desc(academyWorkshops.createdAt));

  return (
    <div className="max-w-5xl">
      <div className="flex items-end justify-between mb-8 border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-wide uppercase">Academy Records</h1>
          <p className="font-mono text-gray-400 text-sm mt-1">
            {"//"} {workshops.length} TOTAL RECORDS
          </p>
        </div>
        <Link
          href="/admin/academy/new"
          className="font-mono text-xs text-accent border border-accent px-4 py-2 hover:bg-accent hover:text-black transition-colors"
        >
          + LOG WORKSHOP
        </Link>
      </div>

      {workshops.length === 0 ? (
        <div className="py-24 text-center border border-gray-800 border-dashed brutalist-box">
          <span className="font-mono text-gray-500 text-sm animate-pulse">
            {">"} NO_RECORDS_FOUND...
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-4 py-2 font-mono text-[10px] text-gray-600 uppercase">
            <span>Title</span>
            <span>Type</span>
            <span>Status</span>
            <span className="w-28 text-center">Publish</span>
            <span className="w-20 text-center">Delete</span>
          </div>

          {workshops.map((w) => (
            <div
              key={w.id}
              className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center brutalist-box px-4 py-4 hover:bg-gray-900/40 transition-colors"
            >
              <div>
                <p className="font-sans font-semibold text-sm text-white truncate">{w.title}</p>
                <p className="font-mono text-[10px] text-gray-500 mt-0.5">
                  {w.institution ?? "—"} · {w.durationDays}d
                </p>
              </div>

              <span className="font-mono text-[10px] px-2 py-0.5 border border-gray-700 text-gray-400">
                {w.type}
              </span>

              <span
                className={`font-mono text-[10px] px-2 py-0.5 border ${
                  w.isPublished
                    ? "border-accent text-accent"
                    : "border-gray-700 text-gray-500"
                }`}
              >
                {w.isPublished ? "LIVE" : "DRAFT"}
              </span>

              <form action={toggleWorkshopPublish}>
                <input type="hidden" name="id" value={w.id} />
                <input type="hidden" name="current" value={String(w.isPublished)} />
                <button
                  type="submit"
                  className="w-28 font-mono text-[10px] border border-gray-700 px-3 py-1.5 hover:border-accent hover:text-accent transition-colors"
                >
                  {w.isPublished ? "UNPUBLISH" : "PUBLISH"}
                </button>
              </form>

              <form action={deleteWorkshop}>
                <input type="hidden" name="id" value={w.id} />
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
