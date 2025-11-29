import { NextRequest, NextResponse } from 'next/server';
import { getMongoClient } from '@/lib/mongoConnect';
import { ObjectId } from 'mongodb';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { title, body } = await req.json();
  var token: any = (await cookies()).get('token');
  if (!token) {
    console.log("No token found")
    return NextResponse.json({ success: false, message: "No token found" })
  }
  if (!token.value) {
    return NextResponse.json({ success: false, message: "No token found" })
  }
  var authorization = token.value;
  if (!authorization) {
    return NextResponse.json(
      { success: false, message: 'authorization is required.' },
      { status: 400 }
    );
  }

  const verify = await verifyToken(authorization);
  if (!verify) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  if ( !title || !body ) {
    return NextResponse.json(
      { success: false, message: 'report, contact and link are required.' },
      { status: 400 }
    );
  }

  const db = await getMongoClient();
  await db.collection('mobile_notifications').insertOne({ title, body, deleted: false });
  return NextResponse.json({ success: true });
}


export async function DELETE(req: NextRequest) {
  const { _id } = await req.json();
  var token: any = (await cookies()).get('token');
  if (!token) {
    console.log("No token found")
    return NextResponse.json({ success: false, message: "No token found" })
  }
  if (!token.value) {
    return NextResponse.json({ success: false, message: "No token found" })
  }
  var authorization = token.value;
  if (!authorization) {
    return NextResponse.json(
      { success: false, message: 'authorization is required.' },
      { status: 400 }
    );
  }

  const verify = await verifyToken(authorization);
  if (!verify) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const db = await getMongoClient();
  const notification = await db.collection('mobile_notifications').findOne({ _id: new ObjectId(String(_id)) });
  if (!notification) {
    return NextResponse.json(
      { success: false, message: 'Email not found.' },
      { status: 404 }
    );
  }

  await db.collection('mobile_notifications').updateOne(
    { _id: new ObjectId(String(_id)) },
    { $set: { deleted: true } }
  );

  return NextResponse.json({ success: true });
}


export async function GET(req: NextRequest) {
  const db = await getMongoClient();
  
  const notifications = await db.collection('mobile_notifications').find({ deleted: false }).toArray();
  if (!notifications || notifications.length === 0) {
    return NextResponse.json(
      { success: false, message: 'No notidication found.' },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, notifications });
}