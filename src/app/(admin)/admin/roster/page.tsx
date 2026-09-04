// filepath: src/app/(admin)/admin/roster/page.tsx
import Link from "next/link";
import { db } from "@/lib/db";
import { teamMembers } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import { deleteTeamMember, toggleMemberPublish } from "./actions";

export default async function RosterListPage() {
  const members = await db
    .select()
    .from(teamMembers)
    .orderBy(asc(teamMembers.displayOrder));

  return (
    <div className="max-w-5xl">
      <div className="flex items-end justify-between mb-8 border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-wide uppercase">Engineering Roster</h1>
          <p className="font-mono text-gray-400 text-sm mt-1">
            {"//"} {members.length} TEAM MEMBERS
          </p>
        </div>
        <Link
          href="/admin/roster/new"
          className="font-mono text-xs text-accent border border-accent px-4 py-2 hover:bg-accent hover:text-black transition-colors"
        >
          + ADD MEMBER
        </Link>
      </div>

      {members.length === 0 ? (
        <div className="py-24 text-center border border-gray-800 border-dashed brutalist-box">
          <span className="font-mono text-gray-500 text-sm animate-pulse">
            {">"} NO_MEMBERS_FOUND...
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 py-2 font-mono text-[10px] text-gray-600 uppercase">
            <span>Ord</span>
            <span>Member</span>
            <span>Status</span>
            <span className="w-28 text-center">Publish</span>
            <span className="w-20 text-center">Delete</span>
          </div>

          {members.map((m) => (
            <div
              key={m.id}
              className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center brutalist-box px-4 py-4 hover:bg-gray-900/40 transition-colors"
            >
              <span className="font-mono text-xs text-accent w-6">
                {String(m.displayOrder).padStart(2, "0")}
              </span>

              <div>
                <p className="font-sans font-semibold text-sm text-white">{m.name}</p>
                <p className="font-mono text-[10px] text-gray-500 mt-0.5 truncate">{m.role}</p>
              </div>

              <span
                className={`font-mono text-[10px] px-2 py-0.5 border ${
                  m.isPublished
                    ? "border-accent text-accent"
                    : "border-gray-700 text-gray-500"
                }`}
              >
                {m.isPublished ? "LIVE" : "DRAFT"}
              </span>

              <form action={toggleMemberPublish}>
                <input type="hidden" name="id" value={m.id} />
                <input type="hidden" name="current" value={String(m.isPublished)} />
                <button
                  type="submit"
                  className="w-28 font-mono text-[10px] border border-gray-700 px-3 py-1.5 hover:border-accent hover:text-accent transition-colors"
                >
                  {m.isPublished ? "UNPUBLISH" : "PUBLISH"}
                </button>
              </form>

              <form action={deleteTeamMember}>
                <input type="hidden" name="id" value={m.id} />
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
