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

    // Get user's groups
    const groupsCollection = db.collection("groups")
    const userGroups = await groupsCollection
      .find({
        "members.id": userId,
      })
      .toArray()

    // Get user's folders
    const foldersCollection = db.collection("folders")
    const userFolders = await foldersCollection
      .find({
        userId,
        isDeleted: false,
      })
      .toArray()

    // Get user's files (assuming you have a files collection)
    const filesCollection = db.collection("files")
    const userFiles = await filesCollection
      .find({
        userId,
        isDeleted: false,
      })
      .toArray()

    // Calculate statistics
    const totalGroups = userGroups.length
    const totalFolders = userFolders.length
    const totalFiles = userFiles.length

    // Calculate total messages across all groups
    const totalMessages = userGroups.reduce((sum, group) => sum + (group.messages?.length || 0), 0)

    // Calculate storage usage (in bytes)
    const totalStorage = userFiles.reduce((sum, file) => sum + (file.size || 0), 0)

    // Get recent activity
    const recentGroups = userGroups
      .sort((a, b) => new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime())
      .slice(0, 5)
      .map((group) => ({
        id: group._id.toString(),
        name: group.name,
        type: "group",
        lastActivity: group.updatedAt || group.createdAt,
        memberCount: group.members?.length || 0,
        messageCount: group.messages?.length || 0,
      }))

    const recentFolders = userFolders
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5)
      .map((folder) => ({
        id: folder._id.toString(),
        name: folder.name,
        type: "folder",
        lastActivity: folder.updatedAt,
        fileCount: folder.files?.length || 0,
      }))

    // Group activity by date for charts
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date.toISOString().split("T")[0]
    }).reverse()

    const activityData = last30Days.map((date) => {
      const dayStart = new Date(date + "T00:00:00.000Z")
      const dayEnd = new Date(date + "T23:59:59.999Z")

      const groupsCreated = userGroups.filter((group) => {
        const createdAt = new Date(group.createdAt)
        return createdAt >= dayStart && createdAt <= dayEnd
      }).length

      const foldersCreated = userFolders.filter((folder) => {
        const createdAt = new Date(folder.createdAt)
        return createdAt >= dayStart && createdAt <= dayEnd
      }).length

      const filesUploaded = userFiles.filter((file) => {
        const createdAt = new Date(file.createdAt)
        return createdAt >= dayStart && createdAt <= dayEnd
      }).length

      return {
        date,
        groups: groupsCreated,
        folders: foldersCreated,
        files: filesUploaded,
      }
    })

    return NextResponse.json({
      success: true,
      analytics: {
        overview: {
          totalGroups,
          totalFolders,
          totalFiles,
          totalMessages,
          totalStorage,
        },
        recentActivity: [...recentGroups, ...recentFolders]
          .sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime())
          .slice(0, 10),
        activityChart: activityData,
        storageBreakdown: {
          images: userFiles.filter((f) => f.type?.startsWith("image/")).length,
          documents: userFiles.filter((f) => f.type?.includes("document") || f.type?.includes("pdf")).length,
          videos: userFiles.filter((f) => f.type?.startsWith("video/")).length,
          others: userFiles.filter(
            (f) =>
              !f.type?.startsWith("image/") &&
              !f.type?.startsWith("video/") &&
              !f.type?.includes("document") &&
              !f.type?.includes("pdf"),
          ).length,
        },
      },
    })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
