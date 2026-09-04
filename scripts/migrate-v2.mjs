// Migration: creates team_members + site_metrics tables, seeds initial data
// Usage: node --env-file=.env.local scripts/migrate-v2.mjs

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  console.log("▶ Starting v2 migration...");

  // ── team_members ───────────────────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS team_members (
      id              serial PRIMARY KEY,
      name            varchar(255) NOT NULL,
      role            varchar(255) NOT NULL,
      bio             varchar(500) NOT NULL,
      tech_stack      text[]       NOT NULL DEFAULT '{}',
      photo_url       text,
      display_order   integer      NOT NULL DEFAULT 99,
      is_published    boolean      NOT NULL DEFAULT false,
      created_at      timestamp    NOT NULL DEFAULT now()
    )
  `;
  console.log("  ✓ Created team_members table");

  // Seed the 5 existing hardcoded members (skip if already seeded)
  const existing = await sql`SELECT COUNT(*) AS cnt FROM team_members`;
  if (Number(existing[0].cnt) === 0) {
    await sql`
      INSERT INTO team_members (name, role, bio, tech_stack, display_order, is_published) VALUES
      ('AKSHAT_GUPTA',       'AI_ORCHESTRATION & AUTONOMOUS SYSTEMS',  'Specializing in advanced LLM pipelines, LangGraph supervisor architectures, and multi-agent coordination.',                           ARRAY['PYTHON','LANGGRAPH','AZURE AI','TRANSFORMERS'],           1, true),
      ('ANMOL_SHARMA',       'SYSTEM_ARCHITECTURE & BACKEND',          'Focusing on robust cloud infrastructure, scalable serverless monoliths, and high-performance database design.',                      ARRAY['NEXT.JS','POSTGRESQL','DRIZZLE','DOCKER'],                2, true),
      ('KEERTI_YADHUVANSHI', 'INTEGRATION_LOGIC & SYSTEMS',            'Bridging complex software modules with real-world state synchronization and execution pipelines.',                                  ARRAY['TYPESCRIPT','NODE.JS','REST_APIS','REDIS'],               3, true),
      ('UTKARSH_AGARWAL',    'HARDWARE_SYSTEMS & ROBOTICS',            'Designing physical chassis, motor drivers, and low-level embedded firmware for autonomous mobile rovers.',                          ARRAY['ESP32','C++','ROBOTICS','HARDWARE_INTEGRATION'],          4, true),
      ('KUSHAL_SONI',        'DATA_PIPELINES & ANALYTICS',             'Building efficient data telemetry loops, spatial visualization frameworks, and real-time processing systems.',                      ARRAY['PYTHON','SQL','DATA_VIZ','IOT_PROTOCOLS'],                5, true)
    `;
    console.log("  ✓ Seeded 5 existing team members");
  } else {
    console.log("  ↷ team_members already has rows — skipping seed");
  }

  // ── site_metrics ───────────────────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS site_metrics (
      id                   serial PRIMARY KEY,
      systems_deployed     integer   NOT NULL DEFAULT 0,
      workshops_conducted  integer   NOT NULL DEFAULT 0,
      participants_trained integer   NOT NULL DEFAULT 0,
      updated_at           timestamp NOT NULL DEFAULT now()
    )
  `;
  console.log("  ✓ Created site_metrics table");

  // Ensure exactly one row exists (id=1 is the single config row)
  const metricsRows = await sql`SELECT COUNT(*) AS cnt FROM site_metrics`;
  if (Number(metricsRows[0].cnt) === 0) {
    await sql`INSERT INTO site_metrics (systems_deployed, workshops_conducted, participants_trained) VALUES (0, 0, 0)`;
    console.log("  ✓ Seeded default metrics row (all zeros — edit via admin portal)");
  } else {
    console.log("  ↷ site_metrics already initialized — skipping seed");
  }

  console.log("\n✅ v2 Migration complete.");
}

migrate().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
