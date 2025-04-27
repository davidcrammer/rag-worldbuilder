import { sqlite, chroma } from "./db.js"
import { CHROMA_COLLECTION } from "./config.js"
import { embedText } from "./embeddings.js"

export async function storeLore(id: string, content: string, type: string, tags: string[]): Promise<void> {
  const embedding = await embedText(content)
  const collection = await chroma.getCollection({ name: CHROMA_COLLECTION })
  await collection.add({ ids: [id], documents: [content], embeddings: [embedding] })
  sqlite
    .prepare("INSERT INTO lore (id, type, content, embedding_id, tags) VALUES (?, ?, ?, ?, ?)")
    .run(id, type, content, id, JSON.stringify(tags))
}
