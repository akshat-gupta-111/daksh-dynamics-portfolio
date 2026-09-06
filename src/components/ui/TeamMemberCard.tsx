'use client'
// filepath: src/components/ui/TeamMemberCard.tsx
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TeamMemberCardProps {
  name: string;
  role: string;
  bio: string;
  techStack: string[];
  photoUrl?: string | null;
  displayOrder: number;
  slug?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
}

export default function TeamMemberCard({
  name, role, bio, techStack, photoUrl, displayOrder, slug, githubUrl, linkedinUrl,
}: TeamMemberCardProps) {
  const router = useRouter();

  const initials = name
    .split(/[_\s]+/)
    .map((w) => w.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const displayName = name
    .replace(/_/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");

  const handleCardClick = () => {
    if (slug) router.push(`/team/${slug}`);
  };

  return (
    // Always a div — never an <a>. Navigation via router.push to avoid nested <a> hydration error.
    <div
      className={`card group p-6 flex flex-col items-center text-center h-full ${slug ? "cursor-pointer hover:shadow-md transition-shadow" : ""}`}
      data-navigation={slug ? `/team/${slug}` : undefined}
      onClick={slug ? handleCardClick : undefined}
      role={slug ? "link" : undefined}
      tabIndex={slug ? 0 : undefined}
      onKeyDown={slug ? (e) => e.key === "Enter" && handleCardClick() : undefined}
    >

      {/* Avatar */}
      <div className="w-24 h-24 rounded-full overflow-hidden mb-4 flex-shrink-0 border-4 border-white shadow-md ring-2 ring-blue-100 group-hover:ring-blue-300 transition-all duration-200">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={displayName}
            width={96}
            height={96}
            unoptimized={true}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl tracking-wide">{initials}</span>
          </div>
        )}
      </div>

      {/* Order badge */}
      <span className="badge-gray text-xs mb-3">#{String(displayOrder).padStart(2, "0")}</span>

      {/* Name */}
      <h2 className="font-bold text-slate-900 text-base mb-1 leading-tight">{displayName}</h2>

      {/* Role */}
      <p className="text-blue-600 text-xs font-semibold mb-3 leading-snug">
        {role.replace(/_/g, " ")}
      </p>

      {/* Bio */}
      <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">{bio}</p>

      {/* Social links — plain <a> tags, safe because parent is a div, not an <a> */}
      {(githubUrl || linkedinUrl) && (
        <div className="flex gap-2 mb-4" onClick={(e) => e.stopPropagation()}>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
              title="GitHub"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-slate-700">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>
          )}
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition-colors"
              title="LinkedIn"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-blue-700">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          )}
        </div>
      )}

      {/* Tech DNA */}
      <div className="flex flex-wrap justify-center gap-1.5 mt-auto">
        {techStack.map((t) => (
          <span key={t} className="badge-gray text-xs">{t}</span>
        ))}
      </div>

      {/* View Profile link — shown as a real <Link> separately at the bottom, not wrapping the card */}
      {slug && (
        <Link
          href={`/team/${slug}`}
          onClick={(e) => e.stopPropagation()}
          className="mt-4 text-blue-600 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
        >
          View Profile →
        </Link>
      )}

    </div>
  );
}
