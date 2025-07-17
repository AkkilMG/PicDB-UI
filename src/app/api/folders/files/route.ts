import { getMongoClient } from "@/lib/mongoConnect"
import { ObjectId } from "mongodb"
import { type NextRequest, NextResponse } from "next/server"

// POST - Add file to folder
export async function POST(request: NextRequest) {
  try {
    const { folderId, fileId, userId } = await request.json()

    if (!folderId || !fileId || !userId) {
      return NextResponse.json(
        { success: false, error: "Folder ID, file ID, and userId are required" },
        { status: 400 },
      )
    }

    const db = await getMongoClient()
    const folders = db.collection("folders")

    const result = await folders.updateOne(
      { _id: new ObjectId(folderId), userId, isDeleted: false },
      {
        $addToSet: { files: fileId },
        $set: { updatedAt: new Date() },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Folder not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error adding file to folder:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

// DELETE - Remove file from folder
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const folderId = searchParams.get("folderId")
    const fileId = searchParams.get("fileId")
    const userId = searchParams.get("userId")

    if (!folderId || !fileId || !userId) {
      return NextResponse.json(
        { success: false, error: "Folder ID, file ID, and userId are required" },
        { status: 400 },
      )
    }

    const db = await getMongoClient()
    const folders = db.collection("folders")

    const result = await folders.updateOne(
      { _id: new ObjectId(folderId), userId, isDeleted: false },
      {
        $pull: { files: fileId },
        $set: { updatedAt: new Date() },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Folder not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error removing file from folder:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
