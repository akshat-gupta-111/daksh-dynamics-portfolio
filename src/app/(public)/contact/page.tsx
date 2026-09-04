// filepath: src/app/(public)/contact/page.tsx
import Link from "next/link";
import { submitContact } from "./actions";

interface PageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function ContactPage({ searchParams }: PageProps) {
  const { type } = await searchParams;
  const preselected = type === "academy" ? "academy" : "enterprise";

  return (
    <div className="flex flex-col min-h-screen">

      {/* Minimal logo-only navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/90 backdrop-blur-sm">
        <div className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
          <div className="font-sans font-bold tracking-widest text-lg">
            <Link href="/" className="hover:text-accent transition-colors">DAKSH_DYNAMICS</Link>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs text-gray-400">
            <span className="hidden sm:inline">STATUS: OPERATIONAL</span>
            <div className="h-2 w-2 bg-accent animate-pulse shadow-[0_0_8px_#00E5FF]"></div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-16 w-full">

        {/* Header */}
        <div className="border-b border-gray-800 pb-8 mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase mb-4">
            Initiate Contact
          </h1>
          <p className="font-mono text-gray-400 text-sm max-w-2xl leading-relaxed">
            {"//"} SECURE_CHANNEL. Drop a message and we will respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left: Contact Details */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="font-mono text-xs text-gray-500 mb-4 tracking-widest">CONTACT_VECTORS</p>

              <div className="flex flex-col gap-4">
                {/* Email 1 */}
                <div className="brutalist-box p-5 flex items-center gap-4">
                  <span className="font-mono text-accent text-lg">@</span>
                  <div>
                    <p className="font-mono text-[10px] text-gray-500 mb-1">BUSINESS_EMAIL</p>
                    <a
                      href="mailto:dakshdynamics@gmail.com"
                      className="font-mono text-sm text-white hover:text-accent transition-colors"
                    >
                      dakshdynamics@gmail.com
                    </a>
                  </div>
                </div>

                {/* Email 2 */}
                <div className="brutalist-box p-5 flex items-center gap-4">
                  <span className="font-mono text-accent text-lg">@</span>
                  <div>
                    <p className="font-mono text-[10px] text-gray-500 mb-1">PROFESSIONAL_EMAIL</p>
                    <a
                      href="mailto:hello@akshatcodes.me"
                      className="font-mono text-sm text-white hover:text-accent transition-colors"
                    >
                      hello@akshatcodes.me
                    </a>
                  </div>
                </div>

                {/* Phone 1 */}
                <div className="brutalist-box p-5 flex items-center gap-4">
                  <span className="font-mono text-accent text-lg">#</span>
                  <div>
                    <p className="font-mono text-[10px] text-gray-500 mb-1">PRIMARY_LINE</p>
                    <a
                      href="tel:+917599739220"
                      className="font-mono text-sm text-white hover:text-accent transition-colors"
                    >
                      +91 7599 739 220
                    </a>
                  </div>
                </div>

                {/* Phone 2 */}
                <div className="brutalist-box p-5 flex items-center gap-4">
                  <span className="font-mono text-accent text-lg">#</span>
                  <div>
                    <p className="font-mono text-[10px] text-gray-500 mb-1">SECONDARY_LINE</p>
                    <a
                      href="tel:+919105211531"
                      className="font-mono text-sm text-white hover:text-accent transition-colors"
                    >
                      +91 9105 211 531
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="font-mono text-xs text-gray-500 mb-4 tracking-widest">NETWORK_NODES</p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/dakshdynamics"
                  target="_blank"
                  className="brutalist-box px-4 py-2 font-mono text-xs text-gray-400 hover:text-accent hover:border-accent transition-colors"
                >
                  [GITHUB]
                </a>
                <a
                  href="https://linkedin.com/company/dakshdynamics"
                  target="_blank"
                  className="brutalist-box px-4 py-2 font-mono text-xs text-gray-400 hover:text-accent hover:border-accent transition-colors"
                >
                  [LINKEDIN]
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <form action={submitContact} className="flex flex-col gap-5">

            {/* Type selector */}
            <div className="flex flex-col gap-2">
              <p className="font-mono text-xs text-gray-400">INQUIRY_TYPE</p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="type"
                    value="enterprise"
                    defaultChecked={preselected === "enterprise"}
                    className="accent-accent"
                  />
                  <span className="font-mono text-sm text-gray-300 group-hover:text-accent transition-colors">
                    Enterprise Solutions
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="type"
                    value="academy"
                    defaultChecked={preselected === "academy"}
                    className="accent-accent"
                  />
                  <span className="font-mono text-sm text-gray-300 group-hover:text-accent transition-colors">
                    Academic Workshop
                  </span>
                </label>
              </div>
            </div>

            {/* Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-mono text-xs text-gray-400">YOUR_NAME</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="e.g., Dr. Rajesh Kumar"
                className="brutalist-box px-4 py-3 font-sans text-white focus:outline-none focus:border-accent bg-transparent"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-mono text-xs text-gray-400">EMAIL_ADDRESS</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="you@institution.ac.in"
                className="brutalist-box px-4 py-3 font-sans text-white focus:outline-none focus:border-accent bg-transparent"
              />
            </div>

            {/* Phone (optional) */}
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="font-mono text-xs text-gray-400">
                PHONE <span className="text-gray-600">(optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+91 XXXXX XXXXX"
                className="brutalist-box px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-accent bg-transparent"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-mono text-xs text-gray-400">MESSAGE</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Describe your requirement..."
                className="brutalist-box px-4 py-3 font-sans text-white focus:outline-none focus:border-accent resize-none bg-transparent"
              />
            </div>

            <button
              type="submit"
              className="mt-2 bg-white text-black font-bold uppercase tracking-widest px-6 py-4 hover:bg-accent transition-colors"
            >
              Transmit Message
            </button>

            <p className="font-mono text-[10px] text-gray-600 text-center">
              Your message is stored securely and sent directly to our team.
            </p>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 px-6">
        <p className="font-mono text-xs text-gray-600 text-center">
          © {new Date().getFullYear()} DAKSH_DYNAMICS. ALL_RIGHTS_RESERVED.
        </p>
      </footer>
    </div>
  );
}
