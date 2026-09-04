// filepath: src/components/layout/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/90 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
        
        {/* Left: Branding */}
        <div className="font-sans font-bold tracking-widest text-lg">
          <Link href="/" className="hover:text-accent transition-colors">
            DAKSH_DYNAMICS
          </Link>
        </div>

        {/* Center/Right: Routing (Hidden on small mobile screens for now) */}
        <div className="hidden md:flex gap-8 font-mono text-sm text-gray-400">
          <Link href="/solutions" className="hover:text-accent transition-colors">
            [SOLUTIONS]
          </Link>
          <Link href="/academy" className="hover:text-accent transition-colors">
            [ACADEMY]
          </Link>
          <Link href="/team" className="hover:text-accent transition-colors">
            [TEAM]
          </Link>
        </div>

        {/* Far Right: System Status */}
        <div className="flex items-center gap-3 font-mono text-xs text-gray-400">
          <span className="hidden sm:inline">STATUS: OPERATIONAL</span>
          {/* The blinking telemetry dot */}
          <div className="h-2 w-2 bg-accent animate-pulse shadow-[0_0_8px_#00E5FF]"></div>
        </div>
        
      </div>
    </nav>
  );
}