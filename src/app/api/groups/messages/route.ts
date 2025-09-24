import { type NextRequest, NextResponse } from "next/server"
import axios from "axios"
import { getMongoClient } from "@/lib/mongoConnect"
import { GroupDocument, MessageDocument } from "@/lib/models"
import { ObjectId } from "mongodb"


// Import groups data (in production, use database)
const groups: Record<string, any> = {}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const file = formData.get("file") as File
    const code = formData.get("code") as string
    const uid = formData.get("uid") as string
    const username = formData.get("username") as string
    const groupId = formData.get("groupId") as string

    // console.log("Received data:", { file: file ? file.name : "No file", code, uid, username, groupId, })

    if (!file || !code || !uid || !groupId || !username) {
      return NextResponse.json({ success: false, error: "File, code, uid, username and groupId are required" }, { status: 400 })
    }

    const db = await getMongoClient();
    const groupsCollection = db.collection<any>("groups")
    const group = await groupsCollection.findOne({ _id: new ObjectId(groupId), code })

    if (!group) {
      return NextResponse.json({ success: false, error: "Group not found or invalid code" }, { status: 404 })
    }

    // Upload to external service
    const uploadFormData = new FormData()
    uploadFormData.append("file", file)

    const response = await axios.post("https://picdb-api.arkynox.com/upload", uploadFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    if (response.data.success === true) {
      const newMessage = {
        id: response.data.id, imageUrl: response.data.vurl, downloadUrl: response.data.durl,
        viewUrl: response.data.vurl, uid, username, timestamp: new Date(), title: file.name, size: file.size,
      }
      // await groupsCollection.updateOne(
      //   { _id: new ObjectId(groupId), code },
      //   { messages: { $push: { newMessage } } },
      // )

      await groupsCollection.updateOne(
        { _id: new ObjectId(groupId), code },
        { $push: { messages: newMessage } as any }
      );


      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, error: response.data.message }, { status: 400 })
    }
  } catch (error) {
    console.error("Error uploading image:", error)
    return NextResponse.json({ success: false, error: "Failed to upload image" }, { status: 500 })
  }
}
