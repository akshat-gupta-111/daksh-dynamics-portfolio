// filepath: src/app/(admin)/admin/roster/actions.ts
'use server'

import { db } from "@/lib/db";
import { teamMembers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTeamMember(formData: FormData) {
  const name         = formData.get("name") as string;
  const role         = formData.get("role") as string;
  const bio          = formData.get("bio") as string;
  const techRaw      = formData.get("techStack") as string;
  const photoUrl     = (formData.get("photoUrl") as string) || null;
  const displayOrder = parseInt(formData.get("displayOrder") as string) || 99;
  const isPublished  = formData.get("isPublished") === "on";

  const techStack = techRaw.split(",").map((t) => t.trim().toUpperCase()).filter(Boolean);

  await db.insert(teamMembers).values({ name, role, bio, techStack, photoUrl, displayOrder, isPublished });

  revalidatePath("/team");
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
