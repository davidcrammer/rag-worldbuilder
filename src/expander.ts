import { OpenAI } from "openai"
import { OPENAI_API_KEY, EXPANDER_MODEL } from "./config.js"
import type { ChatCompletionMessageParam } from "openai/resources.js"

const openaiExpander = new OpenAI({ apiKey: OPENAI_API_KEY })

export async function expandLore(metaPrompt: string, context: string[]): Promise<{ id: string; content: string }> {
  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content:
        "You are a world-building AI. Expand the prompt into lore. Let your descriptions be intreguing, but brief, and leave room for expansion. Keep things relatively light and fun, avoid magic, dark themes, ghosts, etc., but keep it interesting. Get specific in naming locations and people and events. Treat this as a real place, with real people, real industry, and real problems.",
    },
  ]
  for (const snippet of context) {
    messages.push({ role: "assistant", content: snippet })
  }

  messages.push({
    role: "user",
    content: metaPrompt,
  })

  const resp = await openaiExpander.chat.completions.create({
    model: EXPANDER_MODEL,
    messages,
    max_tokens: 200,
  })
  // const content = resp.choices[0].message.content.trim()
  let content = resp.choices[0].message.content ?? ""
  content = content.trim()

  const id = `lore_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
  return { id, content }
}
