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
  const liveLink            = (formData.get("liveLink") as string) || null;

  const techStack = rawTags.split(",").map(tag => tag.trim().toUpperCase()).filter(Boolean);

  await db.insert(solutionsProjects).values({
    title, slug, abstract, techStack, isPublished, heroAssetUrl, architectureContent, liveLink
  });

  revalidatePath("/");
  revalidatePath("/solutions");
  redirect("/admin/deployments");
}

export async function updateDeployment(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id < 1) {
    throw new Error("Invalid deployment id");
  }

  const title = (formData.get("title") as string).trim();
  const slug = (formData.get("slug") as string).trim().toLowerCase();
  const abstract = (formData.get("abstract") as string).trim();
  const rawTags = (formData.get("techStack") as string).trim();

  if (!title || !slug || !abstract || !rawTags) {
    throw new Error("Title, slug, abstract, and tech stack are required");
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error("Slug may only contain lowercase letters, numbers, and hyphens");
  }

  if (title.length > 255 || abstract.length > 300) {
    throw new Error("Title or abstract exceeds the allowed length");
  }

  const techStack = rawTags
    .split(",")
    .map((tag) => tag.trim().toUpperCase())
    .filter(Boolean);

  const [existingProject] = await db
    .select({ slug: solutionsProjects.slug })
    .from(solutionsProjects)
    .where(eq(solutionsProjects.id, id))
    .limit(1);

  if (!existingProject) {
    throw new Error("Deployment not found");
  }

  const heroAssetUrl = ((formData.get("heroAssetUrl") as string) || "").trim() || null;
  const architectureContent = ((formData.get("architectureContent") as string) || "").trim() || null;
  const liveLink = ((formData.get("liveLink") as string) || "").trim() || null;

  await db
    .update(solutionsProjects)
    .set({
      title,
      slug,
      abstract,
      techStack,
      heroAssetUrl,
      architectureContent,
      liveLink,
      isPublished: formData.get("isPublished") === "on",
    })
    .where(eq(solutionsProjects.id, id));

  revalidatePath("/");
  revalidatePath("/solutions");
  revalidatePath(`/solutions/${existingProject.slug}`);
  revalidatePath(`/solutions/${slug}`);
  revalidatePath("/admin/deployments");
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
