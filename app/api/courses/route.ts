import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import CourseModel from "@/models/Course";
import { courseSchema } from "@/lib/validators";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const q = searchParams.get("q");

    await dbConnect();
    const query: Record<string, unknown> = {};

    if (category && category !== "all") {
      query.category = category;
    }

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } }
      ];
    }

    const courses = await CourseModel.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ data: courses });
  } catch (error) {
    console.error("GET /api/courses error", error);
    return NextResponse.json(
      { message: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = courseSchema.parse(body);

    await dbConnect();
    const created = await CourseModel.create(parsed);
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    console.error("POST /api/courses error", error);
    const message =
      error instanceof Error ? error.message : "Unable to create course";
    return NextResponse.json({ message }, { status: 400 });
  }
}
