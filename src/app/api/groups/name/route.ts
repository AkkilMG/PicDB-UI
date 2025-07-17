import { getMongoClient } from "@/lib/mongoConnect"
import { ObjectId } from "mongodb"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const uid = url.searchParams.get("uid")

    if (!uid) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 })
    }
    
    const db = await getMongoClient()
    const user = db.collection("info")

    const result = await user.findOne({ _id: new ObjectId(uid) })
    if (!result) {
      return NextResponse.json({ success: false, error: "Invalid UID, check it again!"}, { status: 400 })
    }

    return NextResponse.json({ success: true, data: result})
  } catch (error) {
    console.error("Error updating group name:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { groupId, name } = await request.json()

    if (!groupId || !name) {
      return NextResponse.json({ success: false, error: "Group ID and name are required" }, { status: 400 })
    }

    const db = await getMongoClient()
    const groups = db.collection("groups")
    const result = await groups.findOne({ _id: new ObjectId(groupId) })
    if (!result || result.length === 0) {
      return NextResponse.json({ success: false, error: "Group not found" }, { status: 404 })
    }
    await groups.updateOne({ _id: new ObjectId(groupId) }, { $set: { name } })
    return NextResponse.json({
      success: true,
      message: "Group name updated successfully",
    })
  } catch (error) {
    console.error("Error updating group name:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
