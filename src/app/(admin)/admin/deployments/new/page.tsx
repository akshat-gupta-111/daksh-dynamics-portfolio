// filepath: src/app/(admin)/admin/deployments/new/page.tsx
import { createDeployment } from "../actions";
import ImageDropzone from "@/components/admin/ImageDropzone";

export default function NewDeploymentPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-2xl font-bold tracking-wide uppercase">Log New Deployment</h1>
        <p className="font-mono text-gray-400 text-sm mt-1">{'//'} INSERT_RECORD: solutions_projects</p>
      </div>

      <form action={createDeployment} className="flex flex-col gap-6">
        {/* Asset Upload */}
        <ImageDropzone name="heroAssetUrl" aspectRatio={16/9} />
        {/* Title Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-mono text-xs text-gray-400">PROJECT_TITLE</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            required 
            placeholder="e.g., Navya Hospitality Rover"
            className="brutalist-box px-4 py-3 font-sans text-white focus:outline-none focus:border-accent"
          />
        </div>

        {/* Slug Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="slug" className="font-mono text-xs text-gray-400">URL_SLUG</label>
          <input 
            type="text" 
            id="slug" 
            name="slug" 
            required 
            pattern="[a-z0-9-]+"
            title="Only lowercase letters, numbers, and hyphens"
            placeholder="e.g., navya-rover"
            className="brutalist-box px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-accent"
          />
        </div>

        {/* Abstract Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="abstract" className="font-mono text-xs text-gray-400">ABSTRACT (Max 300 chars)</label>
          <textarea 
            id="abstract" 
            name="abstract" 
            required 
            maxLength={300}
            rows={3}
            placeholder="Brief technical summary for the architecture card..."
            className="brutalist-box px-4 py-3 font-sans text-white focus:outline-none focus:border-accent resize-none"
          />
        </div>

        {/* Tech Stack Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="techStack" className="font-mono text-xs text-gray-400">TECH_STACK (Comma separated)</label>
          <input 
            type="text" 
            id="techStack" 
            name="techStack" 
            required 
            placeholder="e.g., LangGraph, ESP32, Azure, Next.js"
            className="brutalist-box px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-accent"
          />
        </div>

        {/* Live Link Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="liveLink" className="font-mono text-xs text-gray-400">LIVE_LINK (Optional)</label>
          <input 
            type="url" 
            id="liveLink" 
            name="liveLink" 
            placeholder="e.g., https://navya-rover.example.com"
            className="brutalist-box px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-accent"
          />
        </div>

        {/* Architecture Notes */}
        <div className="flex flex-col gap-2">
          <label htmlFor="architectureContent" className="font-mono text-xs text-gray-400">ARCHITECTURE_NOTES <span className="text-gray-600">(markdown / plain text)</span></label>
          <textarea
            id="architectureContent"
            name="architectureContent"
            rows={8}
            placeholder="Describe the system architecture, key design decisions, components used..."
            className="brutalist-box px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-accent resize-y"
          />
        </div>

        {/* Publish Toggle */}
        <div className="flex items-center gap-3 py-2">
          <input 
            type="checkbox" 
            id="isPublished" 
            name="isPublished" 
            className="w-4 h-4 accent-accent bg-black border-gray-800"
          />
          <label htmlFor="isPublished" className="font-mono text-xs text-gray-400 cursor-pointer">
            PUBLISH_IMMEDIATELY
          </label>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="mt-4 bg-white text-black font-bold uppercase tracking-widest px-6 py-4 hover:bg-accent transition-colors"
        >
          Execute Insert
        </button>

      </form>
    </div>
  );
}