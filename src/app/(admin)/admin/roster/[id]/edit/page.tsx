import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import ImageDropzone from "@/components/admin/ImageDropzone";
import { db } from "@/lib/db";
import { teamMembers } from "@/lib/db/schema";
import { updateTeamMember } from "../../actions";

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (!Number.isInteger(id) || id < 1) {
    notFound();
  }

  const [member] = await db
    .select()
    .from(teamMembers)
    .where(eq(teamMembers.id, id))
    .limit(1);

  if (!member) {
    notFound();
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8 flex items-end justify-between border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-wide uppercase">Edit Team Member</h1>
          <p className="mt-1 font-mono text-sm text-gray-400">
            {"// "} UPDATE_RECORD: {member.name}
          </p>
        </div>
        <Link
          href="/admin/roster"
          className="font-mono text-xs text-gray-400 hover:text-accent transition-colors"
        >
          ← CANCEL
        </Link>
      </div>

      <form action={updateTeamMember} className="flex flex-col gap-6">
        <input type="hidden" name="id" value={member.id} />

        <ImageDropzone name="photoUrl" initialUrl={member.photoUrl ?? ""} aspectRatio={1} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-mono text-xs text-gray-400">MEMBER_NAME</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              defaultValue={member.name}
              className="brutalist-box bg-transparent px-4 py-3 font-sans text-white focus:border-accent focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="slug" className="font-mono text-xs text-gray-400">URL_SLUG</label>
            <input
              type="text"
              id="slug"
              name="slug"
              defaultValue={member.slug ?? ""}
              className="brutalist-box bg-transparent px-4 py-3 font-mono text-sm text-white focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="role" className="font-mono text-xs text-gray-400">ROLE_TITLE</label>
          <input
            type="text"
            id="role"
            name="role"
            required
            defaultValue={member.role}
            className="brutalist-box bg-transparent px-4 py-3 font-sans text-white focus:border-accent focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="bio" className="font-mono text-xs text-gray-400">BIO (Max 500 chars)</label>
          <textarea
            id="bio"
            name="bio"
            required
            maxLength={500}
            rows={3}
            defaultValue={member.bio}
            className="brutalist-box resize-none bg-transparent px-4 py-3 font-sans text-white focus:border-accent focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="techStack" className="font-mono text-xs text-gray-400">TECH_DNA (Comma separated)</label>
          <input
            type="text"
            id="techStack"
            name="techStack"
            required
            defaultValue={member.techStack.join(", ")}
            className="brutalist-box bg-transparent px-4 py-3 font-mono text-sm text-white focus:border-accent focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="githubUrl" className="font-mono text-xs text-gray-400">GITHUB_URL <span className="text-gray-600">(optional)</span></label>
            <input
              type="url"
              id="githubUrl"
              name="githubUrl"
              defaultValue={member.githubUrl ?? ""}
              className="brutalist-box bg-transparent px-4 py-3 font-mono text-sm text-white focus:border-accent focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="linkedinUrl" className="font-mono text-xs text-gray-400">LINKEDIN_URL <span className="text-gray-600">(optional)</span></label>
            <input
              type="url"
              id="linkedinUrl"
              name="linkedinUrl"
              defaultValue={member.linkedinUrl ?? ""}
              className="brutalist-box bg-transparent px-4 py-3 font-mono text-sm text-white focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="displayOrder" className="font-mono text-xs text-gray-400">DISPLAY_ORDER <span className="text-gray-600">(lower = first on page)</span></label>
          <input
            type="number"
            id="displayOrder"
            name="displayOrder"
            min={1}
            defaultValue={member.displayOrder}
            className="brutalist-box bg-transparent px-4 py-3 font-mono text-sm text-white focus:border-accent focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3 py-2">
          <input
            type="checkbox"
            id="isPublished"
            name="isPublished"
            defaultChecked={member.isPublished}
            className="h-4 w-4 accent-accent bg-black border-gray-800"
          />
          <label htmlFor="isPublished" className="cursor-pointer font-mono text-xs text-gray-400">PUBLISH_ON_TEAM_PAGE</label>
        </div>

        <button type="submit" className="mt-4 bg-white px-6 py-4 font-bold uppercase tracking-widest text-black transition-colors hover:bg-accent">
          Save Profile
        </button>
      </form>
    </div>
  );
}
