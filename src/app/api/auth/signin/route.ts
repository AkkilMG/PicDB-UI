import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { generateToken } from '@/lib/auth';
import { getMongoClient } from '@/lib/mongoConnect';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: 'Email and password are required' },
      { status: 400 }
    );
  }

  const db = await getMongoClient();
  const user = await db.collection('user').findOne({ email });
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  }

  const token = generateToken(user._id.toString());
  (await cookies()).set('token', token, {
    httpOnly: true, secure: true, sameSite: 'strict', path: '/',
  });

  return NextResponse.json({ success: true });
}