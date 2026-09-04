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

export default function TeamMemberCard({
  name,
  role,
  bio,
  techStack,
  photoUrl,
  displayOrder,
}: TeamMemberCardProps) {
  const orderLabel = String(displayOrder).padStart(2, "0");

  return (
    <div className="brutalist-box flex flex-col overflow-hidden group">

      {/* Photo / Fallback */}
      <div className="h-48 w-full border-b border-gray-800 bg-gray-950 flex items-center justify-center relative overflow-hidden flex-shrink-0">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={name}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          // Initials fallback
          <div className="w-full h-full bg-[linear-gradient(rgba(34,34,34,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(34,34,34,0.3)_1px,transparent_1px)] bg-[size:16px_16px] flex items-center justify-center">
            <span className="font-mono text-4xl font-bold text-gray-700 group-hover:text-gray-600 transition-colors select-none">
              {name.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute top-2 right-2 w-2 h-2 bg-gray-800 group-hover:bg-accent transition-colors duration-150 z-10" />
      </div>

      {/* Body */}
      <div className="p-8 flex flex-col flex-1">

        {/* Order badge + team label */}
        <div className="flex justify-between items-center mb-6 font-mono text-xs text-gray-500">
          <span className="text-accent">[{orderLabel}]</span>
          <span>DAKSH_CORE</span>
        </div>

        {/* Name + Role */}
        <h2 className="text-2xl font-bold tracking-wide mb-2">{name}</h2>
        <p className="font-mono text-xs text-accent mb-6">{role}</p>

        {/* Bio */}
        <p className="font-sans text-sm text-gray-400 leading-relaxed mb-8 flex-1">{bio}</p>

        {/* Tech DNA tags */}
        <div>
          <p className="font-mono text-[10px] text-gray-500 mb-3">TECH_DNA</p>
          <div className="flex flex-wrap gap-2">
            {techStack.map((t) => (
              <span
                key={t}
                className="px-2 py-1 bg-gray-900 border border-gray-800 font-mono text-[10px] text-gray-300 group-hover:border-gray-600 transition-colors"
              >
                [{t}]
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
