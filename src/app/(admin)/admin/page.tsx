// filepath: src/app/(admin)/admin/page.tsx
import Link from "next/link";
import { db } from "@/lib/db";
import { solutionsProjects, academyWorkshops, teamMembers, contactMessages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function CommandCenter() {
  const [deploymentCount, workshopCount, rosterCount, unreadCount] = await Promise.all([
    db.$count(solutionsProjects, eq(solutionsProjects.isPublished, true)),
    db.$count(academyWorkshops,  eq(academyWorkshops.isPublished,  true)),
    db.$count(teamMembers,       eq(teamMembers.isPublished,       true)),
    db.$count(contactMessages,   eq(contactMessages.isRead,        false)),
  ]);

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-bold tracking-wide uppercase mb-2">Command Center</h1>
      <p className="font-mono text-gray-400 text-sm mb-12">{"//"} SYSTEM_OVERVIEW & LIVE_METRICS</p>

      {/* Live Stat Blocks */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="brutalist-box p-6">
          <p className="font-mono text-xs text-gray-500 mb-2">LIVE_DEPLOYMENTS</p>
          <p className="text-4xl font-bold">{deploymentCount}</p>
        </div>
        <div className="brutalist-box p-6">
          <p className="font-mono text-xs text-gray-500 mb-2">ACADEMY_RECORDS</p>
          <p className="text-4xl font-bold">{workshopCount}</p>
        </div>
        <div className="brutalist-box p-6">
          <p className="font-mono text-xs text-gray-500 mb-2">TEAM_MEMBERS</p>
          <p className="text-4xl font-bold">{rosterCount}</p>
        </div>
        <div className={`brutalist-box p-6 ${unreadCount > 0 ? "border-accent" : ""}`}>
          <p className={`font-mono text-xs mb-2 ${unreadCount > 0 ? "text-accent" : "text-gray-500"}`}>
            UNREAD_MESSAGES
          </p>
          <p className="text-4xl font-bold">{unreadCount}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="text-xl font-bold tracking-wide uppercase mb-6 border-b border-gray-800 pb-2">
        Quick Execute
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { href: "/admin/deployments/new", title: "Log New Deployment",    desc: "Add an enterprise solution or case study." },
          { href: "/admin/academy/new",     title: "Log Workshop Record",   desc: "Add a conducted FDP or bootcamp." },
          { href: "/admin/roster/new",      title: "Add Team Member",       desc: "Add a member to the engineering roster." },
          { href: "/admin/metrics",         title: "Update Site Metrics",   desc: "Edit OPERATIONAL_TELEMETRY numbers." },
          { href: "/admin/inbox",           title: "View Inbox",            desc: `${unreadCount} unread message${unreadCount !== 1 ? "s" : ""}.` },
          { href: "/admin/deployments",     title: "Manage Deployments",    desc: "Publish, unpublish, or delete records." },
          { href: "/admin/brochures",       title: "Manage Brochures",      desc: "Upload downloadable files for home page cards." },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="group brutalist-box p-6 flex justify-between items-center hover:bg-gray-900 transition-colors"
          >
            <div>
              <h3 className="font-bold mb-1 text-sm">{action.title}</h3>
              <p className="font-mono text-xs text-gray-500">{action.desc}</p>
            </div>
            <span className="text-accent opacity-0 group-hover:opacity-100 font-mono transition-opacity ml-4">{">"}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}