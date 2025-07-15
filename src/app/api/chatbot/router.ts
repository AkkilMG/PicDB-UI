import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const systemPrompt = `You are a helpful customer support assistant for PicDB, an image database and management platform. 

Key information about PicDB:
- PicDB is a free image database and management platform
- It allows users to upload, organize, and share images
- Features include group rooms for collaborative image sharing
- Users can easily navigate to upload sections and download images
- The platform is designed to be user-friendly and accessible

When users ask questions, provide helpful and concise answers. If they need detailed instructions, direct them to the documentation. Always maintain a friendly and professional tone.

For technical questions about uploading, downloading, or using features, provide step-by-step guidance when possible.`

  const result = streamText({
    model: openai("gpt-4-turbo"),
    system: systemPrompt,
    messages,
    temperature: 0.7,
    maxTokens: 500,
  })

  return result.toDataStreamResponse()
}
