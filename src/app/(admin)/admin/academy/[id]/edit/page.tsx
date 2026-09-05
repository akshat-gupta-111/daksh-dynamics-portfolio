import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import ImageDropzone from "@/components/admin/ImageDropzone";
import { db } from "@/lib/db";
import { academyWorkshops } from "@/lib/db/schema";
import { updateWorkshop } from "../../actions";

function formatDateForInput(value: Date | null) {
  return value ? new Date(value).toISOString().slice(0, 10) : "";
}

export default async function EditWorkshopPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (!Number.isInteger(id) || id < 1) {
    notFound();
  }

  const [workshop] = await db
    .select()
    .from(academyWorkshops)
    .where(eq(academyWorkshops.id, id))
    .limit(1);

  if (!workshop) {
    notFound();
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8 flex items-end justify-between border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-wide uppercase">Edit Workshop</h1>
          <p className="mt-1 font-mono text-sm text-gray-400">
            {"// "} UPDATE_RECORD: {workshop.title}
          </p>
        </div>
        <Link
          href="/admin/academy"
          className="font-mono text-xs text-gray-400 transition-colors hover:text-accent"
        >
          ← CANCEL
        </Link>
      </div>

      <form action={updateWorkshop} className="flex flex-col gap-6">
        <input type="hidden" name="id" value={workshop.id} />

        <ImageDropzone name="coverImageUrl" initialUrl={workshop.coverImageUrl ?? ""} />

        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-mono text-xs text-gray-400">WORKSHOP_TITLE</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            maxLength={255}
            defaultValue={workshop.title}
            className="brutalist-box bg-transparent px-4 py-3 font-sans text-white focus:border-accent focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="slug" className="font-mono text-xs text-gray-400">URL_SLUG</label>
            <input
              type="text"
              id="slug"
              name="slug"
              required
              pattern="[a-z0-9-]+"
              title="Only lowercase letters, numbers, and hyphens"
              defaultValue={workshop.slug}
              className="brutalist-box bg-transparent px-4 py-3 font-mono text-sm text-white focus:border-accent focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="type" className="font-mono text-xs text-gray-400">PROGRAM_TYPE</label>
            <select
              id="type"
              name="type"
              defaultValue={workshop.type}
              className="brutalist-box bg-black px-4 py-3 font-mono text-sm text-white focus:border-accent focus:outline-none"
            >
              <option value="FDP">FDP (Faculty Development Program)</option>
              <option value="WORKSHOP">WORKSHOP</option>
              <option value="BOOTCAMP">BOOTCAMP</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="font-mono text-xs text-gray-400">DESCRIPTION <span className="text-gray-600">(shown on workshop detail page)</span></label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={workshop.description ?? ""}
            className="brutalist-box resize-none bg-transparent px-4 py-3 font-sans text-white focus:border-accent focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="institution" className="font-mono text-xs text-gray-400">INSTITUTION</label>
            <input
              type="text"
              id="institution"
              name="institution"
              defaultValue={workshop.institution ?? ""}
              className="brutalist-box bg-transparent px-4 py-3 font-sans text-white focus:border-accent focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="conductedAt" className="font-mono text-xs text-gray-400">DATE_CONDUCTED</label>
            <input
              type="date"
              id="conductedAt"
              name="conductedAt"
              style={{ colorScheme: "dark" }}
              defaultValue={formatDateForInput(workshop.conductedAt)}
              className="brutalist-box cursor-pointer bg-black px-4 py-3 font-mono text-sm text-white focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="durationDays" className="font-mono text-xs text-gray-400">DURATION (DAYS)</label>
            <input
              type="number"
              id="durationDays"
              name="durationDays"
              min={1}
              max={30}
              defaultValue={workshop.durationDays}
              className="brutalist-box bg-transparent px-4 py-3 font-mono text-sm text-white focus:border-accent focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="participantCount" className="font-mono text-xs text-gray-400">PARTICIPANT_COUNT</label>
            <input
              type="number"
              id="participantCount"
              name="participantCount"
              min={1}
              defaultValue={workshop.participantCount ?? ""}
              className="brutalist-box bg-transparent px-4 py-3 font-mono text-sm text-white focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="topicsCovered" className="font-mono text-xs text-gray-400">TOPICS_COVERED (Comma separated)</label>
          <input
            type="text"
            id="topicsCovered"
            name="topicsCovered"
            defaultValue={workshop.topicsCovered?.join(", ") ?? ""}
            className="brutalist-box bg-transparent px-4 py-3 font-mono text-sm text-white focus:border-accent focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="testimonial" className="font-mono text-xs text-gray-400">FACULTY_TESTIMONIAL <span className="text-gray-600">(optional)</span></label>
          <textarea
            id="testimonial"
            name="testimonial"
            maxLength={500}
            rows={3}
            defaultValue={workshop.testimonial ?? ""}
            className="brutalist-box resize-none bg-transparent px-4 py-3 font-sans text-white focus:border-accent focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3 py-2">
          <input
            type="checkbox"
            id="isPublished"
            name="isPublished"
            defaultChecked={workshop.isPublished}
            className="h-4 w-4 accent-accent bg-black border-gray-800"
          />
          <label htmlFor="isPublished" className="cursor-pointer font-mono text-xs text-gray-400">PUBLISH_ON_ACADEMY_PAGE</label>
        </div>

        <button type="submit" className="mt-4 bg-white px-6 py-4 font-bold uppercase tracking-widest text-black transition-colors hover:bg-accent">
          Save Workshop
        </button>
      </form>
    </div>
  );
}
