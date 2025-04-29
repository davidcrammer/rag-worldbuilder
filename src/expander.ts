import { OpenAI } from "openai"
import { OPENAI_API_KEY, EXPANDER_MODEL } from "./config.js"
import type { ChatCompletionMessageParam } from "openai/resources.js"
import type { HandleProfile } from "./promptGenerator.js"

const openaiExpander = new OpenAI({ apiKey: OPENAI_API_KEY })

export async function expandLore(prompt: string, context: string[], character: HandleProfile): Promise<{ id: string; content: string }> {
  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: `You are simulating a fictional social network inside a fictional world. Your job is to produce realistic social media content: posts, DMs, group chats, screenshots, polls, flyers, reviews, wiki edits, classifieds, or news alerts — whatever feels authentic for the moment.
      Always frame your outputs with convincing metadata: handles, timestamps, dates, likes, reposts, etc.
      Posts should reference existing people, places, events, or myths in the world where possible.
      Avoid inventing major new things unless prompted directly. Instead, deepen, elaborate, or extend what already exists.
      Use hashtags, slang, cultural references, or inside jokes to make the world feel cohesive and self-referential.

      The post should try to avoid hilighting that anything is unusual or strange, as if it is normal.
      Avoid sounding too poetic, and instead sound like a real person. Use a casual, conversational tone.

      Keep each post short, vivid, and believable. Do not repeat the system prompt, the user prompt, or mention that you are an AI.
      Posts should feel fragmentary — hints of a bigger world, not full explanations. Let readers infer lore organically.”`,
    },
  ]
  for (const snippet of context) {
    messages.push({ role: "assistant", content: snippet })
  }

  messages.push({
    role: "user",
    content: prompt,
  })

  messages.push({
    role: "user",
    content: `The character is ${character.name} who goes by the handle ${character.handle}. ${character.description}`,
  })

  const resp = await openaiExpander.chat.completions.create({
    model: EXPANDER_MODEL,
    messages,
    max_completion_tokens: 500,
  })

  let content = resp.choices[0].message.content ?? ""
  content = content.trim()

  const id = `lore_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
  return { id, content }
}
