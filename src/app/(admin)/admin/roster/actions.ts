// filepath: src/app/(admin)/admin/roster/actions.ts
'use server'

import { db } from "@/lib/db";
import { teamMembers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTeamMember(formData: FormData) {
  const name         = formData.get("name") as string;
  const slug         = (formData.get("slug") as string) || null;
  const role         = formData.get("role") as string;
  const bio          = formData.get("bio") as string;
  const techRaw      = formData.get("techStack") as string;
  const photoUrl     = (formData.get("photoUrl") as string) || null;
  const githubUrl    = (formData.get("githubUrl") as string) || null;
  const linkedinUrl  = (formData.get("linkedinUrl") as string) || null;
  const displayOrder = parseInt(formData.get("displayOrder") as string) || 99;
  const isPublished  = formData.get("isPublished") === "on";

  const techStack = techRaw.split(",").map((t) => t.trim().toUpperCase()).filter(Boolean);

  await db.insert(teamMembers).values({
    name, slug, role, bio, techStack, photoUrl, githubUrl, linkedinUrl, displayOrder, isPublished,
  });

  revalidatePath("/team");
  redirect("/admin/roster");
}

export async function updateTeamMember(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id < 1) {
    throw new Error("Invalid team member id");
  }

  const name = (formData.get("name") as string).trim();
  const role = (formData.get("role") as string).trim();
  const bio = (formData.get("bio") as string).trim();
  const techRaw = (formData.get("techStack") as string).trim();

  if (!name || !role || !bio || !techRaw) {
    throw new Error("Name, role, bio, and tech stack are required");
  }

  const slug = ((formData.get("slug") as string) || "").trim() || null;
  const photoUrl = ((formData.get("photoUrl") as string) || "").trim() || null;
  const githubUrl = ((formData.get("githubUrl") as string) || "").trim() || null;
  const linkedinUrl = ((formData.get("linkedinUrl") as string) || "").trim() || null;
  const requestedOrder = Number(formData.get("displayOrder"));
  const displayOrder = Number.isInteger(requestedOrder) && requestedOrder > 0
    ? requestedOrder
    : 99;
  const techStack = techRaw
    .split(",")
    .map((tech) => tech.trim().toUpperCase())
    .filter(Boolean);

  await db
    .update(teamMembers)
    .set({
      name,
      slug,
      role,
      bio,
      techStack,
      photoUrl,
      githubUrl,
      linkedinUrl,
      displayOrder,
      isPublished: formData.get("isPublished") === "on",
    })
    .where(eq(teamMembers.id, id));

  revalidatePath("/team");
  revalidatePath("/admin/roster");
  redirect("/admin/roster");
}

export async function deleteTeamMember(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  await db.delete(teamMembers).where(eq(teamMembers.id, id));
  revalidatePath("/team");
  revalidatePath("/admin/roster");
}

export async function toggleMemberPublish(formData: FormData) {
  const id      = parseInt(formData.get("id") as string);
  const current = formData.get("current") === "true";
  await db.update(teamMembers)
    .set({ isPublished: !current })
    .where(eq(teamMembers.id, id));
  revalidatePath("/team");
  revalidatePath("/admin/roster");
}
