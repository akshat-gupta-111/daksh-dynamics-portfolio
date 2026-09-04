// Migration v3: creates contact_messages table
// Usage: node --env-file=.env.local scripts/migrate-v3.mjs

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  console.log("▶ Starting v3 migration...");

  await sql`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id         serial       PRIMARY KEY,
      name       varchar(255) NOT NULL,
      email      varchar(255) NOT NULL,
      phone      varchar(20),
      type       varchar(20)  NOT NULL,
      message    text         NOT NULL,
      is_read    boolean      NOT NULL DEFAULT false,
      created_at timestamp    NOT NULL DEFAULT now()
    )
  `;
  console.log("  ✓ Created contact_messages table");
  console.log("\n✅ v3 Migration complete.");
}

migrate().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
