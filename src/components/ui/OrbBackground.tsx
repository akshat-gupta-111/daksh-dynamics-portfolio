// filepath: src/components/ui/OrbBackground.tsx
// Reusable animated orb + dot-grid background layer.
// Drop as the FIRST child of any `relative overflow-hidden` container.
// All content siblings need `relative z-10` to sit above the orbs.

interface OrbBackgroundProps {
  /** "blue" = Solutions pages · "purple" = Academy pages · "mixed" = Home / Contact */
  variant?: "blue" | "purple" | "mixed";
}

export default function OrbBackground({ variant = "mixed" }: OrbBackgroundProps) {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* ── Blue orbs ─────────────────────────────────────── */}
      {(variant === "blue" || variant === "mixed") && (
        <>
          {/* Top-left primary orb */}
          <div className="animate-blob absolute top-[-60px] left-[-40px] w-80 h-80 rounded-full bg-blue-500/35 blur-3xl" />
          {/* Bottom-right secondary */}
          <div className="animate-blob animation-delay-4 absolute bottom-[-40px] right-[-20px] w-72 h-72 rounded-full bg-sky-400/30 blur-3xl" />
        </>
      )}

      {/* ── Purple orbs ───────────────────────────────────── */}
      {(variant === "purple" || variant === "mixed") && (
        <>
          {/* Top-right primary orb */}
          <div className="animate-blob animation-delay-2 absolute top-[-50px] right-[-40px] w-80 h-80 rounded-full bg-violet-500/30 blur-3xl" />
          {/* Bottom-left accent */}
          <div className="animate-blob-slow animation-delay-6 absolute bottom-[-30px] left-1/4 w-64 h-64 rounded-full bg-indigo-400/25 blur-3xl" />
        </>
      )}

      {/* ── Center glow — always present ──────────────────── */}
      <div className="animate-blob-slow animation-delay-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-200/20 blur-3xl" />

      {/* ── Dot grid overlay ──────────────────────────────── */}
      <div className="dot-grid absolute inset-0 opacity-[0.09]" />
    </div>
  );
}
