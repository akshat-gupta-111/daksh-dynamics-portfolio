// filepath: src/app/sitemap.ts
// Placed at app root → served at /sitemap.xml
// Includes all public static routes + dynamically generated solution/academy slugs.
//
// IMPORTANT: Uses .select() without column filtering (select *) to avoid
// Turbopack module-resolution issues with column references in special route files.

import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { solutionsProjects, academyWorkshops } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const BASE_URL = "https://dakshdynamics.akshatcodes.me";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // ── Static public routes ────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                    lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/solutions`,     lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/academy`,       lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/team`,          lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`,       lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
  ];

  // ── Dynamic: published solution slugs ──────────────────
  // Select all columns then pull slug/createdAt — avoids Turbopack column-ref resolution edge case
  const solutions = await db
    .select()
    .from(solutionsProjects)
    .where(eq(solutionsProjects.isPublished, true));

  const solutionRoutes: MetadataRoute.Sitemap = solutions.map((p) => ({
    url: `${BASE_URL}/solutions/${p.slug}`,
    lastModified: p.createdAt ?? now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // ── Dynamic: published academy workshop slugs ───────────
  const workshops = await db
    .select()
    .from(academyWorkshops)
    .where(eq(academyWorkshops.isPublished, true));

  const academyRoutes: MetadataRoute.Sitemap = workshops.map((w) => ({
    url: `${BASE_URL}/academy/${w.slug}`,
    lastModified: w.createdAt ?? now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...solutionRoutes, ...academyRoutes];
}
