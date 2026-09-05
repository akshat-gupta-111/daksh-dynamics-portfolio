// filepath: src/components/ui/TeamMemberCard.tsx
import Image from "next/image";

interface TeamMemberCardProps {
  name: string;
  role: string;
  bio: string;
  techStack: string[];
  photoUrl?: string | null;
  displayOrder: number;
}

export default function TeamMemberCard({ name, role, bio, techStack, photoUrl, displayOrder }: TeamMemberCardProps) {
  // Extract initials from name like "AKSHAT_GUPTA" → "AG"
  const initials = name
    .split(/[_\s]+/)
    .map((w) => w.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="card group p-6 flex flex-col items-center text-center">

      {/* Avatar — circular, NOT full-bleed */}
      <div className="w-24 h-24 rounded-full overflow-hidden mb-4 flex-shrink-0 border-4 border-white shadow-md ring-2 ring-blue-100 group-hover:ring-blue-300 transition-all duration-200">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={name}
            width={96}
            height={96}
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
      <h2 className="font-bold text-slate-900 text-base mb-1 leading-tight">
        {name.replace(/_/g, " ").split(" ").map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(" ")}
      </h2>

      {/* Role */}
      <p className="text-blue-600 text-xs font-semibold mb-3 leading-snug">
        {role.replace(/_/g, " ")}
      </p>

      {/* Bio */}
      <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-3">{bio}</p>

      {/* Tech DNA */}
      <div className="flex flex-wrap justify-center gap-1.5 mt-auto">
        {techStack.map((t) => (
          <span key={t} className="badge-gray text-xs">{t}</span>
        ))}
      </div>

    </div>
  );
}
