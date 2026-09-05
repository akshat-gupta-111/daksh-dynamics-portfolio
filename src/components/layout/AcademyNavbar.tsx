// filepath: src/components/layout/AcademyNavbar.tsx
import Link from "next/link";

export default function AcademyNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold text-sm group-hover:bg-violet-700 transition-colors">
            D
          </div>
          <span className="font-bold text-slate-900 text-base tracking-tight">
            Daksh Dynamics
          </span>
        </Link>

        {/* Nav Links — Academy scoped, no /team (solutions audience) */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <Link href="/academy" className="hover:text-violet-600 transition-colors">
            Academy
          </Link>
          <Link href="/contact?type=academy" className="hover:text-violet-600 transition-colors">
            Contact
          </Link>
        </div>

        {/* CTA */}
        <Link href="/contact?type=academy" className="btn-purple text-sm hidden md:inline-flex">
          Book a Workshop →
        </Link>

      </div>
    </nav>
  );
}
