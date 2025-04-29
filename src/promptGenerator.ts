import { OpenAI } from "openai"
import { OPENAI_API_KEY, META_MODEL } from "./config.js"

const openaiMeta = new OpenAI({ apiKey: OPENAI_API_KEY })

const promptsv1 = [
  "Tell us about a new character for the world.",
  "Summarize an existing lore prompt.",
  "Tell us about a new location for the world.",
  "Tell us about a prominent family in the world.",
  "Tell us about an organization in this world.",
  "Tell us about a new event for the world.",
  "Tell an amusing anecdote about a character we've met in the world.",
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

const promptsv2 = [
  "Expand significantly on the background and motivations of an existing character.",
  "Summarize and further elaborate on a previously created lore prompt.",
  "Provide extensive new details about an established location in the world.",
  "Deepen our understanding of a prominent family we've already encountered.",
  "Expand on the structure, goals, and notable figures of an existing organization.",
  "Provide more context and detail about an event previously mentioned in the lore.",
  "Share a detailed and amusing anecdote about a character already introduced.",
  "Offer an in-depth exploration of the personality, habits, or secrets of an existing character.",
  "Construct a comprehensive life story for an established character.",
  "Illustrate a richly detailed typical day in the life of an existing character.",
  "Expand significantly upon a previously mentioned occupation, detailing its nuances.",
  "Elaborate extensively on a rumor already circulating in the world.",
  "Provide additional interesting or unusual facts about previously established world details.",
  "Delve deeply into the logistics and infrastructure of a location we've already defined.",
  "Explain in greater detail the economy of a previously described location.",
  "Expand on the unique cultural practices and traditions of an established location.",
  "Provide an extensive historical background for a previously introduced location.",
  "Give us a deeper analysis of the existing global politics of the world.",
  "Offer detailed insights into the known geography of the established world.",
  "Expand significantly on previously mentioned flora and fauna of the world.",
  "Provide more context on existing geopolitical tensions or alliances in the world.",
  "Explore in detail the relationship between New Caspian and an already established neighboring country.",
  "Expand significantly on a previously mentioned hobby or pastime.",
  "Deepen our understanding of a previously introduced sport.",
  "Elaborate extensively on an existing technological innovation or scientific breakthrough.",
  "Provide additional layers of context or interpretation to an already told myth or folktale.",
  "Describe in detail the operations of a black market or underground network we've previously encountered.",
  "Expand significantly upon a philosophical system previously mentioned.",
  "Provide a deeper dive into a political scandal or controversy previously introduced.",
  "Offer more details about an existing holiday or major public festival.",
  "Expand on the significance, origin, and impact of a previously described piece of art, literature, or music.",
  "Deeply elaborate on the reasons why an established dangerous location is widely feared.",
  "Provide greater detail on the activities and leadership of a previously mentioned criminal syndicate.",
  "Offer more context about the legacy and impact of a previously introduced historical figure or hero.",
  "Expand upon a previously mentioned prophecy or prediction and its current influence.",
  "Describe additional details or cultural context around a previously introduced meal or food tradition.",
  "Expand on the previously described medical practices, superstitions, or healing methods.",
]

const promptsv3 = [
  "Write a social media post revealing a surprising detail about an existing character.",
  "Summarize a viral post or thread based on something that happened in the world.",
  "Share a photo caption or story post that gives more details about an established location.",
  "Describe a trending post about a prominent family everyone knows about.",
  "Create a post by an organization showcasing their culture, scandals, or quirky side.",
  "Write a 'Throwback Thursday' post recounting a key event previously mentioned.",
  "Share a funny meme or inside joke about a character already introduced.",
  "Post a series of comments giving deeper insights into an existing character's habits or secrets.",
  "Create a heartfelt post where an established character shares their life story.",
  "Describe a typical 'Day in the Life' post from an existing character's perspective.",
  "Write a job advertisement or rant about an occupation already mentioned.",
  "Share a juicy rumor spreading on social media in the world.",
  "Write a logistics update or travel vlog entry about a known location.",
  "Share an economic infographic or thread breaking down a city's economy.",
  "Post a cultural tradition going viral from an existing location.",
  "Share a 'Today in History' post about a historic moment from the world.",
  "Write a political hot take or debate post about current world affairs.",
  "Post a travel photo album showing known geography in the world.",
  "Share a nature post or viral video featuring established flora or fauna.",
  "Write a diplomatic drama thread showing ongoing geopolitical tensions.",
  "Share a travel review of a nearby country already introduced.",
  "Post a trending video of a hobby or pastime from the world.",
  "Post a philosophical rant or inspirational quote based on a known worldview.",
  "Write a scandalous exposé about a political controversy that went viral.",
  "Describe photo posts or videos from a recent major holiday or festival.",
  "Share a viral clip of a famous piece of art, literature, or music.",
  "Write a criminal syndicate's anonymous post flexing their operations.",
  "Share a tribute post honoring a forgotten hero or historical figure.",
  "Post a food blog entry about a meal or culinary tradition from the world.",
  "Share a travel blog post about arriving at a new location in the world.",
  "Post a photo and caption from the road, capturing a small unexpected moment.",
  "Write a short travel diary entry reflecting on a cultural tradition just experienced.",
  "Describe a social media post sharing the food or drink the traveler tried today.",
  "Share a story about getting lost or taking an unplanned detour.",
  "Write a thread about a conversation the traveler had with a local.",
  "Post a reaction to a festival, parade, or public gathering the traveler stumbled upon.",
  "Share a moody late-night reflection post from the traveler in an unfamiliar place.",
  "Write a cautionary post sharing a hard-earned lesson or travel mistake.",
  "Share a nostalgic post looking back at a place the traveler is leaving behind.",
  "Describe a travel map update showing the current path and upcoming destinations.",
  "Write a post about the traveler visiting a historic site and sharing what they learned.",
  "Share a 'locals only' tip or hidden gem the traveler was lucky to discover.",
  "Write a post about encountering strange wildlife or unfamiliar natural wonders.",
  "Share a journal entry about crossing a tense border or navigating political tensions.",
  "Describe a warm, homesick post about missing familiar things from home.",
  "Write a short video description where the traveler teaches a few local phrases or customs.",
  "Post about surviving harsh weather or a natural disaster during the journey.",
  "Share a reflective final post about the lessons the traveler learned by the end of the journey.",
  "Post a group chat screenshot between travelers trying to meet up before a festival.",
  "Write a viral trend post where users are posting photos of their worst travel injuries.",
  "Create a mock news alert about a political scandal rocking a major city.",
  "Share a craigslist-style ad offering questionable 'guard duty' jobs for travelers passing through a border zone.",
  "Write a wiki page entry, but show it mid-edit with arguments in the comments.",
  "Write a trending meme format that pokes fun at a well-known historical event or figure from the world.",
  "Post an emergency weather alert forcing all travelers to shelter in place — hinting at larger environmental issues.",
  "Write a nostalgic farewell post as a traveler leaves a city they've grown attached to.",
]

const prompts = [
  "Write something on the topic of a political scandal making headlines.",
  "Write something on the topic of a controversy a politician or leader is trying to cover up.",
  "Write something on the topic of a protest or movement gaining momentum among citizens.",
  "Write something on the topic of leaked information shaking up the political world.",
  "Write something on the topic of an absurd law or political decision being mocked online.",
  "Write something on the topic of a new home trend or tradition gaining popularity.",
  "Write something on the topic of a household disaster or mishap going viral.",
  "Write something on the topic of a family drama story circulating on social media.",
  "Write something on the topic of a cozy or quirky home life moment being shared.",
  "Write something on the topic of a parenting story or family tradition capturing attention.",
  "Write something on the topic of an obscure hobby suddenly trending across communities.",
  "Write something on the topic of a crafting or gaming project being proudly or hilariously shown off.",
  "Write something on the topic of competitive hobby drama or a scandal people are gossiping about.",
  "Write something on the topic of an unexpected new pastime taking over a city or culture.",
  "Write something on the topic of a strange collection or personal obsession going viral.",
  "Write something on the topic of a new song or album causing a stir online.",
  "Write something on the topic of a music feud or collaboration sparking debates among fans.",
  "Write something on the topic of an underground artist breaking into mainstream fame.",
  "Write something on the topic of a music event or concert meltdown trending online.",
  "Write something on the topic of lyrics or a music video causing people to theorize hidden meanings.",
  "Write something on the topic of a video game update, controversy, or tournament causing an uproar.",
  "Write something on the topic of a gaming glitch, exploit, or drama making players furious.",
  "Write something on the topic of a fictional in-world game players are obsessed with.",
  "Write something on the topic of a streamer moment or esports event blowing up on social media.",
  "Write something on the topic of a fandom war or rivalry dominating online discussions.",
  "Write something on the topic of a bizarre conspiracy theory gaining traction online.",
  "Write something on the topic of a prank, challenge, or trend taking over the internet.",
  "Write something on the topic of an internet influencer feud or scandal people are obsessing over.",
  "Write something on the topic of a tech failure or internet outage causing chaos.",
  "Write something on the topic of a clickbait headline or misinformation story causing confusion.",
  "Write something on the topic of a celebrity scandal or rumor dominating the news.",
  "Write something on the topic of a surprising celebrity moment or relationship twist going viral.",
  "Write something on the topic of a once-famous figure experiencing a comeback or fall from grace.",
  "Write something on the topic of private celebrity messages or leaks being shared widely.",
  "Write something on the topic of a celebrity endorsement or marketing fail being mocked.",
  "Write something on the topic of a fan theory connecting pop culture to deeper political or cultural meanings.",
  "Write something on the topic of an unexpected hobby, trend, or technology reshaping society.",
  "Write something on the topic of a travel blog or influencer post offering a strange view into everyday life somewhere else.",
  "Write something on the topic of a survival guide or advice thread going viral after someone is canceled or caught in drama.",
  "Write something on the topic of a home-cooked meal disaster story or funny cooking moment trending online.",
  "Write something on the topic of a new cultural ritual, tradition, or event gaining international fame.",
  "Write something on the topic of a major festival, holiday, or public event capturing worldwide attention.",
  "Write something on the topic of a historical event being reexamined or mocked through memes today.",
  "Write something on the topic of a piece of art, literature, or music from the past inspiring a viral trend.",
  "Write something on the topic of a dark underbelly of a city, hobby, or fandom being exposed.",
  "Write something on the topic of a travel horror story, unexpected kindness, or weird detour being shared.",
  "Write something on the topic of a heartfelt reflection post about leaving a place, job, or community behind.",
  "Write something on the topic of a new slang, phrase, or meme format spreading rapidly among users.",
  "Write something on the topic of a wildlife encounter, natural disaster, or environmental issue trending in travel posts.",
]

export type HandleProfile = {
  name: string
  handle: string
  description: string
}

export const handles: HandleProfile[] = [
  {
    name: "Cal Brennan",
    handle: "@silverdrift",
    description:
      "A New Caspian ferry worker with deadpan humor who treats daily chaos like mildly annoying weather. Lives with his aunt, brews his own terrible beer, and writes rejection letters to fake job offers for fun.",
  },
  {
    name: "Nina Rowe",
    handle: "@pebblevault",
    description:
      "An amateur beachcomber who posts with quiet absurdity, treating mundane finds like ancient relics. Keeps a spreadsheet of all found items, owns three identical windbreakers, and dreams of opening a museum for 'worthless treasures.'",
  },
  {
    name: "Dr. Simon Vane",
    handle: "@thirdlighthouse",
    description:
      "A washed-up academic who buries sharp political satire under layers of fake historical trivia. Collects rare stamps, takes weekly walks with an invisible dog named Horace, and still tries to teach 'guerrilla history' classes to uninterested passersby.",
  },
  {
    name: "Rowan Mace",
    handle: "@mirrorgait",
    description:
      "A wanderer with a dry, ironic voice who thinks they're cool, but is not at all. Lives out of a backpack, is weirdly good at whittling, and hosts imaginary TED talks while camping alone.",
  },
  {
    name: "Dane Whitlock",
    handle: "@corkandsteam",
    description:
      "An ex-ship mechanic who posts greasy wisdom, bar jokes, and slightly dangerous DIY advice. Sleeps in a hammock, volunteers at the scrapyard on weekends, and is building a motorbike out of salvaged boat parts.",
  },
  {
    name: "Mila Stroud",
    handle: "@kettlethief",
    description:
      "A portside thief-turned-meme-lord with an outrageous sense of humor, mixing crime confessions with cute cat pictures. Shares a flat with four cats and one mysterious roommate named ‘Mop’, and sells black-market candy out of a vending machine.",
  },
  {
    name: "Tanner Keene",
    handle: "@lowtidepress",
    description:
      "A self-declared 'citizen journalist' — undercuts serious world news with vicious, well-placed punchlines. Drinks nothing but instant coffee, maintains a conspiracy corkboard for fun, and wears sunglasses indoors to 'protect against surveillance.'",
  },
  {
    name: "Sasha Wren",
    handle: "@mosswindow",
    description:
      "A dreamily sarcastic café server who posts melancholy art photos and snarky customer commentary. Keeps a sketchbook full of doodled overheard conversations, lives above the café, and dreams of escaping to a nonexistent island.",
  },
  {
    name: "Leo Hart",
    handle: "@foldedhorizon",
    description:
      "An earnest young backpacker who keeps stumbling into conspiracies, documented through increasingly unhinged optimism. Travels with a journal, a slingshot, and one sock always missing. Still believes every wrong turn is 'fate.'",
  },
  {
    name: "Clint Reyes",
    handle: "@straycurrent",
    description:
      "An electrical worker whose humor is short-circuited into dad jokes, bad puns, and grim accident stories. Has a pet iguana named Circuit, records his dreams in Morse code, and once tried to install Christmas lights permanently on his house.",
  },
  {
    name: "Tessa Rourke",
    handle: "@parcelwolf",
    description:
      "A courier with lightning-fast wit and a tendency to roast entire neighborhoods in three words or less. Owns seventeen different satchels, refuses to use GPS out of principle, and writes anonymous love letters to buildings she admires.",
  },
  {
    name: "Vera Quinn",
    handle: "@bonereef",
    description:
      "A grim dockside poet who posts elegant laments one moment, then absolutely savage takes the next. Lives in a converted shipping container, plays cello in the evenings, and keeps a ledger titled 'People Who Talk Too Loudly.'",
  },
  {
    name: "Jax Monroe",
    handle: "@gripetrap",
    description:
      "A snack cart owner who posts passive-aggressive food reviews of rival vendors disguised as 'taste testing adventures'. Keeps a secret spice blend in a hollowed-out pepper grinder, watches soap operas religiously, and hosts secret midnight cook-offs.",
  },
  {
    name: "Mira Solis",
    handle: "@pennydusk",
    description:
      "A quiet but cutting art student posting strange, funny sketches that roast the world without speaking directly. Has a pet snail named Orbit, lives in a rented attic with no windows, and uses disposable cameras religiously.",
  },
  {
    name: "Eli Sparks",
    handle: "@harbormarble",
    description:
      "A tourist stuck in New Caspian after losing his passport, posting about the absurdity of it all. Has been wearing the same jeans for three weeks, befriended a seagull named Captain, and invented a fictional 'Embassy of the Lost.'",
  },
  {
    name: "Jonas 'Joey' Creed",
    handle: "@ghostcradle",
    description:
      "A local bar owner who posts dumb jokes and bad puns, but also captures the city's weirdest moments. Sleeps in the bar’s back room, keeps a record of regulars’ weirdest drink orders, and officiates unofficial weddings after last call.",
  },
  {
    name: "Poppy Vance",
    handle: "@sunspill",
    description:
      "An overenthusiastic travel vlogger with chaotic good energy and a knack for posting heartwarmingly bad selfies. Carries a stuffed fox for 'good luck,' talks to statues when bored, and records voice memos to her future self.",
  },
  {
    name: "Miles Graft",
    handle: "@undercutanchor",
    description:
      "A burned-out sailor whose bitter jokes about bureaucracy, storms, and breakups hide rare flashes of affection. Secretly writes romance novels under a pen name and dreams of owning a lighthouse.",
  },
  {
    name: "Cass Weaver",
    handle: "@lintandbrine",
    description:
      "A street vendor with the sly, mischievous humor of someone always one step ahead of customers and cops. Sleeps in a storage unit, hustles fake 'rare antiques,' and plays harmonica badly but proudly.",
  },
  {
    name: "Ivy Holt",
    handle: "@orbitalweeds",
    description:
      "An amateur botanist-slash-smuggler whose posts accidentally blend plant facts with criminal activity and absurd memes. Runs a secret rooftop greenhouse and names plants after ex-lovers.",
  },
  {
    name: "Bennett Shaw",
    handle: "@blinktower",
    description:
      "A bored clerk in New Caspian's labyrinthine administration who posts increasingly surreal office stories. Runs an underground zine called 'Bureaucracy and Other Natural Disasters.'",
  },
  {
    name: "Felix Dare",
    handle: "@crookedsundial",
    description:
      "A local eccentric blending whimsical aphorisms with razor-sharp insults, never explaining when he's joking. Claims to have invented three imaginary sports and refuses to use the same route twice in a week.",
  },
  {
    name: "Nora Pike",
    handle: "@hollowwake",
    description:
      "A nightwatch security guard who narrates chill nighttime scenes with dry wit. Builds miniature ships in bottles during shifts and leaves anonymous haikus in abandoned alleyways.",
  },
  {
    name: "Vic Calder",
    handle: "@dockworm",
    description:
      "A scrap scavenger whose humor is proudly crude, brilliantly dumb, and occasionally philosophical by accident. Hosts a weekly 'junkyard salon' for out-of-work poets and conspiracy theorists.",
  },
]

export async function generateMetaPrompt(): Promise<{
  prompt: string
  character: HandleProfile
}> {
  const chosenPrompt = prompts[Math.floor(Math.random() * prompts.length)]

  // Randomly select a handle
  const randomHandleIndex = Math.floor(Math.random() * handles.length)
  const character = handles[randomHandleIndex]
  const randomDate = new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000))
  const randomTimestamp = randomDate.toISOString().replace(/T/, " ").replace(/\..+/, "")
  const randomLikes = Math.floor(Math.random() * 1000)
  const randomReposts = Math.floor(Math.random() * 100)
  const randomComments = Math.floor(Math.random() * 100)

  const prompt = `Today is ${randomDate} at ${randomTimestamp} 
  
  This post should be from the handle ${character.handle}
  This post should have ${randomLikes} likes, ${randomReposts} reposts, and ${randomComments} comments.
  
  ${chosenPrompt}`

  return { prompt, character }
}
