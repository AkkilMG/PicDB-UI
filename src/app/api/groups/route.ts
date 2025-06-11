import { type NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

// Dummy data storage (in production, use a database)
const groups: Record<
  string,
  {
    id: string
    name: string
    code: string
    password: string
    createdAt: Date
    createdBy: string
    members: { id: string; username: string; joinedAt: Date }[]
    messages: {
      id: string
      imageUrl: string
      downloadUrl: string
      viewUrl: string
      username: string
      timestamp: string
      title?: string
      size?: number
    }[]
  }
> = {
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

// Helper function to generate a 6-character group code
function generateGroupCode(): string {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let result = ""
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  // Ensure code is unique
  if (Object.values(groups).some((group) => group.code === result)) {
    return generateGroupCode()
  }
  return result
}

// Clean up groups without images after 24 hours
setInterval(() => {
  const now = new Date()
  Object.entries(groups).forEach(([id, group]) => {
    const groupAge = now.getTime() - group.createdAt.getTime()
    const hasNoImages = group.messages.length === 0

    // 24 hours in milliseconds = 86400000
    if (hasNoImages && groupAge > 86400000) {
      delete groups[id]
      console.log(`Group ${id} deleted due to inactivity`)
    }
  })
}, 3600000) // Check every hour

export async function POST(request: NextRequest) {
  try {
    const { username, password, groupName } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ success: false, error: "Username and password are required" }, { status: 400 })
    }

    const groupId = uuidv4()
    const groupCode = generateGroupCode()

    groups[groupId] = {
      id: groupId,
      name: groupName || "Image Group",
      code: groupCode,
      password: password,
      createdAt: new Date(),
      createdBy: username,
      members: [{ id: uuidv4(), username, joinedAt: new Date() }],
      messages: [],
    }

    return NextResponse.json({
      success: true,
      groupId,
      groupCode,
      groupName: groupName || "Image Group",
    })
  } catch (error) {
    console.error("Error creating group:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const groupId = searchParams.get("groupId")
  const code = searchParams.get("code")

  if (!groupId || !code) {
    return NextResponse.json({ success: false, error: "Group ID and code are required" }, { status: 400 })
  }

  const group = groups[groupId]

  if (!group || group.code !== code) {
    return NextResponse.json({ success: false, error: "Group not found or invalid code" }, { status: 404 })
  }

  return NextResponse.json({
    success: true,
    group: {
      id: group.id,
      name: group.name,
      code: group.code,
      createdAt: group.createdAt.toISOString(),
      memberCount: group.members.length,
    },
    messages: group.messages,
    members: group.members.map((member) => ({
      id: member.id,
      username: member.username,
      joinedAt: member.joinedAt.toISOString(),
    })),
  })
}
