// filepath: src/app/(admin)/admin/inbox/actions.ts
'use server'

import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function markAsRead(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  await db.update(contactMessages).set({ isRead: true }).where(eq(contactMessages.id, id));
  revalidatePath("/admin/inbox");
  revalidatePath("/admin");
}

export async function deleteMessage(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  await db.delete(contactMessages).where(eq(contactMessages.id, id));
  revalidatePath("/admin/inbox");
  revalidatePath("/admin");
}
