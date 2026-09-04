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
  title,
  type,
  durationDays,
  institution,
  conductedAt,
  participantCount,
  coverImageUrl,
  topicsCovered,
  testimonial,
}: AcademyPortfolioCardProps) {
  const formattedDate = conductedAt
    ? new Date(conductedAt).toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <div className="brutalist-box flex flex-col h-full overflow-hidden group">

      {/* Cover Image / Fallback */}
      <div className="h-48 w-full border-b border-gray-800 bg-gray-950 flex items-center justify-center relative overflow-hidden flex-shrink-0">
        {coverImageUrl ? (
          <Image
            src={coverImageUrl}
            alt={`${title} at ${institution ?? "workshop"}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-[linear-gradient(rgba(34,34,34,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(34,34,34,0.3)_1px,transparent_1px)] bg-[size:16px_16px] flex items-center justify-center">
            <span className="font-mono text-xs text-gray-500 group-hover:text-accent transition-colors duration-150">
              {"<IMAGE_ASSET_NOT_FOUND />"}
            </span>
          </div>
        )}
        {/* Status dot */}
        <div className="absolute top-2 right-2 w-2 h-2 bg-gray-800 group-hover:bg-accent transition-colors duration-150 z-10" />
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-1">

        {/* Type badge + duration */}
        <div className="flex justify-between items-center mb-4">
          <span className="px-2 py-1 bg-gray-900 border border-gray-800 font-mono text-xs text-accent">
            [{type}]
          </span>
          <span className="font-mono text-xs text-gray-500">
            {durationDays} DAY{durationDays !== 1 ? "S" : ""} INTENSIVE
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold tracking-wide mb-3 leading-snug">{title}</h2>

        {/* Institution + Date */}
        {(institution || formattedDate) && (
          <p className="font-mono text-xs text-gray-400 mb-3">
            {institution && <span className="text-white">{institution}</span>}
            {institution && formattedDate && <span className="text-gray-600"> · </span>}
            {formattedDate && <span>{formattedDate}</span>}
          </p>
        )}

        {/* Participant count */}
        {participantCount != null && participantCount > 0 && (
          <p className="font-mono text-xs text-accent mb-4">
            ▸ {participantCount} PARTICIPANTS TRAINED
          </p>
        )}

        {/* Topics covered tags */}
        {topicsCovered && topicsCovered.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto mb-4">
            {topicsCovered.map((topic) => (
              <span
                key={topic}
                className="px-2 py-1 bg-gray-900 border border-gray-800 font-mono text-[10px] uppercase text-gray-400 group-hover:border-gray-600 transition-colors"
              >
                [{topic}]
              </span>
            ))}
          </div>
        )}

        {/* Testimonial */}
        {testimonial && (
          <blockquote className="mt-auto border-l-2 border-gray-700 pl-4 font-mono text-xs text-gray-500 italic leading-relaxed">
            &ldquo;{testimonial}&rdquo;
          </blockquote>
        )}

      </div>
    </div>
  );
}
