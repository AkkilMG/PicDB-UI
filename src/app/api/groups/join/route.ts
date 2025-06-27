import { GroupDocument } from "@/lib/models"
import { getMongoClient } from "@/lib/mongoConnect"
import { type NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: NextRequest) {
  try {
    const { code, password, username } = await request.json()

    if (!code || !password || !username) {
      return NextResponse.json({ success: false, error: "Code, password, and username are required" }, { status: 400 })
    }
    
    const db = await getMongoClient();
    const groups = db.collection<GroupDocument>("groups")

    // Find group by code
    const group = await groups.findOne({ code })

    if (!group) {
      return NextResponse.json({ success: false, error: "Group not found" }, { status: 404 })
    }

    if (group.password !== password) {
      return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 })
    }

    // Check if user is already a member
    const existingMember = group.members.find((m) => m.username === username)

    if (!existingMember) {
      // Add member to the group
      await groups.updateOne(
        { code },
        {
          $push: {
            members: {
              id: uuidv4(),
              username,
              joinedAt: new Date(),
            },
          },
        },
      )
    }

    return NextResponse.json({
      success: true,
      groupId: group.id,
    })
  } catch (error) {
    console.error("Error joining group:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
