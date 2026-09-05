// filepath: src/app/(admin)/admin/brochures/new/page.tsx
import { createBrochure } from "../actions";

export default function NewBrochurePage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-2xl font-bold tracking-wide uppercase">Add Downloadable Brochure</h1>
        <p className="font-mono text-gray-400 text-sm mt-1">
          {"// "} INSERT_RECORD: site_brochures · shown as download button on home page card
        </p>
      </div>

      <form action={createBrochure} className="flex flex-col gap-6">

        {/* Type */}
        <div className="flex flex-col gap-2">
          <label htmlFor="type" className="font-mono text-xs text-gray-400">CARD_TARGET</label>
          <select
            id="type"
            name="type"
            required
            className="brutalist-box px-4 py-3 font-mono text-sm text-white bg-black focus:outline-none focus:border-accent"
          >
            <option value="solutions">Solutions (Enterprise AI card)</option>
            <option value="academy">Academy (Workshop card)</option>
          </select>
        </div>

        {/* Button label */}
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-mono text-xs text-gray-400">BUTTON_LABEL</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            placeholder="e.g., Download Capabilities Deck"
            className="brutalist-box px-4 py-3 font-sans text-white focus:outline-none focus:border-accent bg-transparent"
          />
        </div>

        {/* File URL */}
        <div className="flex flex-col gap-2">
          <label htmlFor="fileUrl" className="font-mono text-xs text-gray-400">
            FILE_URL <span className="text-gray-600">(direct link to PDF — Azure Blob, Google Drive direct download, etc.)</span>
          </label>
          <input
            type="url"
            id="fileUrl"
            name="fileUrl"
            required
            placeholder="https://..."
            className="brutalist-box px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-accent bg-transparent"
          />
        </div>

        {/* Publish toggle */}
        <div className="flex items-center gap-3 py-2">
          <input type="checkbox" id="isPublished" name="isPublished" className="w-4 h-4 accent-accent bg-black border-gray-800" />
          <label htmlFor="isPublished" className="font-mono text-xs text-gray-400 cursor-pointer">PUBLISH_IMMEDIATELY</label>
        </div>

        <button type="submit" className="mt-4 bg-white text-black font-bold uppercase tracking-widest px-6 py-4 hover:bg-accent transition-colors">
          Save Brochure
        </button>

      </form>
    </div>
  );
}
