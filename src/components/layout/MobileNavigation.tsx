"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/academy", label: "Academy" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

interface MobileNavigationProps {
  ctaHref: string;
  ctaLabel: string;
}

export default function MobileNavigation({ ctaHref, ctaLabel }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
        <span className="flex flex-col gap-1.5" aria-hidden="true">
          <span className="h-0.5 w-5 bg-current" />
          <span className="h-0.5 w-5 bg-current" />
          <span className="h-0.5 w-5 bg-current" />
        </span>
      </button>

      {isOpen && (
        <div className="absolute inset-x-0 top-16 border-b border-slate-200 bg-white px-6 py-4 shadow-lg">
          <div className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 hover:bg-slate-50 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={ctaHref}
              className="btn-blue mt-2 justify-center"
              onClick={() => setIsOpen(false)}
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}