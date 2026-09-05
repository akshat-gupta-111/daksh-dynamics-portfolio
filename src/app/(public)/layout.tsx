// filepath: src/app/(public)/layout.tsx
// Base wrapper for all (public) routes. Light background.
// Navbars/Footers are scoped per sub-group ((academy), (solutions)).
// Home page and contact handle their own inline nav.
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text-primary)" }}>
      {children}
    </div>
  );
}