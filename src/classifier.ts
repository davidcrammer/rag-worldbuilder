import OpenAI from "openai"
import { OPENAI_API_KEY, META_MODEL } from "./config.js"

const openaiClassifier = new OpenAI({ apiKey: OPENAI_API_KEY })

export async function classifyLore(content: string): Promise<{ type: string; tags: string[] }> {
  const resp = await openaiClassifier.chat.completions.create({
    model: META_MODEL,
    messages: [
      {
        role: "system",
        content:
          "You are an assistant that classifies worldbuilding lore into a type and tags. Be sure to include all proper nouns listed, names, social media handles, etc.",
      },
      {
        role: "user",
        content: `Lore:\n${content}\n\nRespond with a JSON object with keys "type" and "tags", where "type" is one of ["character","location","organization","event","artifact","myth"] and "tags" is an array of up to 10 short tag strings. Avoid abstract tags and favor proper nouns for tags. Do not output any other text.`,
      },
    ],
    max_tokens: 150,
  })
  let returnContent = resp.choices[0].message.content ?? ""

  try {
    return JSON.parse(returnContent)
  } catch {
    return { type: "artifact", tags: [] }
  }
}
