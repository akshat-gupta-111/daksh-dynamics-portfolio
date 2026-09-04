// filepath: src/app/(public)/layout.tsx
// Base wrapper for all (public) routes.
// Navbar/Footer are NOT here — each audience sub-group ((academy), (solutions))
// provides its own scoped layout. The home page (/) handles its own minimal nav inline.
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {children}
    </div>
  );
}