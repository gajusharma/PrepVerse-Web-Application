import dbConnect from "@/lib/dbConnect";
import CourseModel from "@/models/Course";
import type { Course } from "@/types/course";

type WithMaybeObjectId<T> = T & {
  _id?: string | { toString(): string } | null | undefined;
};

const hasToString = (value: unknown): value is { toString(): string } =>
  typeof value === "object" && value !== null && typeof (value as { toString?: unknown }).toString === "function";

const toCourse = (doc: unknown): Course => {
  const raw = doc as any;
  if (raw._id && typeof raw._id.toString === "function") {
    raw._id = raw._id.toString();
  }
  return raw as Course;
};

export interface CourseFilter {
  category?: string;
  search?: string;
}

export async function getAllCourses(filter: CourseFilter = {}): Promise<Course[]> {
  await dbConnect();
  const query: Record<string, unknown> = {};

  if (filter.category && filter.category !== "all") {
    query.category = filter.category;
  }

  if (filter.search) {
    query.$or = [
      { title: { $regex: filter.search, $options: "i" } },
      { description: { $regex: filter.search, $options: "i" } },
      { category: { $regex: filter.search, $options: "i" } }
    ];
  }

  const courses = await CourseModel.find(query).sort({ createdAt: -1 }).lean();
  return courses.map(toCourse);
}

export async function getFeaturedCourses(limit = 6): Promise<Course[]> {
  await dbConnect();
  const courses = await CourseModel.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  return courses.map(toCourse);
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  await dbConnect();
  const course = await CourseModel.findOne({ slug }).lean();
  return course ? toCourse(course) : null;
}
