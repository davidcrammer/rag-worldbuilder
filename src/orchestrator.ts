import { retrieveRelevantLore } from "./retriever.js"
import { generateMetaPrompt } from "./promptGenerator.js"
import { expandLore } from "./expander.js"
import { storeLore } from "./store.js"
import { initializeChroma } from "./db.js"
import { classifyLore } from "./classifier.js"
import c from "chalk"

const print = (...text: any) => {
  console.log("")
  console.log(c.cyan("---"))
  console.log("")
  console.log(...text)
}

async function main() {
  console.log("Starting world-building RAG loop...")

  // let worldOverview = `The city of New Caspian is an intriguing place. It appears on the surface to be like any other quaint island town, laid back, vacation time, but digging deeper reveals some interesting stories and people. The infrastructure is quite advanced and sometimes seems impractical, but it all works out. Lots of concrete under the surface. Underground is a network of tunnels that unite the most obscure parts of the city. The main port, where all trade connects, is only accessible through an underground tunnel that goes under the ocean and surfaces a mile away at the port location. It is a city of interesting logistics and efficiency solutions. Deeply rooted in geopolitics for its strategic positioning in the Pacific, there do exist political tensions around who has control over this valuable sovereign nation. Despite being so advanced logistically and so important to geo-politics, it is a popular vacation destination for families. Many great innovators have made New Caspian their home. There is no place on earth quite like it. `

  // let worldOverview = `The city of New Caspian is an intriguing place. It appears on the surface to be like any other quaint island town, laid back, vacation time, but digging deeper reveals some interesting stories and people and interesting industry`

  let worldOverview =
    "he city of New Caspian is an intriguing place. It appears on the surface to be like any other quaint island town, laid back, vacation time, but digging deeper reveals some interesting stories and people."

  await initializeChroma()

  for (let i = 0; i < 10000; i++) {
    console.log(`Iteration ${i + 1}`)
    const prompt = await generateMetaPrompt(worldOverview)

    print("Generated prompt:", prompt)

    const relevant = await retrieveRelevantLore(prompt)
    print("Retrieved relevant lore:")
    relevant.forEach((r) => {
      console.log(c.cyan(r.id), "-", r.content)
    })

    const context = relevant.map((r) => r.content)
    const { id, content } = await expandLore(worldOverview + prompt, context)

    print("Expanded lore:", content)

    const { type, tags } = await classifyLore(content)

    print("Classified lore:", { type, tags })

    await storeLore(id, content, type, tags)
  }
}

main()
  .then(() => {
    console.log("World-building RAG loop completed successfully.")
  })
  .catch((error) => {
    console.error("Error during world-building RAG loop:", error)
  })
