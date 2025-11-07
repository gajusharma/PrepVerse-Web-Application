import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import CourseModel from "@/models/Course";

interface RouteParams {
  params: { slug: string };
}

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    await dbConnect();
    const course = await CourseModel.findOne({ slug: params.slug }).lean();
    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }
    return NextResponse.json({ data: course });
  } catch (error) {
    console.error(`GET /api/courses/${params.slug} error`, error);
    return NextResponse.json(
      { message: "Failed to fetch course" },
      { status: 500 }
    );
  }
}
