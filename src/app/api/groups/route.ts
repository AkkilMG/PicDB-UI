import { GroupDocument, GroupResponse, MemberResponse, MessageResponse } from "@/lib/models"
import { getMongoClient } from "@/lib/mongoConnect"
import { ObjectId } from "mongodb"
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
    const uid = searchParams.get("uid")

    if (!groupId || !code || !uid) {
      return NextResponse.json({ success: false, error: "Group ID, UID and code are required" }, { status: 400 })
    }

    const db = await getMongoClient();
    const groups = db.collection<any>("groups")
    const group = (await groups.aggregate([{
      $match: { _id: new ObjectId(groupId), code, "members.id": uid }
    }]).toArray())[0]
    if (!group) {
      return NextResponse.json({ success: false, error: "Group not found or invalid code" }, { status: 404 })
    }

    // const user = db.collection<any>("info")
    // var temp = await user.findOne({ _id: new ObjectId(uid) })
    // if (!temp) {
    //   return NextResponse.json({ success: false, error: "Invalid UID!" })
    // }

    const groupResponse = {
      id: group._id.toString(),
      name: group.name,
      code: group.code,
      createdAt: group.createdAt.toISOString(),
      memberCount: group.members.length,
      messages: group.messages
    }

    const membersResponse: MemberResponse[] = group.members.map((member: any) => ({
      id: member.id,
      username: member.username,
      joinedAt: member.joinedAt.toISOString(),
    }))

    const messagesResponse: MessageResponse[] = group.messages.map((message: any) => ({
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


// import type { GroupDocument } from "@/lib/models"
// import { getMongoClient } from "@/lib/mongoConnect"
// import { ObjectId } from "mongodb"
// import { type NextRequest, NextResponse } from "next/server"

// // Helper function to generate a 6-character group code
// function generateGroupCode(): string {
//   const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
//   let result = ""
//   for (let i = 0; i < 6; i++) {
//     result += characters.charAt(Math.floor(Math.random() * characters.length))
//   }
//   return result
// }

// // Helper function to ensure unique group code
// async function generateUniqueGroupCode(): Promise<string> {
//   const db = await getMongoClient()
//   const groups = db.collection<GroupDocument>("groups")

//   let code = generateGroupCode()
//   let exists = await groups.findOne({ code })

//   while (exists) {
//     code = generateGroupCode()
//     exists = await groups.findOne({ code })
//   }

//   return code
// }

// export async function POST(request: NextRequest) {
//   try {
//     const { name, code, password, creatorId, creatorName } = await request.json()

//     if (!name || !code || !password || !creatorId || !creatorName) {
//       return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 })
//     }

//     const db = await getMongoClient()
//     const groupsCollection = db.collection("groups")

//     // Check if group code already exists
//     const existingGroup = await groupsCollection.findOne({ code })
//     if (existingGroup) {
//       return NextResponse.json({ success: false, error: "Group code already exists" }, { status: 400 })
//     }

//     const newGroup = {
//       name,
//       code,
//       password,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       members: [
//         {
//           id: creatorId,
//           name: creatorName,
//           role: "admin",
//           joinedAt: new Date(),
//         },
//       ],
//       messages: [],
//     }

//     const result = await groupsCollection.insertOne(newGroup)

//     return NextResponse.json({
//       success: true,
//       group: {
//         id: result.insertedId.toString(),
//         name,
//         code,
//         createdAt: newGroup.createdAt,
//         members: newGroup.members,
//         messages: [],
//         memberCount: 1,
//         messageCount: 0,
//       },
//     })
//   } catch (error) {
//     console.error("Error creating group:", error)
//     return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
//   }
// }

// export async function PUT(request: NextRequest) {
//   try {
//     const { code, password, userId, username } = await request.json()

//     if (!code || !password || !userId || !username) {
//       return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 })
//     }

//     const db = await getMongoClient()
//     const groupsCollection = db.collection("groups")

//     const group = await groupsCollection.findOne({ code, password })
//     if (!group) {
//       return NextResponse.json({ success: false, error: "Invalid group code or password" }, { status: 404 })
//     }

//     // Check if user is already a member
//     const existingMember = group.members?.find((member: any) => member.id === userId)
//     if (existingMember) {
//       return NextResponse.json({
//         success: true,
//         groupId: group._id.toString(),
//         message: "Already a member",
//       })
//     }

//     // Add user to group
//     await groupsCollection.updateOne(
//       { _id: group._id },
//       {
//         $push: {
//           members: {
//             id: userId,
//             name: username,
//             role: "member",
//             joinedAt: new Date(),
//           },
//         },
//         $set: { updatedAt: new Date() },
//       },
//     )

//     return NextResponse.json({
//       success: true,
//       groupId: group._id.toString(),
//       message: "Successfully joined group",
//     })
//   } catch (error) {
//     console.error("Error joining group:", error)
//     return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
//   }
// }

// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url)
//     const groupId = searchParams.get("groupId")
//     const code = searchParams.get("code")

//     if (!groupId || !code) {
//       return NextResponse.json({ success: false, error: "Group ID and code are required" }, { status: 400 })
//     }

//     // Validate ObjectId format
//     if (!ObjectId.isValid(groupId)) {
//       return NextResponse.json({ success: false, error: "Invalid group ID format" }, { status: 400 })
//     }

//     const db = await getMongoClient()
//     const groupsCollection = db.collection<any>("groups")
//     const group = await groupsCollection.findOne({
//       _id: new ObjectId(groupId),
//       code,
//     })

//     if (!group) {
//       return NextResponse.json({ success: false, error: "Group not found" }, { status: 404 })
//     }

//     return NextResponse.json({
//       success: true,
//       group: {
//         id: group._id.toString(),
//         name: group.name,
//         code: group.code,
//         createdAt: group.createdAt,
//         members: group.members || [],
//         messages: group.messages || [],
//         memberCount: group.members?.length || 0,
//         messageCount: group.messages?.length || 0,
//       },
//     })
//   } catch (error) {
//     console.error("Error fetching group:", error)
//     return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
//   }
// }
