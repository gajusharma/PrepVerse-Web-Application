import Image from "next/image";
import Link from "next/link";
import type { Course } from "@/types/course";
import { formatCurrency } from "@/lib/utils";
import { CalendarClock, GraduationCap, LineChart } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: Readonly<CourseCardProps>) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-sm shadow-brand/5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/20"
    >
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
          {course.category}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">{course.title}</h3>
          <p className="text-sm text-slate-600 line-clamp-2">{course.description}</p>
        </div>
        <div className="space-y-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-brand" />
            <span>{course.level} level</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4 text-brand" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <LineChart className="h-4 w-4 text-brand" />
            <span>Instructor: {course.instructor}</span>
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-semibold text-slate-900">
            {formatCurrency(course.price)}
          </span>
          <span className="text-sm font-medium text-brand">View Details →</span>
        </div>
      </div>
    </Link>
  );
}
