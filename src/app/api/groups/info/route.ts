import { getMongoClient } from "@/lib/mongoConnect";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const uid = searchParams.get("uid")
    if (!uid) {
        return NextResponse.json({ success: false, error: "UID is important!" }, { status: 400 })
    }
    
    const db = await getMongoClient();
    const user = db.collection<any>("info")
    const userInfo = await user.findOne({ _id: new ObjectId(uid) })
    if (!userInfo) {
      return NextResponse.json({ success: false, error: "Invalid UID!" }, { status: 400 })
    }
      
    const group = db.collection<any>("groups")
    const groupInfo = await group.aggregate([
      { $match: { "members.id": uid } } 
    ]).toArray();
    // if (!groupInfo || groupInfo.length === 0) {
    //   return NextResponse.json({ success: false, error: "No groups found for this user!" }, { status: 404 })
    // }
    
    const groups = groupInfo.map((g: any) => ({
      id: g._id.toString(),
      name: g.name,
      code: g.code,
      members: g.members.map((m: any) => ({ id: m.id, name: m.name })),
      createdAt: g.createdAt,
      updatedAt: g.updatedAt
    }));
    return NextResponse.json({ success: true, groups }, { status: 200 });
  } catch (error) {
    console.error("Error fetching group:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}