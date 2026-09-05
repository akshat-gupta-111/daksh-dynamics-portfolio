// filepath: src/app/(admin)/admin/roster/new/page.tsx
import { createTeamMember } from "../actions";
import ImageDropzone from "@/components/admin/ImageDropzone";

export default function NewTeamMemberPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-2xl font-bold tracking-wide uppercase">Add Team Member</h1>
        <p className="font-mono text-gray-400 text-sm mt-1">{"// "} INSERT_RECORD: team_members</p>
      </div>

      <form action={createTeamMember} className="flex flex-col gap-6">

        {/* Photo Upload */}
        <ImageDropzone name="photoUrl" />

        {/* Name & Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-mono text-xs text-gray-400">MEMBER_NAME</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="e.g., Akshat Gupta"
              className="brutalist-box px-4 py-3 font-sans text-white focus:outline-none focus:border-accent bg-transparent"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="slug" className="font-mono text-xs text-gray-400">
              URL_SLUG <span className="text-gray-600">(enables /team/[slug] page)</span>
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              placeholder="e.g., akshat-gupta"
              className="brutalist-box px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-accent bg-transparent"
            />
          </div>
        </div>

        {/* Role */}
        <div className="flex flex-col gap-2">
          <label htmlFor="role" className="font-mono text-xs text-gray-400">ROLE_TITLE</label>
          <input
            type="text"
            id="role"
            name="role"
            required
            placeholder="e.g., AI Orchestration & Autonomous Systems"
            className="brutalist-box px-4 py-3 font-sans text-white focus:outline-none focus:border-accent bg-transparent"
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
            className="brutalist-box px-4 py-3 font-sans text-white focus:outline-none focus:border-accent resize-none bg-transparent"
          />
        </div>

        {/* Tech Stack */}
        <div className="flex flex-col gap-2">
          <label htmlFor="techStack" className="font-mono text-xs text-gray-400">TECH_DNA (Comma separated)</label>
          <input
            type="text"
            id="techStack"
            name="techStack"
            required
            placeholder="e.g., Python, LangGraph, Azure AI, Transformers"
            className="brutalist-box px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-accent bg-transparent"
          />
        </div>

        {/* GitHub & LinkedIn */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="githubUrl" className="font-mono text-xs text-gray-400">
              GITHUB_URL <span className="text-gray-600">(optional)</span>
            </label>
            <input
              type="url"
              id="githubUrl"
              name="githubUrl"
              placeholder="https://github.com/username"
              className="brutalist-box px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-accent bg-transparent"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="linkedinUrl" className="font-mono text-xs text-gray-400">
              LINKEDIN_URL <span className="text-gray-600">(optional)</span>
            </label>
            <input
              type="url"
              id="linkedinUrl"
              name="linkedinUrl"
              placeholder="https://linkedin.com/in/username"
              className="brutalist-box px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-accent bg-transparent"
            />
          </div>
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
            className="brutalist-box px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-accent bg-transparent"
          />
        </div>

        {/* Publish Toggle */}
        <div className="flex items-center gap-3 py-2">
          <input type="checkbox" id="isPublished" name="isPublished" className="w-4 h-4 accent-accent bg-black border-gray-800" />
          <label htmlFor="isPublished" className="font-mono text-xs text-gray-400 cursor-pointer">PUBLISH_IMMEDIATELY</label>
        </div>

        <button type="submit" className="mt-4 bg-white text-black font-bold uppercase tracking-widest px-6 py-4 hover:bg-accent transition-colors">
          Add to Roster
        </button>

      </form>
    </div>
  );
}
