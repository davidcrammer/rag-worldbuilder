// sqlite migration to add tags column to lore table\

import { CHROMA_COLLECTION } from "../config.js"
import { sqlite, chroma } from "../db.js"

async function resetDatabase() {
  sqlite.exec(`
    DROP TABLE IF EXISTS lore;
  `)

  sqlite.exec(`
    CREATE TABLE lore (
        id TEXT PRIMARY KEY,
        type TEXT,
        content TEXT,
        embedding_id TEXT,
        tags TEXT,
        created_at TEXT
      );
    `)

  const collection = await chroma.getCollection({ name: CHROMA_COLLECTION })
  await collection.delete()
}

resetDatabase()
  .then(() => {
    console.log("Database reset successfully.")
  })
  .catch((error) => {
    console.error("Error resetting database:", error)
  })
