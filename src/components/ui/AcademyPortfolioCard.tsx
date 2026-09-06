// filepath: src/components/ui/AcademyPortfolioCard.tsx
import Image from "next/image";

interface AcademyPortfolioCardProps {
  title: string;
  type: string;
  durationDays: number;
  institution?: string | null;
  conductedAt?: Date | null;
  participantCount?: number | null;
  coverImageUrl?: string | null;
  topicsCovered?: string[] | null;
  testimonial?: string | null;
}

export default function AcademyPortfolioCard({
  title, type, durationDays, institution, conductedAt,
  participantCount, coverImageUrl, topicsCovered, testimonial,
}: AcademyPortfolioCardProps) {
  const formattedDate = conductedAt
    ? new Date(conductedAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })
    : null;

  return (
    <div className="card group overflow-hidden flex flex-col h-full">

      {/* Cover image */}
      <div className="aspect-video w-full bg-violet-50 flex items-center justify-center relative overflow-hidden flex-shrink-0">
        {coverImageUrl ? (
          <Image
            src={coverImageUrl}
            alt={`${title} at ${institution ?? "workshop"}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized={true}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-violet-50 to-purple-100 flex items-center justify-center">
            {/* Workshop placeholder SVG */}
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="opacity-30">
              <rect x="8" y="12" width="38" height="26" rx="2" stroke="#7C3AED" strokeWidth="2"/>
              <line x1="27" y1="38" x2="27" y2="48" stroke="#7C3AED" strokeWidth="2"/>
              <line x1="18" y1="48" x2="36" y2="48" stroke="#7C3AED" strokeWidth="2"/>
              <circle cx="50" cy="18" r="8" stroke="#7C3AED" strokeWidth="2"/>
              <line x1="50" y1="14" x2="50" y2="22" stroke="#7C3AED" strokeWidth="1.5"/>
              <line x1="46" y1="18" x2="54" y2="18" stroke="#7C3AED" strokeWidth="1.5"/>
              <circle cx="46" cy="52" r="4" stroke="#7C3AED" strokeWidth="1.5"/>
              <circle cx="56" cy="52" r="4" stroke="#7C3AED" strokeWidth="1.5"/>
            </svg>
          </div>
        )}
        {/* Type badge overlay */}
        <div className="absolute top-3 left-3">
          <span className="badge-purple text-xs font-semibold">{type}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h2 className="font-bold text-slate-900 text-base mb-1.5 leading-snug">{title}</h2>

        {/* Institution + date */}
        {(institution || formattedDate) && (
          <p className="text-sm text-slate-500 mb-2">
            {institution && <span className="font-medium text-slate-700">{institution}</span>}
            {institution && formattedDate && " · "}
            {formattedDate}
          </p>
        )}

        {/* Duration + participants */}
        <div className="flex gap-3 mb-4 text-xs font-medium text-slate-500">
          <span className="flex items-center gap-1">
            <span className="text-violet-500">◷</span> {durationDays} day{durationDays !== 1 ? "s" : ""}
          </span>
          {participantCount != null && participantCount > 0 && (
            <span className="flex items-center gap-1">
              <span className="text-violet-500">▸</span> {participantCount} participants
            </span>
          )}
        </div>

        {/* Topics */}
        {topicsCovered && topicsCovered.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
            {topicsCovered.slice(0, 5).map((t) => (
              <span key={t} className="badge-purple text-xs">{t}</span>
            ))}
          </div>
        )}

        {/* Testimonial */}
        {testimonial && (
          <blockquote className="text-xs text-slate-500 italic border-l-2 border-violet-300 pl-3 leading-relaxed mt-auto mb-4">
            &ldquo;{testimonial}&rdquo;
          </blockquote>
        )}
        
        <div className="mt-auto pt-4 text-violet-600 text-sm font-semibold">
          View Details →
        </div>
      </div>
    </div>
  );
}
