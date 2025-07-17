import { getMongoClient } from "@/lib/mongoConnect"
import { ObjectId } from "mongodb"
import { type NextRequest, NextResponse } from "next/server"

interface FolderDocument {
  _id?: ObjectId
  name: string
  userId: string
  createdAt: Date
  updatedAt: Date
  parentId?: string
  files: string[]
  isDeleted: boolean
}

// GET - Fetch all folders for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const parentId = searchParams.get("parentId")

    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 })
    }

    const db = await getMongoClient()
    const folders = db.collection<FolderDocument>("folders")

    const query: any = {
      userId,
      isDeleted: false,
    }

    if (parentId) {
      query.parentId = parentId
    } else {
      query.parentId = { $exists: false }
    }

    const userFolders = await folders.find(query).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({
      success: true,
      folders: userFolders.map((folder) => ({
        id: folder._id?.toString(),
        name: folder.name,
        userId: folder.userId,
        createdAt: folder.createdAt.toISOString(),
        updatedAt: folder.updatedAt.toISOString(),
        parentId: folder.parentId,
        fileCount: folder.files.length,
      })),
    })
  } catch (error) {
    console.error("Error fetching folders:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

// POST - Create a new folder
export async function POST(request: NextRequest) {
  try {
    const { name, userId, parentId } = await request.json()

    if (!name || !userId) {
      return NextResponse.json({ success: false, error: "Name and userId are required" }, { status: 400 })
    }

    const db = await getMongoClient()
    const folders = db.collection<FolderDocument>("folders")

    // Check if folder with same name exists in the same parent
    const existingFolder = await folders.findOne({
      name,
      userId,
      parentId: parentId || { $exists: false },
      isDeleted: false,
    })

    if (existingFolder) {
      return NextResponse.json({ success: false, error: "Folder with this name already exists" }, { status: 400 })
    }

    const newFolder: FolderDocument = {
      name,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      parentId,
      files: [],
      isDeleted: false,
    }

    const result = await folders.insertOne(newFolder)

    return NextResponse.json({
      success: true,
      folder: {
        id: result.insertedId.toString(),
        name,
        userId,
        createdAt: newFolder.createdAt.toISOString(),
        updatedAt: newFolder.updatedAt.toISOString(),
        parentId,
        fileCount: 0,
      },
    })
  } catch (error) {
    console.error("Error creating folder:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

// PUT - Update folder name
export async function PUT(request: NextRequest) {
  try {
    const { folderId, name, userId } = await request.json()

    if (!folderId || !name || !userId) {
      return NextResponse.json({ success: false, error: "Folder ID, name, and userId are required" }, { status: 400 })
    }

    const db = await getMongoClient()
    const folders = db.collection<FolderDocument>("folders")

    const result = await folders.updateOne(
      { _id: new ObjectId(folderId), userId, isDeleted: false },
      {
        $set: {
          name,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Folder not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating folder:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

// DELETE - Delete folder (soft delete)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const folderId = searchParams.get("folderId")
    const userId = searchParams.get("userId")

    if (!folderId || !userId) {
      return NextResponse.json({ success: false, error: "Folder ID and userId are required" }, { status: 400 })
    }

    const db = await getMongoClient()
    const folders = db.collection<FolderDocument>("folders")

    const result = await folders.updateOne(
      { _id: new ObjectId(folderId), userId },
      {
        $set: {
          isDeleted: true,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Folder not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting folder:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
