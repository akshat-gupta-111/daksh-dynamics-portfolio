// filepath: src/app/(public)/(academy)/academy/page.tsx
import Link from "next/link";
import { db } from "@/lib/db";
import { academyWorkshops } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import AcademyPortfolioCard from "@/components/ui/AcademyPortfolioCard";

export default async function AcademyPage() {
  const workshops = await db
    .select()
    .from(academyWorkshops)
    .where(eq(academyWorkshops.isPublished, true))
    .orderBy(desc(academyWorkshops.createdAt));

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="border-b border-slate-200 pb-10 mb-14">
        <p className="section-label mb-2">Proof of work</p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Academy Portfolio
        </h1>
        <p className="text-slate-500 text-base max-w-2xl leading-relaxed">
          A record of FDPs, workshops, and bootcamps delivered at engineering institutions across India — backed by production-level expertise.
        </p>
      </div>

      {/* Portfolio Grid */}
      {workshops.length === 0 ? (
        <div className="py-24 text-center card border-dashed">
          <p className="text-slate-400 text-sm">No workshop records published yet.</p>
          <Link href="/contact?type=academy" className="btn-purple mt-6 text-sm inline-flex">
            Book a Workshop →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((workshop) => (
            <Link key={workshop.id} href={`/academy/${workshop.slug}`} className="block h-full">
              <AcademyPortfolioCard
                title={workshop.title}
                type={workshop.type}
                durationDays={workshop.durationDays}
                institution={workshop.institution}
                conductedAt={workshop.conductedAt}
                participantCount={workshop.participantCount}
                coverImageUrl={workshop.coverImageUrl}
                topicsCovered={workshop.topicsCovered}
                testimonial={workshop.testimonial}
              />
            </Link>
          ))}
        </div>
      )}

    </div>
  );
}