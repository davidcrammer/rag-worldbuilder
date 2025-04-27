// src/retriever.ts
import { chroma } from "./db.js"
import { CHROMA_COLLECTION, MAX_LORE_RETRIEVAL } from "./config.js"
import { embedText } from "./embeddings.js"

export async function retrieveRelevantLore(query: string): Promise<{ id: string; content: string }[]> {
  const queryEmbedding = await embedText(query)
  const collection = await chroma.getCollection({ name: CHROMA_COLLECTION })

  // Perform a similarity search without explicit includes (defaults return ids and documents)
  const result = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: MAX_LORE_RETRIEVAL,
  })

  const docs = (result.documents as string[][])[0]
  const ids = (result.ids as string[][])[0]

  return ids.map((id, idx) => ({ id, content: docs[idx] }))
}
