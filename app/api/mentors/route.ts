import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import MentorModel from "@/models/Mentor";

export async function GET() {
  try {
    await dbConnect();
    const mentors = await MentorModel.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ data: mentors });
  } catch (error) {
    console.error("GET /api/mentors error", error);
    return NextResponse.json(
      { message: "Failed to fetch mentors" },
      { status: 500 }
    );
  }
}
