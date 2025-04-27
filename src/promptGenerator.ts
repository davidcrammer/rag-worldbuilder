import { OpenAI } from "openai"
import { OPENAI_API_KEY, META_MODEL } from "./config.js"

const openaiMeta = new OpenAI({ apiKey: OPENAI_API_KEY })

const prompts = [
  "Tell us about a new character for the world.",
  "Summarize an existing lore prompt.",
  "Tell us about a new location for the world.",
  "Tell us about a prominent family in the world.",
  "Tell us about an organization in this world.",
  "Tell us about a new event for the world.",
  "Tell an amusing anecdote about a character in the world.",
  "Give us more information about a character in the world.",
  "Give us a life story of a character in the world.",
  "Describe a normal day in the life of a character in the world.",
  "Describe an occupation in the world.",
  "Describe a rumor going around in the world.",
  "Tell us something random and interesting about the world.",
  "Tell us about the logistics of an existing location in the world.",
  "Tell us about the economy of an existing location in the world.",
  "Tell us about the culture of an existing location in the world.",
  "Tell us about the history of an existing location in the world.",
  "Tell us more about the global politics of the world.",
  "Tell us about the geography of the world.",
  "Tell us about the flora and fauna of the world.",
  "Tell us about the geopolitics of the world.",
  "Tell us about a nearby country to New Caspian.",
  "Tell us about a hobby or pastime in the world.",
  "Tell us about a sport in the world.",
  "Describe a major technological innovation or scientific breakthrough in the world.",
  "Tell the story of a myth or folktale that many citizens believe.",
  "Describe a black market or underground network operating in the world.",
  "Explain a major philosophical system practiced by people in the world.",
  "Describe a political scandal or controversy that shook public opinion.",
  "Tell us about a holiday or major public festival in the world.",
  "Describe a famous piece of art, literature, or music created in this world.",
  "Tell us about a dangerous place most people avoid — and why it is feared.",
  "Describe a criminal syndicate or rogue group causing problems in the world.",
  "Tell us about a forgotten hero or historical figure and their legacy.",
  "Tell us about a prophecy or prediction that influences decisions in the world.",
  "Describe a typical meal or food tradition among the common people.",
  "Describe a medical practice, superstition, or method of healing used by the inhabitants.",
]

export async function generateMetaPrompt(worldOverview: string): Promise<string> {
  // const resp = await openaiMeta.chat.completions.create({
  //   model: META_MODEL,
  //   messages: [
  //     { role: "system", content: "You are a creative AI that generates new world-building prompts." },
  //     { role: "user", content: `Based on the following world summary, suggest the next area to develop:\n${worldOverview}` },
  //   ],
  //   max_tokens: 100,
  // })
  // let content = resp.choices[0].message.content ?? ""
  // content = content.trim()

  // const chosenPrompt = prompts[Math.floor(Math.random() * prompts.length)]

  // content = `"${content}". Based on this, ${chosenPrompt}`

  // return content

  const chosenPrompt = prompts[Math.floor(Math.random() * prompts.length)]
  return chosenPrompt
}
