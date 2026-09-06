'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";

interface ArchitectureCardProps {
  title: string;
  abstract: string;
  tags: string[];
  href: string;
  heroAssetUrl?: string | null;
  liveLink?: string | null;
}

export default function ArchitectureCard({
  title,
  abstract,
  tags,
  href,
  heroAssetUrl,
  liveLink,
}: ArchitectureCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(href);
  };

  return (
    <div 
      className="card group flex flex-col h-full overflow-hidden cursor-pointer"
      onClick={handleCardClick}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleCardClick()}
    >

      {/* Cover image */}
      <div className="aspect-video w-full bg-blue-50 flex items-center justify-center relative overflow-hidden">
        {heroAssetUrl ? (
          <Image
            src={heroAssetUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized={true}
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
      <div className="p-5 flex flex-col flex-1">
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

        <div className="mt-auto pt-4 flex items-center justify-between text-blue-600 text-sm font-semibold">
          <span>View Details →</span>
          {liveLink && (
            <a 
              href={liveLink} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-slate-400 hover:text-blue-600 flex items-center gap-1 transition-colors ml-4"
              title="Visit Live Deployment"
            >
              <span>Live</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}