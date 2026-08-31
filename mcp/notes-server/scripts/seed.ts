// mcp/notes-server/scripts/seed.ts
// node --experimental-strip-types scripts/seed.ts notes.db
import Database from "better-sqlite3";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const dbPath = process.argv[2] ?? "notes.db";
const here = dirname(fileURLToPath(import.meta.url));
const sql = readFileSync(resolve(here, "..", "seed.sql"), "utf8");

const db = new Database(dbPath);
db.exec(sql);
console.log(`Seeded ${dbPath}`);