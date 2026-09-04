// filepath: src/app/(admin)/admin/metrics/page.tsx
import { db } from "@/lib/db";
import { siteMetrics } from "@/lib/db/schema";
import { updateMetrics } from "./actions";

export default async function MetricsPage() {
  // Fetch the current values to pre-fill the form
  const [metrics] = await db.select().from(siteMetrics).limit(1);

  const lastUpdated = metrics?.updatedAt
    ? new Date(metrics.updatedAt).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Never";

  return (
    <div className="max-w-xl">
      <div className="mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-2xl font-bold tracking-wide uppercase">Site Metrics</h1>
        <p className="font-mono text-gray-400 text-sm mt-1">
          {"//"} OPERATIONAL_TELEMETRY — displayed on the public home page
        </p>
      </div>

      <div className="brutalist-box p-4 mb-8 bg-gray-900/20 font-mono text-xs text-gray-500">
        <span className="text-accent">LAST_UPDATED:</span> {lastUpdated}
      </div>

      <form action={updateMetrics} className="flex flex-col gap-6">

        {/* Systems Deployed */}
        <div className="flex flex-col gap-2">
          <label htmlFor="systemsDeployed" className="font-mono text-xs text-gray-400">
            SYSTEMS_DEPLOYED
          </label>
          <input
            type="number"
            id="systemsDeployed"
            name="systemsDeployed"
            min={0}
            defaultValue={metrics?.systemsDeployed ?? 0}
            className="brutalist-box px-4 py-3 font-mono text-2xl text-white focus:outline-none focus:border-accent"
          />
          <p className="font-mono text-[10px] text-gray-600">
            Enterprise AI · Robotics · IoT deployments
          </p>
        </div>

        {/* Workshops Conducted */}
        <div className="flex flex-col gap-2">
          <label htmlFor="workshopsConducted" className="font-mono text-xs text-gray-400">
            WORKSHOPS_CONDUCTED
          </label>
          <input
            type="number"
            id="workshopsConducted"
            name="workshopsConducted"
            min={0}
            defaultValue={metrics?.workshopsConducted ?? 0}
            className="brutalist-box px-4 py-3 font-mono text-2xl text-white focus:outline-none focus:border-accent"
          />
          <p className="font-mono text-[10px] text-gray-600">
            FDPs · Bootcamps · Intensives
          </p>
        </div>

        {/* Participants Trained */}
        <div className="flex flex-col gap-2">
          <label htmlFor="participantsTrained" className="font-mono text-xs text-gray-400">
            PARTICIPANTS_TRAINED
          </label>
          <input
            type="number"
            id="participantsTrained"
            name="participantsTrained"
            min={0}
            defaultValue={metrics?.participantsTrained ?? 0}
            className="brutalist-box px-4 py-3 font-mono text-2xl text-white focus:outline-none focus:border-accent"
          />
          <p className="font-mono text-[10px] text-gray-600">
            Engineers · Researchers · Faculty
          </p>
        </div>

        <button
          type="submit"
          className="mt-4 bg-white text-black font-bold uppercase tracking-widest px-6 py-4 hover:bg-accent transition-colors"
        >
          Push to Live
        </button>
      </form>
    </div>
  );
}
