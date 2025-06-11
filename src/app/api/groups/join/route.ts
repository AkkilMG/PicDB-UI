import { type NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

// Import the groups data from the main groups route
// In production, this would be from a shared database
const groups: Record<string, any> = {
  // Dummy group for testing
  "test-group-1": {
    id: "test-group-1",
    name: "Test Group",
    code: "ABC123",
    password: "test123",
    createdAt: new Date("2024-01-01"),
    createdBy: "TestUser",
    members: [
      { id: "member-1", username: "TestUser", joinedAt: new Date("2024-01-01") },
      { id: "member-2", username: "Alice", joinedAt: new Date("2024-01-02") },
    ],
    messages: [
      {
        id: "msg-1",
        imageUrl: "/placeholder.svg?height=300&width=400",
        downloadUrl: "/placeholder.svg?height=300&width=400",
        viewUrl: "/placeholder.svg?height=300&width=400",
        username: "TestUser",
        timestamp: new Date("2024-01-01T10:00:00Z").toISOString(),
        title: "sample-image.jpg",
        size: 1024000,
      },
      {
        id: "msg-2",
        imageUrl: "/placeholder.svg?height=400&width=600",
        downloadUrl: "/placeholder.svg?height=400&width=600",
        viewUrl: "/placeholder.svg?height=400&width=600",
        username: "Alice",
        timestamp: new Date("2024-01-02T14:30:00Z").toISOString(),
        title: "vacation-photo.png",
        size: 2048000,
      },
    ],
  },
}

export async function POST(request: NextRequest) {
  try {
    const { code, password, username } = await request.json()

    if (!code || !password || !username) {
      return NextResponse.json({ success: false, error: "Code, password, and username are required" }, { status: 400 })
    }

    // Find group by code
    const group = Object.values(groups).find((g: any) => g.code === code)

    if (!group) {
      return NextResponse.json({ success: false, error: "Group not found" }, { status: 404 })
    }

    if (group.password !== password) {
      return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 })
    }

    // Add member if not already in the group
    const existingMember = group.members.find((m: any) => m.username === username)
    if (!existingMember) {
      group.members.push({
        id: uuidv4(),
        username,
        joinedAt: new Date(),
      })
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
