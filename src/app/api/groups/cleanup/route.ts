import { GroupDocument } from "@/lib/models";
import { getMongoClient } from "@/lib/mongoConnect";
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const db = await getMongoClient();
    const groups = db.collection<GroupDocument>("groups")

    const now = new Date()
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

    // Delete groups that have no messages and were created more than 24 hours ago
    const result = await groups.deleteMany({
      createdAt: { $lt: twentyFourHoursAgo },
      messages: { $size: 0 },
    })

    console.log(`Cleaned up ${result.deletedCount} inactive groups`)

    return NextResponse.json({
      success: true,
      deletedCount: result.deletedCount,
    })
  } catch (error) {
    console.error("Error during cleanup:", error)
    return NextResponse.json({ success: false, error: "Cleanup failed" }, { status: 500 })
  }
}
