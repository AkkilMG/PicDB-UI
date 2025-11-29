import { verifyToken } from "@/lib/auth"
import { getMongoClient } from "@/lib/mongoConnect"
import { ObjectId } from "mongodb"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

interface TestimonialData {
  logo: string
  logoColor: string
  rating: number
  quote: string
  name: string
  location: string
  company: string
}

export async function POST(request: NextRequest) {
  try {
    const testimonialData: TestimonialData = await request.json()

    if (!testimonialData.quote || !testimonialData.name || !testimonialData.location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    if (testimonialData.rating < 0 || testimonialData.rating > 5) {
      return NextResponse.json({ error: "Rating must be between 0 and 5" }, { status: 400 })
    }
    const ratingRemainder = (testimonialData.rating * 4) % 1
    if (ratingRemainder !== 0) {
      return NextResponse.json({ error: "Rating must be in 0.25 increments" }, { status: 400 })
    }
    const db = await getMongoClient();
    await db.collection('testimonials').insertOne({
      ...testimonialData,
      submittedAt: new Date().toISOString(),
      mobile: true,
      reviewed: false,
      hidden: false,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Testimonial submitted successfully",
        data: {
          submittedAt: new Date().toISOString(),
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error processing testimonial:", error)
    return NextResponse.json(
      {
        error: "Failed to process testimonial",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
