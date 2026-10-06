// Database connection. Server-side only: never import this from a 'use client' file.
import postgres from 'postgres';

let connection: postgres.Sql | undefined;

// Returns a shared connection, opened the first time it is needed.
export function getDb(): postgres.Sql {
  if (!connection) {
    const url = process.env.POSTGRES_URL ?? process.env.DATABASE_URL;
    if (!url) {
      throw new Error('No database configured. Set POSTGRES_URL (see .env.example).');
    }
    connection = postgres(url, {
      // Vercel's pooled connection strings do not support prepared statements.
      prepare: false,
      max: 5,
    });
  }
  return connection;
}
