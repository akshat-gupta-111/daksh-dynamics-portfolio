// filepath: src/app/(admin)/admin/roster/new/page.tsx
import { createTeamMember } from "../actions";
import ImageDropzone from "@/components/admin/ImageDropzone";

export default function NewTeamMemberPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-2xl font-bold tracking-wide uppercase">Add Team Member</h1>
        <p className="font-mono text-gray-400 text-sm mt-1">
          {"//"} INSERT_RECORD: team_members
        </p>
      </div>

      <form action={createTeamMember} className="flex flex-col gap-6">

        {/* Photo Upload */}
        <ImageDropzone name="photoUrl" />

        {/* Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-mono text-xs text-gray-400">MEMBER_NAME</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="e.g., AKSHAT_GUPTA"
            className="brutalist-box px-4 py-3 font-sans text-white focus:outline-none focus:border-accent"
          />
        </div>

        {/* Role */}
        <div className="flex flex-col gap-2">
          <label htmlFor="role" className="font-mono text-xs text-gray-400">ROLE_TITLE</label>
          <input
            type="text"
            id="role"
            name="role"
            required
            placeholder="e.g., AI_ORCHESTRATION & AUTONOMOUS SYSTEMS"
            className="brutalist-box px-4 py-3 font-sans text-white focus:outline-none focus:border-accent"
          />
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-2">
          <label htmlFor="bio" className="font-mono text-xs text-gray-400">BIO (Max 500 chars)</label>
          <textarea
            id="bio"
            name="bio"
            required
            maxLength={500}
            rows={3}
            placeholder="Short technical description..."
            className="brutalist-box px-4 py-3 font-sans text-white focus:outline-none focus:border-accent resize-none"
          />
        </div>

        {/* Tech Stack */}
        <div className="flex flex-col gap-2">
          <label htmlFor="techStack" className="font-mono text-xs text-gray-400">
            TECH_DNA (Comma separated)
          </label>
          <input
            type="text"
            id="techStack"
            name="techStack"
            required
            placeholder="e.g., Python, LangGraph, Azure AI, Transformers"
            className="brutalist-box px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-accent"
          />
        </div>

        {/* Display Order */}
        <div className="flex flex-col gap-2">
          <label htmlFor="displayOrder" className="font-mono text-xs text-gray-400">
            DISPLAY_ORDER <span className="text-gray-600">(lower = first on page)</span>
          </label>
          <input
            type="number"
            id="displayOrder"
            name="displayOrder"
            min={1}
            defaultValue={99}
            className="brutalist-box px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-accent"
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

        <button
          type="submit"
          className="mt-4 bg-white text-black font-bold uppercase tracking-widest px-6 py-4 hover:bg-accent transition-colors"
        >
          Add to Roster
        </button>

      </form>
    </div>
  );
}
