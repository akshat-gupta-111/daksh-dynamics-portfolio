// filepath: src/app/(public)/page.tsx
import Link from "next/link";
import OrbBackground from "@/components/ui/OrbBackground";
import Image from "next/image";
import { db } from "@/lib/db";
import { siteMetrics, siteBrochures } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import MobileNavigation from "@/components/layout/MobileNavigation";

export default async function HomePage() {
  const [metrics] = await db.select().from(siteMetrics).limit(1);
  const systemsDeployed     = metrics?.systemsDeployed     ?? 0;
  const workshopsConducted  = metrics?.workshopsConducted  ?? 0;
  const participantsTrained = metrics?.participantsTrained ?? 0;

  // Fetch published brochures for both card types
  const brochures = await db.select().from(siteBrochures).where(eq(siteBrochures.isPublished, true));
  const solutionsBrochure = brochures.find((b) => b.type === "solutions") ?? null;
  const academyBrochure   = brochures.find((b) => b.type === "academy") ?? null;

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-bg)]">

      {/* ── Navbar ─────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-sm">
        <div className="relative flex h-16 items-center justify-between px-4 sm:px-6 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Daksh Dynamics" width={40} height={40} className="w-10 h-10 object-contain" />
            <span className="font-bold text-slate-900 text-base tracking-tight">Daksh Dynamics</span>
          </Link>
          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/solutions" className="hover:text-blue-600 transition-colors">Solutions</Link>
            <Link href="/academy"   className="hover:text-violet-600 transition-colors">Academy</Link>
            <Link href="/team"      className="hover:text-slate-900 transition-colors">Team</Link>
            <Link href="/contact"   className="hover:text-slate-900 transition-colors">Contact</Link>
          </div>
          <Link href="/contact" className="btn-blue text-sm hidden md:inline-flex">Get in Touch →</Link>
          <MobileNavigation ctaHref="/contact" ctaLabel="Get in Touch →" />
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-violet-50 pt-20 pb-28 px-6 text-center">
        <OrbBackground variant="mixed" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="badge-blue mb-5 inline-block">Based in India · Deployed Globally</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08] mb-6">
            We build{" "}
            <span className="text-blue-600">autonomous</span>
            {" "}systems.{" "}
            <br className="hidden md:block" />
            We train{" "}
            <span className="text-violet-600">engineers</span>.
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Enterprise AI deployments, edge robotics, and rigorous academic workshops — all backed by production-level engineering.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/solutions" className="btn-blue text-base px-6 py-3">View Deployed Systems →</Link>
            <Link href="/academy"   className="btn-outline-purple text-base px-6 py-3">Academy Portfolio</Link>
          </div>
        </div>
      </section>


      {/* ── What We Build ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="text-center mb-12">
          <p className="section-label mb-2">Two distinct divisions</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">What We Do</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Solutions Card */}
          <div className="card-blue group overflow-hidden p-0 flex flex-col">
            <Link href="/solutions" className="block">
              <div className="h-56 relative overflow-hidden">
                <Image
                  src="/illustrations/solutions.jpg"
                  alt="Enterprise AI Systems"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-7">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Enterprise Solutions</h3>
                <ul className="space-y-2 text-slate-600 text-sm mb-6">
                  {["Multi-Agent AI Systems", "IoT & Edge Robotics", "Custom Hardware Integration", "LangGraph Architectures"].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="btn-blue text-sm inline-flex">Explore Deployments →</span>
              </div>
            </Link>
            {/* Brochure download — only if published */}
            {solutionsBrochure && (
              <div className="px-7 pb-6 mt-auto">
                <a
                  href={solutionsBrochure.fileUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 w-full justify-center border border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors rounded-lg px-4 py-2.5 text-sm font-medium"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  {solutionsBrochure.title}
                </a>
              </div>
            )}
          </div>

          {/* Academy Card */}
          <div className="card-purple group overflow-hidden p-0 flex flex-col">
            <Link href="/academy" className="block">
              <div className="h-56 relative overflow-hidden">
                <Image
                  src="/illustrations/academy.jpg"
                  alt="Academic Workshops"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-7">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Academy & FDPs</h3>
                <ul className="space-y-2 text-slate-600 text-sm mb-6">
                  {["Faculty Development Programs", "Technical Bootcamps", "Institution Workshops", "Hands-on Hardware Labs"].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0">
                        <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="btn-purple text-sm inline-flex">View Workshop Portfolio →</span>
              </div>
            </Link>
            {/* Brochure download — only if published */}
            {academyBrochure && (
              <div className="px-7 pb-6 mt-auto">
                <a
                  href={academyBrochure.fileUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 w-full justify-center border border-violet-200 text-violet-700 bg-violet-50 hover:bg-violet-100 transition-colors rounded-lg px-4 py-2.5 text-sm font-medium"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  {academyBrochure.title}
                </a>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────── */}
      <section className="bg-white border-y border-slate-200 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="section-label text-center mb-10">Impact at a glance</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {[
              { value: systemsDeployed,    suffix: "",   label: "Systems Deployed",     sub: "Enterprise AI · Robotics · IoT" },
              { value: workshopsConducted, suffix: "",   label: "Workshops Conducted",  sub: "FDPs · Bootcamps · Intensives" },
              { value: participantsTrained,suffix: participantsTrained > 0 ? "+" : "", label: "Participants Trained", sub: "Engineers · Researchers · Faculty" },
            ].map(({ value, suffix, label, sub }) => (
              <div key={label} className="text-center px-8 py-8">
                <p className="text-5xl font-extrabold text-slate-900 mb-1">
                  {value > 0 ? `${value}${suffix}` : "—"}
                </p>
                <p className="font-semibold text-slate-700 text-sm mb-1">{label}</p>
                <p className="text-slate-400 text-xs">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="card bg-gradient-to-br from-blue-600 to-violet-600 p-10 md:p-14 text-center text-white" style={{border:"none"}}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to work with us?</h2>
          <p className="text-blue-100 text-base mb-8 max-w-xl mx-auto">
            Whether you need a deployed AI system or a workshop for your institution — let&apos;s talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact?type=enterprise" className="bg-white text-blue-700 font-bold rounded-lg px-6 py-3 text-sm hover:bg-blue-50 transition-colors inline-flex items-center gap-2">
              Enterprise Inquiry →
            </Link>
            <Link href="/contact?type=academy" className="border-2 border-white/60 text-white font-semibold rounded-lg px-6 py-3 text-sm hover:bg-white/10 transition-colors inline-flex items-center gap-2">
              Book a Workshop
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="bg-slate-900 text-slate-400 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-slate-500">© {new Date().getFullYear()} Daksh Dynamics. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/solutions" className="hover:text-white transition-colors">Solutions</Link>
            <Link href="/academy"   className="hover:text-white transition-colors">Academy</Link>
            <Link href="/contact"   className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}