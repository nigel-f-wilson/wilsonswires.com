// Applies the SQL files in db/migrations, in filename order, skipping any that
// have already been applied. Run with `pnpm db:migrate`.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import postgres from 'postgres';

const url = process.env.POSTGRES_URL_NON_POOLING ?? process.env.POSTGRES_URL ?? process.env.DATABASE_URL;
if (!url) {
  console.error('No database configured. Set POSTGRES_URL (see .env.example).');
  process.exit(1);
}

const sql = postgres(url, { max: 1, onnotice: () => {} });
const dir = path.join(import.meta.dirname, '..', 'db', 'migrations');

try {
  await sql`CREATE TABLE IF NOT EXISTS schema_migrations (
    filename   text PRIMARY KEY,
    applied_at timestamptz NOT NULL DEFAULT now()
  )`;
  const applied = new Set((await sql`SELECT filename FROM schema_migrations`).map((row) => row.filename));
  const files = (await readdir(dir)).filter((file) => file.endsWith('.sql')).sort();

  for (const file of files) {
    if (applied.has(file)) {
      console.log(`skip   ${file}`);
      continue;
    }
    const contents = await readFile(path.join(dir, file), 'utf8');
    // Each file runs in a transaction, so a failed migration leaves nothing behind.
    await sql.begin(async (tx) => {
      await tx.unsafe(contents);
      await tx`INSERT INTO schema_migrations (filename) VALUES (${file})`;
    });
    console.log(`apply  ${file}`);
  }
  console.log('Database is up to date.');
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await sql.end();
}
