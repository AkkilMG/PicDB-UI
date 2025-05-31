import { NextRequest, NextResponse } from 'next/server';
import { getMongoClient } from '@/lib/mongoConnect';
import { ObjectId } from 'mongodb';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { report, contact, link } = await req.json();

  var token: any = (await cookies()).get('token');
  if (!token) {
    console.log("No token found")
    return { success: false, message: "No token found" }
  }
  if (!token.value) {
    return { success: false, message: "No token found" }
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

  if ( !report || !contact || !link ) {
    return NextResponse.json(
      { success: false, message: 'report, contact and link are required.' },
      { status: 400 }
    );
  }

  const db = await getMongoClient();
  await db.collection('reports').insertOne({ report, contact, link, closed: false });
  return NextResponse.json({ success: true });
}


export async function PUT(req: NextRequest) {
  const { _id } = await req.json();
  
  var token: any = (await cookies()).get('token');
  if (!token) {
    console.log("No token found")
    return { success: false, message: "No token found" }
  }
  if (!token.value) {
    return { success: false, message: "No token found" }
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
  const reports = await db.collection('reports').findOne({ _id: new ObjectId(String(_id)) });
  if (!reports) {
    return NextResponse.json(
      { success: false, message: 'Email not found.' },
      { status: 404 }
    );
  }

  await db.collection('reports').updateOne(
    { _id: new ObjectId(String(_id)) },
    { $set: { closed: true } }
  );

  return NextResponse.json({ success: true });
}


export async function GET(req: NextRequest) {
  var token: any = (await cookies()).get('token');
  if (!token) {
    console.log("No token found")
    return { success: false, message: "No token found" }
  }
  if (!token.value) {
    return { success: false, message: "No token found" }
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
  
  const reports = await db.collection('reports').find({ closed: false }).toArray();
  if (!reports || reports.length === 0) {
    return NextResponse.json(
      { success: false, message: 'No emails found.' },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, reports });
}