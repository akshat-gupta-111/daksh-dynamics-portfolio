// filepath: src/components/layout/SolutionsFooter.tsx
import Link from "next/link";

export default function SolutionsFooter() {
  return (
    <footer className="border-t border-gray-800 bg-black py-16 px-6">
      <div className="max-w-4xl mx-auto">

        {/* The Terminal Window — solutions/enterprise-scoped contact only */}
        <div className="brutalist-box bg-gray-900/50 p-6 shadow-2xl">
          <div className="flex gap-2 mb-4 border-b border-gray-800 pb-4">
            <div className="w-3 h-3 bg-gray-700"></div>
            <div className="w-3 h-3 bg-gray-700"></div>
            <div className="w-3 h-3 bg-gray-700"></div>
          </div>

          <div className="font-mono text-sm md:text-base text-gray-400 leading-relaxed">
            <p className="text-white">root@dakshdynamics:~# ./initiate_contact.sh</p>
            <p className="mt-2">Initializing secure connection...</p>
            <p>Select target vector:</p>

            <div className="mt-4 flex flex-col gap-2 pl-4">
              <Link href="/contact?type=enterprise" className="hover:text-accent transition-colors w-fit">
                [1] Enterprise_Solutions_Inquiry
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-2 text-accent">
              <span>{">"} Awaiting input</span>
              <span className="w-2 h-4 bg-accent animate-pulse inline-block"></span>
            </div>
          </div>
        </div>

        {/* Copyright & Meta */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between font-mono text-xs text-gray-600">
          <p>© {new Date().getFullYear()} DAKSH_DYNAMICS. ALL_RIGHTS_RESERVED.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="https://github.com/dakshdynamics" target="_blank" className="hover:text-white">GITHUB</Link>
            <Link href="https://linkedin.com/company/dakshdynamics" target="_blank" className="hover:text-white">LINKEDIN</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
