// filepath: src/components/layout/SolutionsNavbar.tsx
import Link from "next/link";

export default function SolutionsNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm group-hover:bg-blue-700 transition-colors">
            D
          </div>
          <span className="font-bold text-slate-900 text-base tracking-tight">
            Daksh Dynamics
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <Link href="/solutions" className="hover:text-blue-600 transition-colors">
            Solutions
          </Link>
          <Link href="/team" className="hover:text-blue-600 transition-colors">
            Team
          </Link>
          <Link href="/contact?type=enterprise" className="hover:text-blue-600 transition-colors">
            Contact
          </Link>
        </div>

        {/* CTA */}
        <Link href="/contact?type=enterprise" className="btn-blue text-sm hidden md:inline-flex">
          Get in Touch →
        </Link>

      </div>
    </nav>
  );
}
