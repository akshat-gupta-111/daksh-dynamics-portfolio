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
      <div className="border-b border-gray-800 pb-8 mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase mb-4">
          The Engineering Roster
        </h1>
        <p className="font-mono text-gray-400 text-sm max-w-2xl leading-relaxed">
          {"//"} ELITE_CORE_TEAM. Uncompromising technical execution spanning hardware systems, edge robotics, and enterprise AI orchestration.
        </p>
      </div>

      {/* Team Grid */}
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

        {members.length === 0 && (
          <div className="col-span-full py-24 text-center border border-gray-800 border-dashed brutalist-box">
            <span className="font-mono text-gray-500 text-sm animate-pulse">
              {">"} NO_ROSTER_RECORDS_PUBLISHED_YET...
            </span>
          </div>
        )}
      </div>

      {/* Enterprise CTA Box */}
      <div className="mt-16 brutalist-box p-12 bg-gray-900/20 text-center flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold uppercase mb-4">
          Need this engineering squad on your stack?
        </h2>
        <p className="font-mono text-sm text-gray-400 max-w-xl mb-8">
          Whether you are commissioning a custom in-system RAG architecture or looking for hardware-software integration for robotics.
        </p>
        <Link
          href="/contact"
          className="border border-accent text-accent px-8 py-4 font-mono text-sm hover:bg-accent hover:text-black transition-colors uppercase tracking-widest inline-block"
        >
          Initialize Enterprise Engagement
        </Link>
      </div>

    </div>
  );
}