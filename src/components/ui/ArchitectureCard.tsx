// filepath: src/components/ui/ArchitectureCard.tsx
import Link from "next/link";
import Image from "next/image";

interface ArchitectureCardProps {
  title: string;
  abstract: string;
  tags: string[];
  href: string;
  heroAssetUrl?: string | null;
}

export default function ArchitectureCard({ title, abstract, tags, href, heroAssetUrl }: ArchitectureCardProps) {
  return (
    <Link 
      href={href}
      className="group flex flex-col h-full brutalist-box relative overflow-hidden"
    >
      {/* Schematic / Image Container */}
      <div className="h-48 w-full border-b border-gray-800 bg-gray-950 flex items-center justify-center relative overflow-hidden">
        {heroAssetUrl ? (
          <Image 
            src={heroAssetUrl} 
            alt={title} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-[linear-gradient(rgba(34,34,34,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(34,34,34,0.3)_1px,transparent_1px)] bg-[size:16px_16px] flex items-center justify-center">
            <span className="font-mono text-xs text-gray-500 group-hover:text-accent transition-colors duration-150">
              {'<IMAGE_ASSET_NOT_FOUND />'}
            </span>
          </div>
        )}
        
        <div className="absolute top-2 right-2 w-2 h-2 bg-gray-800 group-hover:bg-accent transition-colors duration-150 z-10" />
      </div>

      {/* The Metadata Payload */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold tracking-wide mb-3">{title}</h3>
        <p className="text-gray-400 font-mono text-sm leading-relaxed mb-6 flex-1">
          {abstract}
        </p>

        {/* Tech Stack Array Rendering */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="px-2 py-1 bg-gray-900 border border-gray-800 font-mono text-[10px] uppercase text-gray-400 group-hover:border-gray-600 transition-colors"
            >
              [{tag}]
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}