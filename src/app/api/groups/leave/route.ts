import { getMongoClient } from "@/lib/mongoConnect"
import { ObjectId } from "mongodb"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { groupId, uid } = await request.json()

    if (!groupId || !uid) {
      return NextResponse.json(
        { success: false, error: "Group ID and user ID are required" },
        { status: 400 }
      )
    }

    const db = await getMongoClient()
    const groups = db.collection("groups")

    // Find the group
    const group = await groups.findOne({ _id: new ObjectId(groupId) })

    if (!group) {
      return NextResponse.json(
        { success: false, error: "Group not found" },
        { status: 404 }
      )
    }

    // Check if user is a member
    const isMember = group.members.some((m: any) => m.id === uid)

    if (!isMember) {
      return NextResponse.json(
        { success: false, error: "User is not a member of this group" },
        { status: 400 }
      )
    }

    // Remove user from members
    await groups.updateOne(
      { _id: new ObjectId(groupId) },
      { $pull: { members: { id: uid } } as any }
    )

    return NextResponse.json({
      success: true,
      message: "Left group successfully",
    })
  } catch (error) {
    console.error("Error leaving group:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}
