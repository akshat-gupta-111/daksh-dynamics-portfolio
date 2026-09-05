// filepath: src/components/ui/ArchitectureCard.tsx
import Image from "next/image";
import Link from "next/link";

interface ArchitectureCardProps {
  title: string;
  abstract: string;
  tags: string[];
  href: string;
  heroAssetUrl?: string | null;
}

export default function ArchitectureCard({
  title,
  abstract,
  tags,
  href,
  heroAssetUrl,
}: ArchitectureCardProps) {
  return (
    <Link href={href} className="card group block overflow-hidden">

      {/* Cover image */}
      <div className="h-44 w-full bg-blue-50 flex items-center justify-center relative overflow-hidden">
        {heroAssetUrl ? (
          <Image
            src={heroAssetUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
            {/* Circuit-board placeholder SVG */}
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="opacity-30">
              <rect x="20" y="20" width="24" height="24" rx="3" stroke="#2563EB" strokeWidth="2"/>
              <circle cx="32" cy="32" r="6" stroke="#2563EB" strokeWidth="2"/>
              <line x1="32" y1="4" x2="32" y2="20" stroke="#2563EB" strokeWidth="1.5"/>
              <line x1="32" y1="44" x2="32" y2="60" stroke="#2563EB" strokeWidth="1.5"/>
              <line x1="4" y1="32" x2="20" y2="32" stroke="#2563EB" strokeWidth="1.5"/>
              <line x1="44" y1="32" x2="60" y2="32" stroke="#2563EB" strokeWidth="1.5"/>
              <circle cx="32" cy="4" r="3" fill="#2563EB" fillOpacity=".4"/>
              <circle cx="32" cy="60" r="3" fill="#2563EB" fillOpacity=".4"/>
              <circle cx="4" cy="32" r="3" fill="#2563EB" fillOpacity=".4"/>
              <circle cx="60" cy="32" r="3" fill="#2563EB" fillOpacity=".4"/>
            </svg>
          </div>
        )}
        {/* Blue hover overlay */}
        <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors duration-200" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="font-bold text-slate-900 text-base mb-2 group-hover:text-blue-600 transition-colors leading-snug">
          {title}
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">{abstract}</p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 4).map((tag) => (
            <span key={tag} className="badge-blue text-xs">{tag}</span>
          ))}
          {tags.length > 4 && (
            <span className="badge-gray text-xs">+{tags.length - 4}</span>
          )}
        </div>

        <div className="mt-4 text-blue-600 text-sm font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          View Details →
        </div>
      </div>
    </Link>
  );
}