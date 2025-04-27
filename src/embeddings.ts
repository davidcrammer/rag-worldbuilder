import { OpenAI } from "openai"
import { OPENAI_API_KEY, EMBEDDING_MODEL } from "./config.js"

const openai = new OpenAI({ apiKey: OPENAI_API_KEY })

export async function embedText(text: string): Promise<number[]> {
  const resp = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text,
  })
  return resp.data[0].embedding
}
