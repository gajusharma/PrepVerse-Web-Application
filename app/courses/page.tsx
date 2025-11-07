import CoursesExplorer from "@/components/sections/courses-explorer";
import { getAllCourses } from "@/lib/queries/courses";
import type { Course } from "@/types/course";

export const revalidate = 60;

export default async function CoursesPage({
  searchParams
}: Readonly<{
  searchParams: { category?: string; q?: string };
}>) {
  const courses = await getAllCourses({
    category: searchParams?.category,
    search: searchParams?.q
  });
  const categories = Array.from(
    new Set(courses.map((course: Course) => course.category))
  );

  return <CoursesExplorer courses={courses} categories={categories} />;
}
