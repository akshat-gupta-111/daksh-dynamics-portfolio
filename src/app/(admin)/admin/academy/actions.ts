// filepath: src/app/(admin)/admin/academy/actions.ts
'use server'

import { db } from "@/lib/db";
import { academyWorkshops } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createWorkshop(formData: FormData) {
  const title          = formData.get("title") as string;
  const slug           = formData.get("slug") as string;
  const type           = formData.get("type") as string;
  const description    = (formData.get("description") as string) || null;
  const durationDays   = parseInt(formData.get("durationDays") as string) || 1;
  const isPublished    = formData.get("isPublished") === "on";
  const institution    = (formData.get("institution") as string) || null;
  const conductedAtRaw = formData.get("conductedAt") as string;
  const conductedAt    = conductedAtRaw ? new Date(conductedAtRaw) : null;
  const participantCountRaw = formData.get("participantCount") as string;
  const participantCount    = participantCountRaw ? parseInt(participantCountRaw) : null;
  const coverImageUrl  = (formData.get("coverImageUrl") as string) || null;
  const topicsRaw      = formData.get("topicsCovered") as string;
  const topicsCovered  = topicsRaw
    ? topicsRaw.split(",").map((t) => t.trim().toUpperCase()).filter(Boolean)
    : [];
  const testimonial    = (formData.get("testimonial") as string) || null;

  await db.insert(academyWorkshops).values({
    title, slug, type, description, durationDays, institution, conductedAt,
    participantCount, coverImageUrl, topicsCovered, testimonial, isPublished,
  });

  revalidatePath("/academy");
  revalidatePath("/");
  redirect("/admin/academy");
}

export async function updateWorkshop(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id < 1) {
    throw new Error("Invalid workshop id");
  }

  const title = (formData.get("title") as string).trim();
  const slug = (formData.get("slug") as string).trim().toLowerCase();
  const type = (formData.get("type") as string).trim();
  const description = ((formData.get("description") as string) || "").trim() || null;
  const institution = ((formData.get("institution") as string) || "").trim() || null;
  const durationDays = Number(formData.get("durationDays"));
  const participantCountRaw = ((formData.get("participantCount") as string) || "").trim();
  const conductedAtRaw = ((formData.get("conductedAt") as string) || "").trim();

  if (!title || !slug || !type) {
    throw new Error("Title, slug, and program type are required");
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error("Slug may only contain lowercase letters, numbers, and hyphens");
  }

  if (!['FDP', 'WORKSHOP', 'BOOTCAMP'].includes(type)) {
    throw new Error("Invalid program type");
  }

  if (!Number.isInteger(durationDays) || durationDays < 1 || durationDays > 30) {
    throw new Error("Duration must be between 1 and 30 days");
  }

  const participantCount = participantCountRaw ? Number(participantCountRaw) : null;

  if (participantCount !== null && (!Number.isInteger(participantCount) || participantCount < 1)) {
    throw new Error("Participant count must be a positive whole number");
  }

  const conductedAt = conductedAtRaw ? new Date(conductedAtRaw) : null;

  if (conductedAt && Number.isNaN(conductedAt.getTime())) {
    throw new Error("Invalid conducted date");
  }

  const topicsCovered = ((formData.get("topicsCovered") as string) || "")
    .split(",")
    .map((topic) => topic.trim().toUpperCase())
    .filter(Boolean);
  const testimonial = ((formData.get("testimonial") as string) || "").trim() || null;
  const coverImageUrl = ((formData.get("coverImageUrl") as string) || "").trim() || null;

  if (title.length > 255 || (testimonial?.length ?? 0) > 500) {
    throw new Error("Title or testimonial exceeds the allowed length");
  }

  const [existingWorkshop] = await db
    .select({ slug: academyWorkshops.slug })
    .from(academyWorkshops)
    .where(eq(academyWorkshops.id, id))
    .limit(1);

  if (!existingWorkshop) {
    throw new Error("Workshop not found");
  }

  await db
    .update(academyWorkshops)
    .set({
      title,
      slug,
      type,
      description,
      durationDays,
      institution,
      conductedAt,
      participantCount,
      coverImageUrl,
      topicsCovered,
      testimonial,
      isPublished: formData.get("isPublished") === "on",
    })
    .where(eq(academyWorkshops.id, id));

  revalidatePath("/");
  revalidatePath("/academy");
  revalidatePath(`/academy/${existingWorkshop.slug}`);
  revalidatePath(`/academy/${slug}`);
  revalidatePath("/admin/academy");
  redirect("/admin/academy");
}

export async function deleteWorkshop(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  await db.delete(academyWorkshops).where(eq(academyWorkshops.id, id));
  revalidatePath("/academy");
  revalidatePath("/");
  revalidatePath("/admin/academy");
}

export async function toggleWorkshopPublish(formData: FormData) {
  const id      = parseInt(formData.get("id") as string);
  const current = formData.get("current") === "true";
  await db.update(academyWorkshops)
    .set({ isPublished: !current })
    .where(eq(academyWorkshops.id, id));
  revalidatePath("/academy");
  revalidatePath("/");
  revalidatePath("/admin/academy");
}
