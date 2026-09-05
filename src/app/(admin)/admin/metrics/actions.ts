// filepath: src/app/(admin)/admin/metrics/actions.ts
'use server'

import { db } from "@/lib/db";
import { siteMetrics } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateMetrics(formData: FormData) {
  const systemsDeployed     = parseInt(formData.get("systemsDeployed") as string)     || 0;
  const workshopsConducted  = parseInt(formData.get("workshopsConducted") as string)  || 0;
  const participantsTrained = parseInt(formData.get("participantsTrained") as string) || 0;

  await db
    .update(siteMetrics)
    .set({ systemsDeployed, workshopsConducted, participantsTrained, updatedAt: new Date() })
    .where(eq(siteMetrics.id, 1));

  revalidatePath("/");
  redirect("/admin/metrics?saved=1");
}
