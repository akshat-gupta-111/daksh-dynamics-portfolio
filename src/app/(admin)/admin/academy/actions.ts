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
    title, slug, type, durationDays, institution, conductedAt,
    participantCount, coverImageUrl, topicsCovered, testimonial, isPublished,
  });

  revalidatePath("/academy");
  revalidatePath("/");
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