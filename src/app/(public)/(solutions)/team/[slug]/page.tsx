// filepath: src/app/(public)/(solutions)/team/[slug]/page.tsx
import { db } from "@/lib/db";
import { teamMembers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import OrbBackground from "@/components/ui/OrbBackground";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function TeamMemberDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [member] = await db
    .select()
    .from(teamMembers)
    .where(eq(teamMembers.slug, slug))
    .limit(1);

  if (!member || !member.isPublished) {
    notFound();
  }

  const displayName = member.name
    .replace(/_/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");

  const initials = member.name
    .split(/[_\s]+/)
    .map((w) => w.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">

      {/* Back link */}
      <Link href="/team" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-8">
        ← Back to Team
      </Link>

      {/* Header banner with orbs */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-white to-indigo-50 border border-blue-100 px-8 py-12 mb-10">
        <OrbBackground variant="blue" />
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8">

          {/* Avatar */}
          <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-lg ring-2 ring-blue-200">
            {member.photoUrl ? (
              <Image
                src={member.photoUrl}
                alt={displayName}
                width={128}
                height={128}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <span className="text-white font-bold text-3xl">{initials}</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="text-center sm:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">{displayName}</h1>
            <p className="text-blue-600 font-semibold text-base mb-4">{member.role.replace(/_/g, " ")}</p>
            {/* Social links */}
            <div className="flex gap-3 justify-center sm:justify-start">
              {member.githubUrl && (
                <a
                  href={member.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors bg-slate-100 hover:bg-slate-200 rounded-lg px-3 py-1.5"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                  GitHub
                </a>
              )}
              {member.linkedinUrl && (
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-blue-700 hover:text-blue-900 transition-colors bg-blue-50 hover:bg-blue-100 rounded-lg px-3 py-1.5"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="card p-8 mb-8">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">About</h2>
        <p className="text-slate-700 text-base leading-relaxed">{member.bio}</p>
      </div>

      {/* Tech Stack */}
      <div className="mb-10">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {member.techStack.map((t) => (
            <span key={t} className="badge-blue">{t}</span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="card p-8 text-center">
        <h3 className="font-bold text-slate-900 text-lg mb-2">Want to collaborate?</h3>
        <p className="text-slate-500 text-sm mb-5">Reach out and let us know what you&apos;re building.</p>
        <Link href="/contact?type=enterprise" className="btn-blue text-sm">Get in Touch →</Link>
      </div>

    </div>
  );
}
