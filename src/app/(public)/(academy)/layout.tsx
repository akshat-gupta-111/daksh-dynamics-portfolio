// filepath: src/app/(public)/(academy)/layout.tsx
import AcademyNavbar from "@/components/layout/AcademyNavbar";
import AcademyFooter from "@/components/layout/AcademyFooter";

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AcademyNavbar />
      <main className="flex-1">{children}</main>
      <AcademyFooter />
    </>
  );
}
