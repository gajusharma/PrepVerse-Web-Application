"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import type { Course } from "@/types/course";
import CourseCard from "@/components/cards/course-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CoursesExplorerProps {
  courses: Course[];
  categories: string[];
}

export default function CoursesExplorer({
  courses,
  categories
}: Readonly<CoursesExplorerProps>) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  const filteredCourses = useMemo<Course[]>(() => {
    return courses.filter((course) => {
      const matchesCategory =
        selectedCategory === "all" || course.category === selectedCategory;
      const matchesSearch = [course.title, course.description, course.category]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [courses, search, selectedCategory]);

  return (
    <section className="section-padding bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200/70 bg-slate-50/70 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-xs">
            <Input
              placeholder="Search for CAT, CLAT, IPMAT..."
              value={search}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setSearch(event.target.value)
              }
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant={selectedCategory === "all" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "primary" : "secondary"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course: Course) => (
              <CourseCard key={course.slug} course={course} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center rounded-3xl border border-dashed border-slate-200 bg-white py-16 text-center">
              <h3 className="text-lg font-semibold text-slate-900">
                No matching courses yet
              </h3>
              <p className="mt-2 max-w-md text-sm text-slate-600">
                Try a different search keyword or explore another category.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
