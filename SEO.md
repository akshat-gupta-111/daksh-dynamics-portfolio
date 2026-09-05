```markdown
# Daksh Dynamics - Comprehensive SEO & GEO Optimization Plan

**Target Goal:** Achieve first-page Google ranking for "Daksh Dynamics" and optimize for Generative Engine Optimization (GEO/LLMs). 
**Context for Coding Agent:** Implement the following file-by-file changes to resolve all SEOptimer audit failures (Grade C- to A+) and establish strong brand entity recognition.

---

## Phase 1: Global Metadata & Entity Schema
**Target File:** `app/layout.tsx` (or root layout file)

### 1. Update Global Metadata
Replace the existing metadata object to fix title spacing, expand description length (120-160 chars), and add Open Graph / X (Twitter) cards.

```tsx
export const metadata = {
  title: 'Daksh Dynamics | Autonomous Systems & Engineering Academy',
  description: 'Daksh Dynamics engineers scalable enterprise AI architectures, autonomous multi-agent systems (LangGraph), and custom IoT hardware. Join our expert engineering academy.',
  metadataBase: new URL('[https://dakshdynamics.akshatcodes.me](https://dakshdynamics.akshatcodes.me)'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Daksh Dynamics',
    description: 'Enterprise AI deployments, edge robotics, and rigorous academic workshops.',
    url: '[https://dakshdynamics.akshatcodes.me](https://dakshdynamics.akshatcodes.me)',
    siteName: 'Daksh Dynamics',
    images: [
      {
        url: '/og-image.jpg', // Agent: Ensure this image exists in /public
        width: 1200,
        height: 630,
        alt: 'Daksh Dynamics Enterprise AI',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daksh Dynamics',
    description: 'Enterprise AI deployments, edge robotics, and rigorous academic workshops.',
    images: ['/og-image.jpg'],
  },
}

```

### 2. Inject JSON-LD Structured Data

Add Identity (Organization) and Local Business schema to the `<head>` to establish the brand entity for AI search engines.

```tsx
// Inject this into the <head> of the layout
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "[https://schema.org](https://schema.org)",
      "@graph": [
        {
          "@type": "Organization",
          "name": "Daksh Dynamics",
          "alternateName": "DakshDynamics",
          "url": "[https://dakshdynamics.akshatcodes.me](https://dakshdynamics.akshatcodes.me)",
          "logo": "[https://dakshdynamics.akshatcodes.me/logo.png](https://dakshdynamics.akshatcodes.me/logo.png)",
          "description": "Enterprise AI deployments, edge robotics, and rigorous academic workshops.",
          "sameAs": [
            "[https://linkedin.com/company/daksh-dynamics](https://linkedin.com/company/daksh-dynamics)",
            "[https://github.com/daksh-dynamics](https://github.com/daksh-dynamics)"
          ]
        },
        {
          "@type": "LocalBusiness",
          "name": "Daksh Dynamics",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Mathura",
            "addressRegion": "Uttar Pradesh",
            "addressCountry": "IN"
          }
        }
      ]
    })
  }}
/>

```

---

## Phase 2: Static Assets for Crawlers

**Target Directory:** `/public`

### 1. Create `robots.txt`

Allow all major crawlers (including AI bots) and link to the sitemap.

```text
User-agent: *
Allow: /

Sitemap: [https://dakshdynamics.akshatcodes.me/sitemap.xml](https://dakshdynamics.akshatcodes.me/sitemap.xml)

```

### 2. Create `llms.txt`

Provide a clean Markdown summary specifically for LLM crawlers (ChatGPT, Perplexity, Google AI Overviews).

```markdown
# Daksh Dynamics
Daksh Dynamics is a technology company specializing in two distinct divisions: Enterprise Solutions and an Engineering Academy. Based in Mathura, Uttar Pradesh, India, we deploy systems globally.

## Enterprise Solutions
We build scalable, production-ready autonomous systems including:
- Multi-Agent AI Systems (utilizing LangGraph architectures)
- Custom IoT & Edge Robotics (including hospitality rovers and agricultural bots)
- Custom Hardware-Software Integration

## Academy & FDPs
We train the next generation of engineers through:
- Faculty Development Programs (FDPs)
- Technical Bootcamps and Institution Workshops
- Hands-on Hardware and AI Labs

```

---

## Phase 3: On-Page Content & HTML Structure

**Target File:** `app/page.tsx` (Homepage)

### 1. Fix Heading (H1-H6) Hierarchy

Ensure there is only **one** `<h1>` tag on the page.

* **Change Hero H1:** `<h1>Daksh Dynamics: Autonomous Systems & Engineering Academy</h1>`
* **Demote "What We Do":** Change from `<h1>` to `<h2>`.
* **Demote "Ready to work with us?":** Change from `<h1>` to `<h2>`.
* **Demote Service Cards:** Change "Enterprise Solutions" and "Academy & FDPs" to `<h3>`.

### 2. Resolve "Thin Content" (Increase Word Count)

Insert this SEO-optimized "About Us" section directly below the Hero section and above "What We Do":

```tsx
<section className="about-section" aria-labelledby="about-heading">
  <h2 id="about-heading" className="sr-only">About Daksh Dynamics</h2>
  <p>
    At Daksh Dynamics, we specialize in bridging the gap between advanced artificial intelligence software and physical hardware. Based in Mathura, UP, our engineering team architects complex autonomous systems, from LangGraph-powered multi-agent AI environments to robust, custom IoT edge robotics designed for real-world environments like agriculture and hospitality. 
  </p>
  <p>
    Beyond our enterprise deployments, the Daksh Dynamics Engineering Academy is committed to upskilling the global workforce. Through intensive Faculty Development Programs (FDPs) and hands-on bootcamps, we equip researchers, students, and professionals with the production-level skills required to build the future of tech.
  </p>
</section>

```

### 3. Semantic HTML for Statistics

Convert the "Impact at a Glance" numbers into a description list (`<dl>`) for semantic clarity.

```tsx
<dl className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
  <div>
    <dt className="text-sm">Systems Deployed (Enterprise AI, Robotics, IoT)</dt>
    <dd className="text-4xl font-bold">12</dd>
  </div>
  <div>
    <dt className="text-sm">Workshops Conducted (FDPs, Bootcamps)</dt>
    <dd className="text-4xl font-bold">5</dd>
  </div>
  <div>
    <dt className="text-sm">Participants Trained (Engineers, Researchers)</dt>
    <dd className="text-4xl font-bold">100+</dd>
  </div>
</dl>

```

### 4. Optimize Image Alt Attributes

Locate all `<Image>` or `<img>` tags and update the `alt` text:

* *Enterprise Card:* `alt="Daksh Dynamics custom IoT hardware and multi-agent AI architecture"`
* *Academy Card:* `alt="Daksh Dynamics engineering academy and hands-on robotics workshops"`

### 5. Remove Inline Styles

*Agent Task:* Scan the entire homepage for `style={{...}}` or `style="..."` attributes. Convert all inline styles to equivalent Tailwind CSS utility classes.

---

## Phase 4: Routing & Footer Cleanup

**Target Files:** `app/contact/page.tsx` & `components/Footer.tsx`

### 1. Fix "Unfriendly Links" (Routing)

Refactor query parameter URLs to clean static paths.

* **Change:** `href="/contact?type=enterprise"` ➔ `href="/contact/enterprise"`
* **Change:** `href="/contact?type=academy"` ➔ `href="/contact/academy"`
*(Agent: Ensure the Next.js router is updated to handle these dynamic or static routes accordingly).*

### 2. Overhaul the Footer

Replace the existing minimal footer with an SEO-rich footer containing NAP (Name, Address, Phone) data and social links.

```tsx
<footer className="bg-gray-900 text-white py-12 mt-16">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
    <div>
      <h3 className="font-bold text-xl mb-2">Daksh Dynamics</h3>
      <address className="not-italic text-sm text-gray-300">
        <p>Enterprise AI & Edge Robotics</p>
        <p>Mathura, Uttar Pradesh, India</p>
        <a href="mailto:hello@dakshdynamics.com" className="hover:text-blue-400 mt-2 block">
          hello@dakshdynamics.com
        </a>
      </address>
    </div>
    <div className="flex flex-col space-y-2">
      <h3 className="font-bold text-lg mb-2">Quick Links</h3>
      <Link className="hover:text-blue-400" href="/">Home</Link>
      <Link className="hover:text-blue-400" href="/solutions">Enterprise Solutions</Link>
      <Link className="hover:text-blue-400" href="/academy">Engineering Academy</Link>
      <Link className="hover:text-blue-400" href="/team">Our Team</Link>
      <Link className="hover:text-blue-400" href="/contact">Contact Us</Link>
    </div>
    <div className="flex flex-col space-y-2">
      <h3 className="font-bold text-lg mb-2">Connect</h3>
      <a href="[https://linkedin.com/company/daksh-dynamics](https://linkedin.com/company/daksh-dynamics)" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
        LinkedIn
      </a>
      <a href="[https://github.com/daksh-dynamics](https://github.com/daksh-dynamics)" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
        GitHub
      </a>
      <a href="[https://twitter.com/dakshdynamics](https://twitter.com/dakshdynamics)" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
        X (Twitter)
      </a>
    </div>
  </div>
  <div className="text-center text-sm text-gray-500 mt-8 pt-4 border-t border-gray-700">
    © {new Date().getFullYear()} Daksh Dynamics. All rights reserved.
  </div>
</footer>

```

---

## Phase 5: Domain & DNS Actions (Manual Checklist for Owner)

*These steps cannot be automated by the codebase and must be completed in Vercel/DNS providers.*

* [ ] **Email Deliverability:** Add SPF and DMARC TXT records to Vercel DNS to secure domain email.
* [ ] **Google Search Console:** Submit `https://dakshdynamics.akshatcodes.me` to GSC, upload the `sitemap.xml`, and click "Request Indexing" immediately after deploying these code changes.
* [ ] **Backlink Generation:** Add a link to `https://dakshdynamics.akshatcodes.me` with the anchor text "Daksh Dynamics" from your primary `akshatcodes.me` domain and your personal LinkedIn profile.


## Phase 6: Analytics & Tracking Implementation
**Target:** Resolve the "Analytics Missing" error and monitor traffic.

You need to know if your SEO changes are actually working. Since you are hosted on Vercel, you have two primary options:
*   **Vercel Web Analytics:** The easiest integration. Go to your Vercel Dashboard for `dakshdynamics`, click the Analytics tab, and enable it. Then install the `@vercel/analytics` package and add `<Analytics />` to your root layout.
*   **Google Analytics (GA4):** Create a GA4 property, grab the Measurement ID, and inject the Google Tag Manager script into your `app/layout.tsx` `<head>`.

## Phase 7: Mobile Performance Fine-Tuning
**Target:** Improve the Mobile PageSpeed Insights score (currently flagged at 74/100).

Your desktop speed is a 98, but Google uses "mobile-first indexing," meaning it ranks your site based on the mobile experience. 
*   **Reduce Unused JavaScript:** Have your coding agent audit the bundle size. If you are importing heavy libraries (like Three.js or large animation libraries) that aren't visible on mobile, dynamically import them or lazy-load them only for desktop viewports.
*   **Audit Redirects:** The audit flagged "multiple page redirects." Ensure your Next.js `next.config.js` or middleware isn't unnecessarily bouncing mobile users across routes before serving the homepage.

## Phase 8: Long-Term Authority Building (Content Strategy)
**Target:** Resolve the "0 Backlinks" problem and build topical authority.

A static homepage rarely holds the #1 spot forever. Search engines want to see active, expert content that proves you are an authority on AI and robotics.
*   **Deploy a `/case-studies` or `/blog` route:** Set up a simple Markdown or CMS-backed routing system.
*   **Publish Technical Content:** Write detailed breakdowns of the autonomous systems you build. For example, publishing a technical case study on how you integrated LangGraph for multi-agent workflows, or the hardware-software integration challenges of building agricultural bots and hospitality rovers. 
*   **Syndicate:** Share these specific case study URLs on LinkedIn, GitHub, and Medium. When other developers or institutions link back to your technical articles, your overall domain authority skyrockets, pushing your homepage higher for brand searches.
```
```