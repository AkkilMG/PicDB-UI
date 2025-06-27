import { type NextRequest, NextResponse } from "next/server"
import axios from "axios"
import { getMongoClient } from "@/lib/mongoConnect"
import { GroupDocument, MessageDocument } from "@/lib/models"


// Import groups data (in production, use database)
const groups: Record<string, any> = {}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const groupId = params.id
    const formData = await request.formData()

    const file = formData.get("file") as File
    const code = formData.get("code") as string
    const username = formData.get("username") as string

    if (!file || !code || !username) {
      return NextResponse.json({ success: false, error: "File, code, and username are required" }, { status: 400 })
    }


    const db = await getMongoClient();
    const groupsCollection = db.collection<GroupDocument>("groups")

    // Find and verify group
    const group = await groupsCollection.findOne({ id: groupId, code })

    if (!group) {
      return NextResponse.json({ success: false, error: "Group not found or invalid code" }, { status: 404 })
    }

    // Upload to external service
    const uploadFormData = new FormData()
    uploadFormData.append("file", file)

    const response = await axios.post("https://picdb.avianintek.workers.dev/upload", uploadFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    if (response.data.success === true) {
      const newMessage: MessageDocument = {
        id: response.data.id,
        imageUrl: response.data.vurl,
        downloadUrl: response.data.durl,
        viewUrl: response.data.vurl,
        username,
        timestamp: new Date(),
        title: file.name,
        size: file.size,
      }

      // Add message to group
      await groupsCollection.updateOne(
        { id: groupId, code },
        {
          $push: {
            messages: newMessage,
          },
        },
      )

      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, error: response.data.message }, { status: 400 })
    }
  } catch (error) {
    console.error("Error uploading image:", error)
    return NextResponse.json({ success: false, error: "Failed to upload image" }, { status: 500 })
  }
}
