// filepath: src/app/(public)/(academy)/academy/page.tsx
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
      <div className="border-b border-gray-800 pb-8 mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase mb-4">
          Academy Portfolio
        </h1>
        <p className="font-mono text-gray-400 text-sm max-w-2xl leading-relaxed">
          {'//'} CONDUCTED_PROGRAMS. A record of FDPs, workshops, and bootcamps delivered at institutions across India — backed by production-level engineering expertise.
        </p>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map((workshop) => (
          <AcademyPortfolioCard
            key={workshop.id}
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
        ))}

        {workshops.length === 0 && (
          <div className="col-span-full py-24 text-center border border-gray-800 border-dashed brutalist-box">
            <span className="font-mono text-gray-500 text-sm animate-pulse">
              {">"} NO_ACADEMY_RECORDS_PUBLISHED_YET...
            </span>
          </div>
        )}
      </div>

    </div>
  );
}