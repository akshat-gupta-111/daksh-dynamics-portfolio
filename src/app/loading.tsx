export default function Loading() {
  return (
    <main
      className="fixed inset-0 grid place-items-center bg-[#050505]"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="flex items-end gap-3" aria-hidden="true">
        <span className="loader-ball h-5 w-5 rounded-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,.65)]" />
        <span className="loader-ball loader-ball--delayed h-5 w-5 rounded-full bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,.65)]" />
      </div>
      <span className="sr-only">Loading page</span>
    </main>
  );
}
