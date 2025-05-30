import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { getMongoClient } from "@/lib/mongoConnect";
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const tokenCookie = (await cookies()).get('token');
  if (!tokenCookie) return NextResponse.json(
      { success: false, message: 'User need to be logged in!' },
      { status: 401 }
    );;
    
  const userId = await verifyToken(tokenCookie.value);
  if (!userId) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const { email, password, name } = await req.json();

  if (!email || !password || !name) {
    return NextResponse.json(
      { success: false, message: 'Name, Email and password are required' },
      { status: 400 }
    );
  }

  const db = await getMongoClient();
  const existingUser = await db.collection('user').findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { success: false, message: 'User already exists' },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.collection('user').insertOne({
    name, email, password: hashedPassword,
    createdAt: new Date(),
  });

  return NextResponse.json({ success: true });
}