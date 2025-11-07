import HeroSection from "@/components/sections/hero-section";
import TestimonialCarousel from "@/components/sections/testimonial-carousel";
import PricingTable from "@/components/cards/pricing-table";
import CourseCard from "@/components/cards/course-card";
import { getFeaturedCourses } from "@/lib/queries/courses";
import Link from "next/link";
import { Lightbulb, LineChart, Users } from "lucide-react";

export default async function HomePage() {
  const courses = await getFeaturedCourses(6);

  return (
    <>
      <HeroSection />
      <section className="section-padding bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6">
          <div className="space-y-3 text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand">
              Why ThinkPlus
            </span>
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              Built by mentors who&apos;ve been in your shoes
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-slate-600 sm:text-base">
              Smart prep journeys that blend live mentorship, adaptive practice,
              and community accountability—crafted by toppers for future toppers.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[{
              icon: Lightbulb,
              title: "Adaptive Learning Paths",
              description:
                "AI-assisted learning plan that evolves with every mock and feedback session."
            },
            {
              icon: Users,
              title: "Mentor-Led Accountability",
              description:
                "Daily syncs, weekend masterminds, and never-go-ghost mentorship culture."
            },
            {
              icon: LineChart,
              title: "Deep Analytics",
              description:
                "Pinpoint your blind spots with sectional insights and behaviour analytics."
            }].map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-slate-200/70 bg-slate-50/70 p-8 shadow-sm shadow-brand/10"
              >
                <feature.icon className="mb-4 h-10 w-10 text-brand" />
                <h3 className="text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand">
                Popular Courses
              </span>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
                What aspirants are loving right now
              </h2>
            </div>
            <Link
              href="/courses"
              className="text-sm font-semibold text-brand transition hover:text-brand-dark"
            >
              View all programs →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </div>
      </section>

      <TestimonialCarousel />
      <PricingTable />
    </>
  );
}
