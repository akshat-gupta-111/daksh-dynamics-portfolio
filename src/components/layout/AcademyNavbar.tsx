// filepath: src/components/layout/AcademyNavbar.tsx
// Standardized navbar — all 4 public links present on every page.
import Link from "next/link";
import Image from "next/image";

export default function AcademyNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">

        {/* Logo — 40px for comfortable visibility */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/logo.png"
            alt="Daksh Dynamics"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
          <span className="font-bold text-slate-900 text-base tracking-tight">
            Daksh Dynamics
          </span>
        </Link>

        {/* Nav Links — all 4 present on every page */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <Link href="/solutions" className="hover:text-blue-600 transition-colors">Solutions</Link>
          <Link href="/academy"   className="hover:text-violet-600 transition-colors">Academy</Link>
          <Link href="/team"      className="hover:text-slate-900 transition-colors">Team</Link>
          <Link href="/contact"   className="hover:text-slate-900 transition-colors">Contact</Link>
        </div>

        {/* CTA */}
        <Link href="/contact?type=academy" className="btn-purple text-sm hidden md:inline-flex">
          Book a Workshop →
        </Link>

      </div>
    </nav>
  );
}
