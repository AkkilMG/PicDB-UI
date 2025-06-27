import { GroupDocument, GroupResponse, MemberResponse, MessageResponse } from "@/lib/models"
import { getMongoClient } from "@/lib/mongoConnect"
import { type NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"


// Helper function to generate a 6-character group code
function generateGroupCode(): string {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let result = ""
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

// Helper function to ensure unique group code
async function generateUniqueGroupCode(): Promise<string> {
  const db = await getMongoClient();
  const groups = db.collection<GroupDocument>("groups")

  let code = generateGroupCode()
  let exists = await groups.findOne({ code })

  while (exists) {
    code = generateGroupCode()
    exists = await groups.findOne({ code })
  }

  return code
}

export async function POST(request: NextRequest) {
  try {
    const { username, uid, password, groupName } = await request.json()

    if (!username || !password || !uid) {
      return NextResponse.json({ success: false, error: "Username, uid and password are required" }, { status: 400 })
    }
    
    const db = await getMongoClient();
    const groups = db.collection<GroupDocument>("groups")
    const groupCode = await generateUniqueGroupCode()
    const newGroup: GroupDocument = {
      name: groupName || "Image Group",
      code: groupCode,
      password: password,
      createdAt: new Date(),
      createdBy: username,
      members: [{ id: uid, username, joinedAt: new Date() }],
      messages: [],
    }

    const saved = await groups.insertOne(newGroup)

    return NextResponse.json({
      success: true,
      groupId: saved.insertedId.toString(),
      groupCode,
      groupName: groupName || "Image Group",
    })
  } catch (error) {
    console.error("Error creating group:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}


export async function PUT(request: NextRequest) {
  try {
    const { username, uid, password, groupName } = await request.json()

    if (!username || !password || !uid) {
      return NextResponse.json({ success: false, error: "Username, uid and password are required" }, { status: 400 })
    }
    
    const db = await getMongoClient();
    const groups = db.collection<GroupDocument>("groups")
    const groupCode = await generateUniqueGroupCode()
    const newGroup: GroupDocument = {
      name: groupName || "Image Group",
      code: groupCode,
      password: password,
      createdAt: new Date(),
      createdBy: username,
      members: [{ id: uid, username, joinedAt: new Date() }],
      messages: [],
    }

    const saved = await groups.insertOne(newGroup)

    return NextResponse.json({
      success: true,
      groupId: saved.insertedId.toString(),
      groupCode,
      groupName: groupName || "Image Group",
    })
  } catch (error) {
    console.error("Error creating group:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const groupId = searchParams.get("groupId")
    const code = searchParams.get("code")

    if (!groupId || !code) {
      return NextResponse.json({ success: false, error: "Group ID and code are required" }, { status: 400 })
    }

    const db = await getMongoClient();
    const groups = db.collection<GroupDocument>("groups")

    const group = await groups.findOne({ id: groupId, code })

    if (!group) {
      return NextResponse.json({ success: false, error: "Group not found or invalid code" }, { status: 404 })
    }

    const groupResponse: GroupResponse = {
      id: group._id.toString(),
      name: group.name,
      code: group.code,
      createdAt: group.createdAt.toISOString(),
      memberCount: group.members.length,
    }

    const membersResponse: MemberResponse[] = group.members.map((member) => ({
      id: member.id,
      username: member.username,
      joinedAt: member.joinedAt.toISOString(),
    }))

    const messagesResponse: MessageResponse[] = group.messages.map((message) => ({
      id: message.id,
      imageUrl: message.imageUrl,
      downloadUrl: message.downloadUrl,
      viewUrl: message.viewUrl,
      username: message.username,
      timestamp: message.timestamp.toISOString(),
      title: message.title,
      size: message.size,
    }))

    return NextResponse.json({
      success: true,
      group: groupResponse,
      members: membersResponse,
      messages: messagesResponse,
    })
  } catch (error) {
    console.error("Error fetching group:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
