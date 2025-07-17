import { getMongoClient } from "@/lib/mongoConnect"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 })
    }

    const db = await getMongoClient()
    const groups = db.collection("groups")

    // Find all groups where the user is a member
    const userGroups = await groups
      .find({
        "members.id": userId,
      })
      .toArray()

    const groupsResponse = userGroups.map((group) => ({
      id: group._id.toString(),
      name: group.name,
      code: group.code,
      password: group.password,
      joinedAt:
        group.members.find((m: any) => m.id === userId)?.joinedAt?.toISOString() || group.createdAt.toISOString(),
      lastActivity:
        group.messages.length > 0
          ? group.messages[group.messages.length - 1].timestamp.toISOString()
          : group.createdAt.toISOString(),
      memberCount: group.members.length,
      messageCount: group.messages.length,
    }))

    return NextResponse.json({
      success: true,
      groups: groupsResponse,
    })
  } catch (error) {
    console.error("Error fetching user groups:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
