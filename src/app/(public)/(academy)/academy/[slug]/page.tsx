// filepath: src/app/(public)/(academy)/academy/[slug]/page.tsx
import { db } from "@/lib/db";
import { academyWorkshops } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function WorkshopDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [workshop] = await db
    .select()
    .from(academyWorkshops)
    .where(eq(academyWorkshops.slug, slug))
    .limit(1);

  if (!workshop || !workshop.isPublished) {
    notFound();
  }

  const formattedDate = workshop.conductedAt
    ? new Date(workshop.conductedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">

      {/* Back link */}
      <Link
        href="/academy"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-violet-600 transition-colors mb-8"
      >
        ← Back to Academy Portfolio
      </Link>

      {/* Type badge */}
      <div className="mb-4">
        <span className="badge-purple">{workshop.type}</span>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
        {workshop.title}
      </h1>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-10 pb-8 border-b border-slate-200">
        {workshop.institution && (
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <span className="text-violet-500">🏛</span> {workshop.institution}
          </span>
        )}
        {formattedDate && (
          <span className="flex items-center gap-1.5">
            <span className="text-violet-500">📅</span> {formattedDate}
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <span className="text-violet-500">◷</span> {workshop.durationDays} day{workshop.durationDays !== 1 ? "s" : ""}
        </span>
        {workshop.participantCount != null && workshop.participantCount > 0 && (
          <span className="flex items-center gap-1.5">
            <span className="text-violet-500">👥</span> {workshop.participantCount} participants
          </span>
        )}
      </div>

      {/* Cover Image */}
      {workshop.coverImageUrl && (
        <div className="relative h-80 w-full rounded-2xl overflow-hidden mb-12 shadow-md">
          <Image
            src={workshop.coverImageUrl}
            alt={`${workshop.title} at ${workshop.institution ?? "workshop"}`}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Topics Covered */}
      {workshop.topicsCovered && workshop.topicsCovered.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
            Topics Covered
          </h2>
          <div className="flex flex-wrap gap-2">
            {workshop.topicsCovered.map((topic) => (
              <span key={topic} className="badge-purple">{topic}</span>
            ))}
          </div>
        </div>
      )}

      {/* Testimonial */}
      {workshop.testimonial && (
        <div className="card p-7 mb-10 bg-violet-50 border-violet-100">
          <p className="text-xs font-semibold text-violet-500 uppercase tracking-widest mb-3">
            Faculty Testimonial
          </p>
          <blockquote className="text-slate-700 text-base italic leading-relaxed">
            &ldquo;{workshop.testimonial}&rdquo;
          </blockquote>
        </div>
      )}

      {/* CTA */}
      <div className="card p-8 text-center">
        <h3 className="font-bold text-slate-900 text-lg mb-2">
          Interested in this program for your institution?
        </h3>
        <p className="text-slate-500 text-sm mb-5">
          We deliver customised FDPs and workshops across India.
        </p>
        <Link href="/contact?type=academy" className="btn-purple text-sm">
          Book a Workshop →
        </Link>
      </div>

    </div>
  );
}
