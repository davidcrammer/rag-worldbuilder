import { OpenAI } from "openai"
import { OPENAI_API_KEY, EXPANDER_MODEL } from "./config.js"
import type { ChatCompletionMessageParam } from "openai/resources.js"

const openaiExpander = new OpenAI({ apiKey: OPENAI_API_KEY })

type HandleProfile = {
  handle: string
  description: string
}

const handles: HandleProfile[] = [
  {
    handle: "@silverdrift",
    description: "A New Caspian ferry worker with deadpan humor who treats daily chaos like mildly annoying weather.",
  },
  {
    handle: "@pebblevault",
    description: "An amateur beachcomber who posts with quiet absurdity, treating mundane finds like ancient relics.",
  },
  {
    handle: "@thirdlighthouse",
    description: "A washed-up academic who buries sharp political satire under layers of fake historical trivia.",
  },
  { handle: "@mirrorgait", description: "A wanderer with a dry, ironic voice who thinks they're cool, but is not at all." },
  { handle: "@corkandsteam", description: "An ex-ship mechanic who posts greasy wisdom, bar jokes, and slightly dangerous DIY advice." },
  {
    handle: "@kettlethief",
    description: "A portside thief-turned-meme-lord with an outrageous sense of humor, mixing crime confessions with cute cat pictures.",
  },
  {
    handle: "@lowtidepress",
    description: "A self-declared 'citizen journalist' — undercuts serious world news with vicious, well-placed punchlines.",
  },
  {
    handle: "@mosswindow",
    description: "A dreamily sarcastic café server who posts melancholy art photos and snarky customer commentary.",
  },
  {
    handle: "@foldedhorizon",
    description: "An earnest young backpacker who keeps stumbling into conspiracies, documented through increasingly unhinged optimism.",
  },
  {
    handle: "@straycurrent",
    description: "An electrical worker whose humor is short-circuited into dad jokes, bad puns, and grim accident stories.",
  },
  {
    handle: "@parcelwolf",
    description: "A courier with lightning-fast wit and a tendency to roast entire neighborhoods in three words or less.",
  },
  { handle: "@bonereef", description: "A grim dockside poet who posts elegant laments one moment, then absolutely savage takes the next." },
  {
    handle: "@gripetrap",
    description: "A snack cart owner who posts passive-aggressive food reviews of rival vendors disguised as 'taste testing adventures'.",
  },
  {
    handle: "@pennydusk",
    description: "A quiet but cutting art student posting strange, funny sketches that roast the world without speaking directly.",
  },
  {
    handle: "@harbormarble",
    description: "A tourist who is accidentally stuck in New Caspian as they lost their passport, posting about the absurdity of it all.",
  },
  {
    handle: "@ghostcradle",
    description: "A local bar owner who posts dumb jokes and bad puns, but also has a knack for capturing the city's weirdest moments.",
  },
  {
    handle: "@sunspill",
    description: "An overenthusiastic travel vlogger with chaotic good energy and a knack for posting heartwarmingly bad selfies.",
  },
  {
    handle: "@undercutanchor",
    description: "A burned-out sailor whose bitter jokes about bureaucracy, storms, and breakups hide rare flashes of affection.",
  },
  {
    handle: "@lintandbrine",
    description: "A street vendor with the sly, mischievous humor of someone who's always one step ahead of both customers and cops.",
  },
  {
    handle: "@orbitalweeds",
    description: "An amateur botanist-slash-smuggler whose posts accidentally blend plant facts with criminal activity and absurd memes.",
  },
  {
    handle: "@blinktower",
    description: "A bored clerk in New Caspian's labyrinthine administration who posts increasingly surreal office stories.",
  },
  {
    handle: "@crookedsundial",
    description: "A local eccentric blending whimsical aphorisms with razor-sharp insults, never explaining when he's joking.",
  },
  { handle: "@hollowwake", description: "A nightwatch security guard who narrates chill nighttime scenes with dry wit." },
  {
    handle: "@dockworm",
    description: "A scrap scavenger whose humor is proudly crude, brilliantly dumb, and occasionally philosophical by accident.",
  },
]

type ToneWeight = {
  tone: string
  weight: number
}

const toneWeights: ToneWeight[] = [
  { tone: "sarcastic", weight: 30 },
  { tone: "deadpan", weight: 20 },
  { tone: "overly dramatic", weight: 15 },
  { tone: "earnest but goofy", weight: 15 },
  { tone: "shitpost", weight: 10 },
  { tone: "enraged", weight: 10 },
  { tone: "poblano", weight: 5 },
  { tone: "?!?!?!", weight: 5 },
]

export async function expandLore(metaPrompt: string, context: string[]): Promise<{ id: string; content: string }> {
  // Randomly select a tone based on the weights
  const totalWeight = toneWeights.reduce((sum, { weight }) => sum + weight, 0)
  const randomValue = Math.random() * totalWeight
  let cumulativeWeight = 0
  let selectedTone = "junky" // Default tone
  for (const { tone, weight } of toneWeights) {
    cumulativeWeight += weight
    if (randomValue < cumulativeWeight) {
      selectedTone = tone
      break
    }
  }
  // Randomly select a handle
  const randomHandleIndex = Math.floor(Math.random() * handles.length)
  const randomHandle = handles[randomHandleIndex]
  const randomDate = new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000))
  const randomTimestamp = randomDate.toISOString().replace(/T/, " ").replace(/\..+/, "")
  const randomLikes = Math.floor(Math.random() * 1000)
  const randomReposts = Math.floor(Math.random() * 100)
  const randomComments = Math.floor(Math.random() * 100)

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: `“Today is ${randomDate} at ${randomTimestamp} You are simulating a fictional social network inside a fictional world.
Your job is to produce realistic social media content: posts, DMs, group chats, screenshots, polls, flyers, reviews, wiki edits, classifieds, or news alerts — whatever feels authentic for the moment.

Always frame your outputs with convincing metadata: handles, timestamps, dates, likes, reposts, etc.

Posts should reference existing people, places, events, or myths in the world where possible.
Avoid inventing major new things unless prompted directly. Instead, deepen, elaborate, or extend what already exists.

Use hashtags, slang, cultural references, or inside jokes to make the world feel cohesive and self-referential.

This post should be from the handle ${randomHandle.handle}, who is ${randomHandle.description} 

This post should have ${randomLikes} likes, ${randomReposts} reposts, and ${randomComments} comments.
The tone of this post should be ${selectedTone}.

Keep each post short, vivid, and believable. Do not repeat the system prompt, the user prompt, or mention that you are an AI.
Posts should feel fragmentary — hints of a bigger world, not full explanations. Let readers infer lore organically.”`,
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
    max_completion_tokens: 500,
  })

  let content = resp.choices[0].message.content ?? ""
  content = content.trim()

  const id = `lore_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
  return { id, content }
}
