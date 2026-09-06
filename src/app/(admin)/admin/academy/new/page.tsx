// filepath: src/app/(admin)/admin/academy/new/page.tsx
import { createWorkshop } from "../actions";
import ImageDropzone from "@/components/admin/ImageDropzone";

export default function NewWorkshopPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-2xl font-bold tracking-wide uppercase">Log Workshop Record</h1>
        <p className="font-mono text-gray-400 text-sm mt-1">{'//'} INSERT_RECORD: academy_workshops (portfolio entry)</p>
      </div>

      <form action={createWorkshop} className="flex flex-col gap-6">

        {/* Cover Photo */}
        <ImageDropzone name="coverImageUrl" aspectRatio={16/9} />

        {/* Title */}
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-mono text-xs text-gray-400">WORKSHOP_TITLE</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            placeholder="e.g., Edge AI & IoT Systems FDP"
            className="brutalist-box px-4 py-3 font-sans text-white focus:outline-none focus:border-accent bg-transparent"
          />
        </div>

        {/* Slug & Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="slug" className="font-mono text-xs text-gray-400">URL_SLUG</label>
            <input
              type="text"
              id="slug"
              name="slug"
              required
              placeholder="e.g., edge-ai-iot-nit-bhopal-jan25"
              className="brutalist-box px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-accent bg-transparent"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="type" className="font-mono text-xs text-gray-400">PROGRAM_TYPE</label>
            <select
              id="type"
              name="type"
              className="brutalist-box px-4 py-3 font-mono text-sm text-white bg-black focus:outline-none focus:border-accent"
            >
              <option value="FDP">FDP (Faculty Development Program)</option>
              <option value="WORKSHOP">WORKSHOP</option>
              <option value="BOOTCAMP">BOOTCAMP</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="font-mono text-xs text-gray-400">
            DESCRIPTION <span className="text-gray-600">(shown on workshop detail page)</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Describe what the workshop covered, key outcomes, hands-on activities..."
            className="brutalist-box px-4 py-3 font-sans text-white focus:outline-none focus:border-accent resize-none bg-transparent"
          />
        </div>

        {/* Institution & Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="institution" className="font-mono text-xs text-gray-400">INSTITUTION</label>
            <input
              type="text"
              id="institution"
              name="institution"
              placeholder="e.g., NIT Bhopal"
              className="brutalist-box px-4 py-3 font-sans text-white focus:outline-none focus:border-accent bg-transparent"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="conductedAt" className="font-mono text-xs text-gray-400">DATE_CONDUCTED</label>
            {/*
              Native date picker on dark bg needs explicit colorscheme.
              'color-scheme: dark' makes the calendar widget use system dark chrome
              so the date text is white and clickable.
            */}
            <input
              type="date"
              id="conductedAt"
              name="conductedAt"
              style={{ colorScheme: "dark" }}
              className="brutalist-box px-4 py-3 font-mono text-sm text-white bg-black focus:outline-none focus:border-accent cursor-pointer"
            />
          </div>
        </div>

        {/* Duration & Participant Count */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="durationDays" className="font-mono text-xs text-gray-400">DURATION (DAYS)</label>
            <input
              type="number"
              id="durationDays"
              name="durationDays"
              defaultValue={3}
              min={1}
              max={1000}
              className="brutalist-box px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-accent bg-transparent"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="participantCount" className="font-mono text-xs text-gray-400">PARTICIPANT_COUNT</label>
            <input
              type="number"
              id="participantCount"
              name="participantCount"
              min={1}
              placeholder="e.g., 87"
              className="brutalist-box px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-accent bg-transparent"
            />
          </div>
        </div>

        {/* Topics Covered */}
        <div className="flex flex-col gap-2">
          <label htmlFor="topicsCovered" className="font-mono text-xs text-gray-400">TOPICS_COVERED (Comma separated)</label>
          <input
            type="text"
            id="topicsCovered"
            name="topicsCovered"
            placeholder="e.g., Edge AI, ESP32, LangGraph, Robotics"
            className="brutalist-box px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-accent bg-transparent"
          />
        </div>

        {/* Testimonial */}
        <div className="flex flex-col gap-2">
          <label htmlFor="testimonial" className="font-mono text-xs text-gray-400">
            FACULTY_TESTIMONIAL <span className="text-gray-600">(optional)</span>
          </label>
          <textarea
            id="testimonial"
            name="testimonial"
            maxLength={500}
            rows={3}
            placeholder="Quote from HOD / faculty coordinator..."
            className="brutalist-box px-4 py-3 font-sans text-white focus:outline-none focus:border-accent resize-none bg-transparent"
          />
        </div>

        {/* Publish Toggle */}
        <div className="flex items-center gap-3 py-2">
          <input type="checkbox" id="isPublished" name="isPublished" className="w-4 h-4 accent-accent bg-black border-gray-800" />
          <label htmlFor="isPublished" className="font-mono text-xs text-gray-400 cursor-pointer">PUBLISH_IMMEDIATELY</label>
        </div>

        <button type="submit" className="mt-4 bg-white text-black font-bold uppercase tracking-widest px-6 py-4 hover:bg-accent transition-colors">
          Commit Record
        </button>

      </form>
    </div>
  );
}