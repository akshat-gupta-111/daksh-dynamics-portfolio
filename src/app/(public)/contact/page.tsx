// filepath: src/app/(public)/contact/page.tsx
import Link from "next/link";
import { submitContact } from "./actions";

interface PageProps {
  searchParams: Promise<{ type?: string; sent?: string }>;
}

export default async function ContactPage({ searchParams }: PageProps) {
  const { type, sent } = await searchParams;
  const preselected = type === "academy" ? "academy" : "enterprise";

  if (sent === "1") {
    return (
      <div className="flex flex-col min-h-screen">
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-sm">
          <div className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">D</div>
              <span className="font-bold text-slate-900 text-base tracking-tight">Daksh Dynamics</span>
            </Link>
          </div>
        </nav>
        <main className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">Message Sent!</h1>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Thanks for reaching out. We&apos;ll get back to you within 24 hours.
            </p>
            <Link href="/" className="btn-blue text-sm">← Back to Home</Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-sm">
        <div className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">D</div>
            <span className="font-bold text-slate-900 text-base tracking-tight">Daksh Dynamics</span>
          </Link>
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">← Back to Home</Link>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-16 w-full">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-label mb-2">We&apos;d love to hear from you</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Get in Touch</h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            Tell us what you&apos;re building or what your institution needs — we&apos;ll respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Left: Contact Details (2/5) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="card p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Contact Details</h3>
              <div className="flex flex-col gap-4">
                {[
                  { icon: "@", label: "Business Email", value: "dakshdynamics@gmail.com", href: "mailto:dakshdynamics@gmail.com", color: "bg-blue-100 text-blue-600" },
                  { icon: "@", label: "Professional Email", value: "hello@akshatcodes.me", href: "mailto:hello@akshatcodes.me", color: "bg-blue-100 text-blue-600" },
                  { icon: "✆", label: "Primary", value: "+91 7599 739 220", href: "tel:+917599739220", color: "bg-violet-100 text-violet-600" },
                  { icon: "✆", label: "Secondary", value: "+91 9105 211 531", href: "tel:+919105211531", color: "bg-violet-100 text-violet-600" },
                ].map(({ icon, label, value, href, color }) => (
                  <a key={value} href={href} className="flex items-center gap-3 group">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${color}`}>
                      {icon}
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium">{label}</p>
                      <p className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors">{value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Find us online</h3>
              <div className="flex flex-col gap-2">
                <a href="https://github.com/akshat-gupta-111" target="_blank" className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors">
                  <span className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center text-xs font-bold">GH</span>
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/akshat-developer" target="_blank" className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors">
                  <span className="w-7 h-7 rounded-md bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">in</span>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Right: Form (3/5) */}
          <form
            action={submitContact}
            className="lg:col-span-3 card p-8 flex flex-col gap-5"
          >
            {/* Type selector */}
            <div>
              <p className="text-sm font-medium text-slate-700 mb-3">I&apos;m inquiring about</p>
              <div className="grid grid-cols-2 gap-3">
                <label className={`cursor-pointer border-2 rounded-xl p-3 flex items-center gap-2 transition-all ${preselected === "enterprise" ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-slate-300"}`}>
                  <input type="radio" name="type" value="enterprise" defaultChecked={preselected === "enterprise"} className="accent-blue-600" />
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">Enterprise</p>
                    <p className="text-slate-500 text-xs">AI / Robotics projects</p>
                  </div>
                </label>
                <label className={`cursor-pointer border-2 rounded-xl p-3 flex items-center gap-2 transition-all ${preselected === "academy" ? "border-violet-500 bg-violet-50" : "border-slate-200 hover:border-slate-300"}`}>
                  <input type="radio" name="type" value="academy" defaultChecked={preselected === "academy"} className="accent-violet-600" />
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">Academy</p>
                    <p className="text-slate-500 text-xs">Workshops / FDPs</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-slate-700 mb-1.5 block">Your Name</label>
                <input id="name" name="name" type="text" required placeholder="Dr. Rajesh Kumar" className="input-light" />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium text-slate-700 mb-1.5 block">Email Address</label>
                <input id="email" name="email" type="email" required placeholder="you@institution.ac.in" className="input-light" />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="text-sm font-medium text-slate-700 mb-1.5 block">
                Phone <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input id="phone" name="phone" type="tel" placeholder="+91 XXXXX XXXXX" className="input-light" />
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-medium text-slate-700 mb-1.5 block">Message</label>
              <textarea id="message" name="message" required rows={5} placeholder="Describe your requirement..." className="input-light resize-none" />
            </div>

            <button type="submit" className="btn-blue w-full justify-center text-base py-3">
              Send Message →
            </button>

            <p className="text-xs text-slate-400 text-center">We reply within 24 hours. Your message is stored securely.</p>
          </form>

        </div>
      </main>

      <footer className="border-t border-slate-200 py-6 px-6 mt-10">
        <p className="text-xs text-slate-400 text-center">© {new Date().getFullYear()} Daksh Dynamics. All rights reserved.</p>
      </footer>
    </div>
  );
}
