import fs from "fs"
import path from "path"
import Database from "better-sqlite3"
import { ChromaClient } from "chromadb"
import { SQLITE_DB_PATH, CHROMA_PATH, CHROMA_COLLECTION } from "./config.js"

// Ensure data directory for SQLite exists
fs.mkdirSync(path.dirname(SQLITE_DB_PATH), { recursive: true })

export const sqlite = new Database(SQLITE_DB_PATH)

export const chroma = new ChromaClient({ path: "http://localhost:8000" })

export async function initializeChroma() {
  try {
    await chroma.createCollection({ name: CHROMA_COLLECTION })
  } catch (err: any) {
    console.warn("Collection likely already exists:", err.message)
  }
}
