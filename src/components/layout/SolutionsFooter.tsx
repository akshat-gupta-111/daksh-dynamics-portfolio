// filepath: src/components/layout/SolutionsFooter.tsx
import Link from "next/link";

export default function SolutionsFooter() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">D</div>
              <span className="font-bold text-white text-base">Daksh Dynamics</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              Building autonomous AI systems and training the next generation of engineers.
            </p>
          </div>

          {/* Solutions links */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-4">Solutions</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="/solutions" className="hover:text-blue-400 transition-colors">Deployed Systems</Link></li>
              <li><Link href="/team" className="hover:text-blue-400 transition-colors">Engineering Team</Link></li>
              <li><Link href="/contact?type=enterprise" className="hover:text-blue-400 transition-colors">Enterprise Inquiry</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-4">Contact</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li><a href="mailto:dakshdynamics@gmail.com" className="hover:text-blue-400 transition-colors">dakshdynamics@gmail.com</a></li>
              <li><a href="tel:+917599739220" className="hover:text-blue-400 transition-colors">+91 7599 739 220</a></li>
              <li><a href="tel:+919105211531" className="hover:text-blue-400 transition-colors">+91 9105 211 531</a></li>
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
