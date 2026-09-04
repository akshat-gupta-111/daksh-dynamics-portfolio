// filepath: src/app/(public)/(solutions)/layout.tsx
import SolutionsNavbar from "@/components/layout/SolutionsNavbar";
import SolutionsFooter from "@/components/layout/SolutionsFooter";

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SolutionsNavbar />
      <main className="flex-1">{children}</main>
      <SolutionsFooter />
    </>
  );
}
