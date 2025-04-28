import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import type { ChatModel, EmbeddingModel } from "openai/resources.js"

// ESM __dirname/polyfill
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY!
export const SQLITE_DB_PATH = path.resolve(__dirname, "../data/world.db")
export const CHROMA_PATH = path.resolve(__dirname, "../data/chroma")
export const CHROMA_COLLECTION = "world_lore"
export const META_MODEL: ChatModel = "gpt-4.1-mini"
export const EXPANDER_MODEL: ChatModel = "gpt-4.1-mini"
export const EMBEDDING_MODEL: EmbeddingModel = "text-embedding-ada-002"
export const MAX_LORE_RETRIEVAL = 5
