import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCourseBySlug } from "@/lib/queries/courses";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CoursePageProps {
  params: { slug: string };
}

export const revalidate = 60;

export async function generateMetadata({
  params
}: Readonly<CoursePageProps>) {
  const course = await getCourseBySlug(params.slug);
  if (!course) {
    return {
      title: "Course not found",
      description: "The requested course could not be found"
    };
  }
  return {
    title: `${course.title} | ThinkPlus Education`,
    description: course.description
  };
}

export default async function CourseDetailPage({
  params
}: Readonly<CoursePageProps>) {
  const course = await getCourseBySlug(params.slug);
  if (!course) {
    notFound();
  }

  return (
    <div className="section-padding">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:flex-row">
        <div className="relative h-80 w-full overflow-hidden rounded-3xl border border-slate-200/80 shadow-lg shadow-brand/10 lg:h-auto lg:w-1/2">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="flex w-full flex-col gap-8 lg:w-1/2">
          <div className="space-y-4">
            <span className="inline-flex items-center rounded-full bg-brand/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand">
              {course.category}
            </span>
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              {course.title}
            </h1>
            <p className="text-base text-slate-600">{course.description}</p>
            <div className="grid grid-cols-2 gap-4 rounded-3xl border border-slate-200/70 bg-slate-50/80 p-6 text-sm text-slate-600">
              <div>
                <p className="text-xs uppercase text-slate-500">Level</p>
                <p className="text-base font-medium text-slate-900">
                  {course.level}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-500">Duration</p>
                <p className="text-base font-medium text-slate-900">
                  {course.duration}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-xs uppercase text-slate-500">Instructor</p>
                <p className="text-base font-medium text-slate-900">
                  {course.instructor}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">What you&apos;ll learn</h2>
            <ul className="grid gap-3 text-sm text-slate-600">
              {course.syllabus.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-slate-200/70 bg-white px-4 py-3"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 rounded-3xl border border-brand/30 bg-brand/5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase text-brand">Program fee</p>
                <p className="text-2xl font-bold text-slate-900">
                  {formatCurrency(course.price)}
                </p>
              </div>
              <Button size="lg">Enroll Now</Button>
            </div>
            <p className="text-xs text-slate-500">
              Includes live mentor hours, adaptive practice, mock analysis, and
              peer community access. EMI options available.
            </p>
            <Link
              href="/contact"
              className="text-sm font-semibold text-brand hover:text-brand-dark"
            >
              Talk to a course advisor →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
