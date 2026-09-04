// filepath: src/app/(admin)/admin/deployments/actions.ts
'use server'

import { db } from "@/lib/db";
import { solutionsProjects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createDeployment(formData: FormData) {
  const title               = formData.get("title") as string;
  const slug                = formData.get("slug") as string;
  const abstract            = formData.get("abstract") as string;
  const rawTags             = formData.get("techStack") as string;
  const isPublished         = formData.get("isPublished") === "on";
  const heroAssetUrl        = (formData.get("heroAssetUrl") as string) || null;
  const architectureContent = (formData.get("architectureContent") as string) || null;

  const techStack = rawTags.split(",").map(tag => tag.trim().toUpperCase()).filter(Boolean);

  await db.insert(solutionsProjects).values({
    title, slug, abstract, techStack, isPublished, heroAssetUrl, architectureContent,
  });

  revalidatePath("/");
  revalidatePath("/solutions");
  redirect("/admin/deployments");
}

export async function deleteDeployment(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  await db.delete(solutionsProjects).where(eq(solutionsProjects.id, id));
  revalidatePath("/");
  revalidatePath("/solutions");
  revalidatePath("/admin/deployments");
}

export async function toggleDeploymentPublish(formData: FormData) {
  const id        = parseInt(formData.get("id") as string);
  const current   = formData.get("current") === "true";
  await db.update(solutionsProjects)
    .set({ isPublished: !current })
    .where(eq(solutionsProjects.id, id));
  revalidatePath("/");
  revalidatePath("/solutions");
  revalidatePath("/admin/deployments");
}