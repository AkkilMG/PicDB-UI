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
  username: string
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

    console.log("Received testimonial:", {
      ...testimonialData,
      submittedAt: new Date().toISOString(),
    })

    const db = await getMongoClient();
    await db.collection('testimonials').insertOne({
      ...testimonialData,
      submittedAt: new Date().toISOString(),
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


export async function PATCH(request: NextRequest) {
  try {
    const updateData = await request.json()
    const id = updateData._id;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid testimonial ID" }, { status: 400 })
    }

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

    const allowedFields = ["reviewed", "hidden"]
    const updates: any = {}

    for (const [key, value] of Object.entries(updateData)) {
      if (allowedFields.includes(key)) {
        updates[key] = value
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 })
    }

    const db = await getMongoClient()
    const result = await db.collection("testimonials").updateOne({ _id: new ObjectId(id) }, { $set: updates })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 })
    }

    const updatedTestimonial = await db.collection("testimonials").findOne({ _id: new ObjectId(id) })

    return NextResponse.json({
      success: true,
      message: "Testimonial updated successfully",
      data: updatedTestimonial,
    })
  } catch (error) {
    console.error("Error updating testimonial:", error)
    return NextResponse.json(
      {
        error: "Failed to update testimonial",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid testimonial ID" }, { status: 400 })
    }

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

    const db = await getMongoClient()
    const result = await db.collection("testimonials").deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Testimonial deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting testimonial:", error)
    return NextResponse.json(
      {
        error: "Failed to delete testimonial",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}


export async function GET(request: NextRequest) {
  try {
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
    const db = await getMongoClient()
    const testimonials = await db.collection("testimonials").find({}).sort({ submittedAt: -1 }).toArray()

    return NextResponse.json({
      success: true,
      data: testimonials,
    })
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch testimonials",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}