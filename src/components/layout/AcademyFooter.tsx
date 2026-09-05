// filepath: src/components/layout/AcademyFooter.tsx
import Link from "next/link";
import Image from "next/image";

export default function AcademyFooter() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-3">
              <Image src="/logo.png" alt="Daksh Dynamics" width={40} height={40} className="w-10 h-10 object-contain" />
              <span className="font-bold text-white text-base">Daksh Dynamics</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              Rigorous FDPs and technical workshops backed by production-level engineering expertise.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-4">Navigate</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="/solutions" className="hover:text-violet-400 transition-colors">Deployed Systems</Link></li>
              <li><Link href="/academy"   className="hover:text-violet-400 transition-colors">Academy & FDPs</Link></li>
              <li><Link href="/team"      className="hover:text-violet-400 transition-colors">Engineering Team</Link></li>
              <li><Link href="/contact"   className="hover:text-violet-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-4">Contact</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li><a href="mailto:dakshdynamics@gmail.com" className="hover:text-violet-400 transition-colors">dakshdynamics@gmail.com</a></li>
              <li><a href="mailto:hello@akshatcodes.me"    className="hover:text-violet-400 transition-colors">hello@akshatcodes.me</a></li>
              <li><a href="tel:+917599739220"              className="hover:text-violet-400 transition-colors">+91 7599 739 220</a></li>
              <li><a href="tel:+919105211531"              className="hover:text-violet-400 transition-colors">+91 9105 211 531</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} Daksh Dynamics. All rights reserved.</p>
          <Link href="/" className="hover:text-slate-400 transition-colors">← Back to Home</Link>
        </div>
      </div>
    </footer>
  );
}
