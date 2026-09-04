// filepath: src/lib/db/index.ts
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Ensure the database URL exists
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing from environment variables');
}

// Create the connection
const sql = neon(process.env.DATABASE_URL);

// Export the Drizzle client initialized with our schema
export const db = drizzle(sql, { schema });