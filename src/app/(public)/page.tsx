// filepath: src/app/(public)/page.tsx
import Link from "next/link";
import { db } from "@/lib/db";
import { siteMetrics } from "@/lib/db/schema";

export default async function HomePage() {
  // Read the single admin-controlled metrics row
  const [metrics] = await db.select().from(siteMetrics).limit(1);

  const systemsDeployed     = metrics?.systemsDeployed     ?? 0;
  const workshopsConducted  = metrics?.workshopsConducted  ?? 0;
  const participantsTrained = metrics?.participantsTrained ?? 0;

  return (
    <div className="flex flex-col min-h-screen">

      {/* =========================================
          NEUTRAL HOME NAVBAR — logo only, no section links.
          The two panels below ARE the navigation.
          ========================================= */}
      <nav className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/90 backdrop-blur-sm">
        <div className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
          <div className="font-sans font-bold tracking-widest text-lg">
            <Link href="/" className="hover:text-accent transition-colors">
              DAKSH_DYNAMICS
            </Link>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs text-gray-400">
            <span className="hidden sm:inline">STATUS: OPERATIONAL</span>
            <div className="h-2 w-2 bg-accent animate-pulse shadow-[0_0_8px_#00E5FF]"></div>
          </div>
        </div>
      </nav>

      {/* =========================================
          SECTION 1: THE HERO & BIFURCATION FUNNEL
          ========================================= */}
      <div className="flex flex-col min-h-[calc(100vh-4rem)]">
        <div className="flex-1 flex items-center justify-center p-8 md:p-16 border-b border-gray-800">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-extrabold tracking-tighter uppercase leading-tight text-center max-w-5xl">
            We engineer <span className="text-accent">autonomous systems</span>.
            <br className="hidden md:block" />
            We train the next generation.
          </h1>
        </div>

        <div className="flex-1 flex flex-col md:flex-row">
          <Link
            href="/solutions"
            className="group flex-1 flex flex-col justify-center p-8 md:p-16 border-b md:border-b-0 md:border-r border-gray-800 brutalist-box relative"
          >
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-wide">[ SOLUTIONS ]</h2>
              <p className="text-gray-400 font-mono text-sm max-w-md leading-relaxed">
                Deploy enterprise AI architectures, multi-agent RAGs, and custom IoT hardware.
              </p>
              <div className="mt-8 font-mono text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                {">"} Initialize Deployment_
              </div>
            </div>
          </Link>

          <Link
            href="/academy"
            className="group flex-1 flex flex-col justify-center p-8 md:p-16 brutalist-box relative"
          >
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-wide">[ ACADEMY ]</h2>
              <p className="text-gray-400 font-mono text-sm max-w-md leading-relaxed">
                Rigorous FDPs and technical workshops backed by production-level engineering.
              </p>
              <div className="mt-8 font-mono text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                {">"} View Portfolio_
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* =========================================
          SECTION 2: NEUTRAL IMPACT STATS
          Manually controlled by admin — both audiences see credibility.
          ========================================= */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-20">

          <p className="font-mono text-xs text-gray-500 text-center mb-12 tracking-widest uppercase">
            {"//"} OPERATIONAL_TELEMETRY
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-800">

            <div className="brutalist-box p-10 flex flex-col items-center justify-center text-center md:border-r border-gray-800">
              <p className="text-5xl md:text-6xl font-extrabold tracking-tighter text-white mb-3">
                {systemsDeployed}
              </p>
              <p className="font-mono text-xs text-accent tracking-widest uppercase">
                Systems Deployed
              </p>
              <p className="font-mono text-[10px] text-gray-600 mt-2">
                Enterprise AI · Robotics · IoT
              </p>
            </div>

            <div className="brutalist-box p-10 flex flex-col items-center justify-center text-center md:border-r border-gray-800">
              <p className="text-5xl md:text-6xl font-extrabold tracking-tighter text-white mb-3">
                {workshopsConducted}
              </p>
              <p className="font-mono text-xs text-accent tracking-widest uppercase">
                Workshops Conducted
              </p>
              <p className="font-mono text-[10px] text-gray-600 mt-2">
                FDPs · Bootcamps · Intensives
              </p>
            </div>

            <div className="brutalist-box p-10 flex flex-col items-center justify-center text-center">
              <p className="text-5xl md:text-6xl font-extrabold tracking-tighter text-white mb-3">
                {participantsTrained > 0 ? `${participantsTrained}+` : "—"}
              </p>
              <p className="font-mono text-xs text-accent tracking-widest uppercase">
                Participants Trained
              </p>
              <p className="font-mono text-[10px] text-gray-600 mt-2">
                Engineers · Researchers · Faculty
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* =========================================
          HOME FOOTER — neutral, shows both contact paths
          ========================================= */}
      <footer className="border-t border-gray-800 bg-black py-16 px-6">
        <div className="max-w-4xl mx-auto">
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
                <Link href="/contact?type=academy" className="hover:text-accent transition-colors w-fit">
                  [2] Academic_Workshop_Booking
                </Link>
              </div>
              <div className="mt-6 flex items-center gap-2 text-accent">
                <span>{">"} Awaiting input</span>
                <span className="w-2 h-4 bg-accent animate-pulse inline-block"></span>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between font-mono text-xs text-gray-600">
            <p>© {new Date().getFullYear()} DAKSH_DYNAMICS. ALL_RIGHTS_RESERVED.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="https://github.com/dakshdynamics" target="_blank" className="hover:text-white">GITHUB</Link>
              <Link href="https://linkedin.com/company/dakshdynamics" target="_blank" className="hover:text-white">LINKEDIN</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}