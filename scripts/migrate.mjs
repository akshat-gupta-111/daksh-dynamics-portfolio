// Migration script: run once to sync Neon DB with updated schema
// Usage: node --env-file=.env.local scripts/migrate.mjs

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  console.log("▶ Starting schema migration...");

  // ── academy_workshops ──────────────────────────────────────────────────────

  // 1. Drop the old forward-looking curriculum_timeline column
  await sql`ALTER TABLE academy_workshops DROP COLUMN IF EXISTS curriculum_timeline`;
  console.log("  ✓ Dropped curriculum_timeline");

  // 2. Change duration_days from serial-backed to plain integer
  //    (serial is actually int4 with a default sequence — casting is safe)
  await sql`ALTER TABLE academy_workshops ALTER COLUMN duration_days TYPE integer USING duration_days::integer`;
  await sql`ALTER TABLE academy_workshops ALTER COLUMN duration_days SET DEFAULT 1`;
  console.log("  ✓ Fixed duration_days (serial → integer)");

  // 3. Add new portfolio fields (IF NOT EXISTS to make idempotent)
  await sql`ALTER TABLE academy_workshops ADD COLUMN IF NOT EXISTS institution varchar(255)`;
  await sql`ALTER TABLE academy_workshops ADD COLUMN IF NOT EXISTS conducted_at timestamp`;
  await sql`ALTER TABLE academy_workshops ADD COLUMN IF NOT EXISTS participant_count integer`;
  await sql`ALTER TABLE academy_workshops ADD COLUMN IF NOT EXISTS cover_image_url text`;
  await sql`ALTER TABLE academy_workshops ADD COLUMN IF NOT EXISTS topics_covered text[]`;
  await sql`ALTER TABLE academy_workshops ADD COLUMN IF NOT EXISTS testimonial varchar(500)`;
  console.log("  ✓ Added portfolio fields (institution, conducted_at, participant_count, cover_image_url, topics_covered, testimonial)");

  // ── solutions_projects ─────────────────────────────────────────────────────

  // 4. Migrate architecture_content from jsonb to text
  await sql`ALTER TABLE solutions_projects ALTER COLUMN architecture_content TYPE text USING architecture_content::text`;
  console.log("  ✓ Migrated architecture_content (jsonb → text)");

  console.log("\n✅ Migration complete.");
}

migrate().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
