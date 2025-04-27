// sqlite migration to add tags column to lore table\

import { sqlite } from "../db.js"

sqlite.exec(`
CREATE TABLE IF NOT EXISTS lore (
    id TEXT PRIMARY KEY,
    type TEXT,
    content TEXT,
    embedding_id TEXT,
    tags TEXT,
    created_at TEXT
  );
`)
