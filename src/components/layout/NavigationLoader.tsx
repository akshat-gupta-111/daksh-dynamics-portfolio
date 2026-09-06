"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavigationLoader() {
  const pathname = usePathname();
  const [targetPath, setTargetPath] = useState<string | null>(null);

  useEffect(() => {
    setTargetPath(null);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target as HTMLElement;
      const link = target.closest<HTMLAnchorElement>("a[href]");
      const navigableCard = target.closest<HTMLElement>("[data-navigation]");

      if (link) {
        const url = new URL(link.href);
        if (url.origin !== window.location.origin || url.pathname === window.location.pathname) {
          return;
        }
        setTargetPath(url.pathname);
      } else if (!navigableCard) {
        return;
      } else {
        setTargetPath(navigableCard.getAttribute("data-navigation"));
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  if (!targetPath || targetPath === pathname) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/20 backdrop-blur-[2px]"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="flex items-end gap-3 rounded-full bg-black/80 px-6 py-5 shadow-2xl" aria-hidden="true">
        <span className="loader-ball h-5 w-5 rounded-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,.65)]" />
        <span className="loader-ball loader-ball--delayed h-5 w-5 rounded-full bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,.65)]" />
      </div>
      <span className="sr-only">Loading page</span>
    </div>
  );
}