// filepath: src/app/(public)/(solutions)/team/page.tsx
import Link from "next/link";
import { db } from "@/lib/db";
import { teamMembers } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import TeamMemberCard from "@/components/ui/TeamMemberCard";

export default async function TeamPage() {
  const members = await db
    .select()
    .from(teamMembers)
    .where(eq(teamMembers.isPublished, true))
    .orderBy(asc(teamMembers.displayOrder));

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="border-b border-slate-200 pb-10 mb-14">
        <p className="section-label mb-2">The people behind the systems</p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Engineering Team
        </h1>
        <p className="text-slate-500 text-base max-w-2xl leading-relaxed">
          Hardware systems, edge robotics, and enterprise AI — built by a core team that executes at production level.
        </p>
      </div>

      {/* Team Grid */}
      {members.length === 0 ? (
        <div className="py-24 text-center card border-dashed">
          <p className="text-slate-400 text-sm">Team roster coming soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <TeamMemberCard
              key={member.id}
              name={member.name}
              role={member.role}
              bio={member.bio}
              techStack={member.techStack}
              photoUrl={member.photoUrl}
              displayOrder={member.displayOrder}
            />
          ))}
        </div>
      )}

      {/* Enterprise CTA */}
      <div className="mt-16 card p-12 text-center flex flex-col items-center bg-slate-50">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          Need this team on your project?
        </h2>
        <p className="text-slate-500 text-sm max-w-xl mb-8 leading-relaxed">
          Whether you need a custom AI system, edge robotics integration, or hardware-software architecture — let&apos;s talk.
        </p>
        <Link href="/contact?type=enterprise" className="btn-blue text-sm">
          Start a Conversation →
        </Link>
      </div>

    </div>
  );
}