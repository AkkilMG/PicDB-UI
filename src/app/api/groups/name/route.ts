import { getMongoClient } from "@/lib/mongoConnect"
import { ObjectId } from "mongodb";
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { groupId, name } = await request.json()
    if (!groupId || !name) {
      return NextResponse.json({ success: false, error: "Group ID and name are required" }, { status: 400 })
    }

    const db = await getMongoClient();
    const groups = db.collection<any>("groups")
    
    const saved = await groups.updateOne(
        { _id: new ObjectId(groupId) },
        { name }
    )

    return NextResponse.json({
      success: true
    })
  } catch (error) {
    console.error("Error creating group:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
