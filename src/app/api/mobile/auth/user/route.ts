import { NextRequest, NextResponse } from 'next/server';
import { getMongoClient } from "@/lib/mongoConnect";

export async function POST(req: NextRequest) {
  const { name, phone } = await req.json();

  if (!name) {
    return NextResponse.json(
      { success: false, message: 'Name is required' },
      { status: 400 }
    );
  }

  const db = await getMongoClient();

  let data: any = {
    name,
    mobile: true,
    createdAt: new Date(),
  };
  if (phone) data = { ...data, phone };
  const info = await db.collection('info').insertOne(data);

  return NextResponse.json({ success: true, id: info.insertedId });
}