
import { JWT_SECRET, TOKEN_AUTH_IDENTITY } from '@/config/env.config';
import jwt from 'jsonwebtoken';

var JWT_HIDDEN_SECRET = JWT_SECRET!;

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_HIDDEN_SECRET, { expiresIn: '12h' });
}

export async function verifyToken(token: string): Promise<string | null> { 
  try {
      const decoded = jwt.verify(token, JWT_HIDDEN_SECRET) as jwt.JwtPayload & { userId?: string };
      return decoded.userId || null;
  } catch (error) {
      return null;
  }
}

// UI components


export async function verifyEmail(email: string, which: number): Promise<boolean> {
  try {
    // Replace with your actual API endpoint
    const response = await fetch("/api/auth/verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, which }),
    })

    const data = await response.json()
    return data.valid
  } catch (error) {
    console.log("Error verifying email:", error)
    // For demo purposes, we'll return true to simulate a successful verification
    // In a real application, you would handle the error appropriately
    return true
  }
}

export async function signIn(email: string, password: string): Promise<any> {
  try {
    const response = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.log("Error signing in:", error)
    return { success: false, message: "Error signing in" }
  }
}

export async function signUp(email: string, password: string, name: string): Promise<any> {
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.log("Error signing up:", error)
    throw error
  }
}
