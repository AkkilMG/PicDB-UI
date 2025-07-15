import { NextRequest, NextResponse } from 'next/server';
import { getMongoClient } from "@/lib/mongoConnect";

export async function POST(req: NextRequest) {
  const { name } = await req.json();

  if (!name) {
    return NextResponse.json(
      { success: false, message: 'Name is required' },
      { status: 400 }
    );
  }

  const db = await getMongoClient();
  const info = await db.collection('info').insertOne({
    name,
    createdAt: new Date(),
  });

  return NextResponse.json({ success: true, id: info.insertedId });
}