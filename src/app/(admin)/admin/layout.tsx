// filepath: src/app/(admin)/admin/layout.tsx
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-black text-white font-sans selection:bg-accent selection:text-black">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-gray-800 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-800">
          <span className="font-bold tracking-widest text-sm uppercase">DAKSH_ADMIN</span>
        </div>
        
        <nav className="flex-1 flex flex-col gap-2 p-4 font-mono text-sm text-gray-400">
          <Link href="/admin" className="hover:text-accent hover:bg-gray-900 px-3 py-2 transition-colors">
            [1] COMMAND_CENTER
          </Link>
          <Link href="/admin/deployments" className="hover:text-accent hover:bg-gray-900 px-3 py-2 transition-colors">
            [2] DEPLOYMENTS
          </Link>
          <Link href="/admin/academy" className="hover:text-accent hover:bg-gray-900 px-3 py-2 transition-colors">
            [3] ACADEMY
          </Link>
          <Link href="/admin/roster" className="hover:text-accent hover:bg-gray-900 px-3 py-2 transition-colors">
            [4] ROSTER
          </Link>
          <Link href="/admin/inbox" className="hover:text-accent hover:bg-gray-900 px-3 py-2 transition-colors">
            [5] INBOX
          </Link>
          <Link href="/admin/metrics" className="hover:text-accent hover:bg-gray-900 px-3 py-2 transition-colors">
            [6] METRICS
          </Link>
        </nav>
        
        <div className="p-4 border-t border-gray-800 font-mono text-xs text-gray-600">
          SYSTEM_STATUS: ONLINE
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b border-gray-800 flex items-center px-8 md:hidden">
           <span className="font-bold tracking-widest text-sm uppercase">DAKSH_ADMIN</span>
        </header>
        <div className="flex-1 p-8 overflow-y-auto">
          {children}
        </div>
      </main>
      
    </div>
  );
}