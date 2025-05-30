import { type NextRequest, NextResponse } from "next/server"
import { getMongoClient } from "@/lib/mongoConnect";

export async function POST(request: NextRequest) {
  try {
    const { email, which } = await request.json()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const isValidFormat = email && typeof email === "string" && email.includes("@") && email.includes(".")
    if (!isValidFormat) {
      return NextResponse.json({
        valid: false,
        message: "Invalid email format",
      })
    }
    
    const db = await getMongoClient();
    const emailDB = await db.collection('user').findOne({ email });
    
    if (!emailDB && which === 0) {
      return NextResponse.json({
        valid: false,
        message: "Please signup before signing in.",
      })
    } else if (emailDB && which === 1) {
      return NextResponse.json({
        valid: false,
        message: "Email already exists.",
      })
    }
    
    return NextResponse.json({
      valid: true,
      message: "Email is valid"
    })
  } catch (error) {
    console.error("Error verifying email:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
