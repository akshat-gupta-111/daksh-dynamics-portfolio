// filepath: src/app/(admin)/admin/brochures/actions.ts
'use server'

import { db } from "@/lib/db";
import { siteBrochures } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBrochure(formData: FormData) {
  const type      = formData.get("type") as string;
  const title     = formData.get("title") as string;
  const fileUrl   = formData.get("fileUrl") as string;
  const isPublished = formData.get("isPublished") === "on";

  await db.insert(siteBrochures).values({ type, title, fileUrl, isPublished });

  revalidatePath("/");
  revalidatePath("/admin/brochures");
  redirect("/admin/brochures");
}

export async function deleteBrochure(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  await db.delete(siteBrochures).where(eq(siteBrochures.id, id));
  revalidatePath("/");
  revalidatePath("/admin/brochures");
}

export async function toggleBrochurePublish(formData: FormData) {
  const id      = parseInt(formData.get("id") as string);
  const current = formData.get("current") === "true";
  await db.update(siteBrochures)
    .set({ isPublished: !current })
    .where(eq(siteBrochures.id, id));
  revalidatePath("/");
  revalidatePath("/admin/brochures");
}
