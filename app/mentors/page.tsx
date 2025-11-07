import MentorCard from "@/components/cards/mentor-card";
import { getAllMentors } from "@/lib/queries/mentors";
import type { Mentor } from "@/types/mentor";

export const revalidate = 60;

export default async function MentorsPage() {
  const mentors = await getAllMentors();

  return (
    <section className="section-padding bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand">
            Mentors
          </span>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Learn with industry-leading mentors and toppers
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-600 sm:text-base">
            Every mentor goes through a rigorous onboarding to ensure you get
            tactical insights, real exam strategies, and performance feedback on
            every touchpoint.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {mentors.map((mentor: Mentor) => (
            <MentorCard key={mentor.name} mentor={mentor} />
          ))}
        </div>
      </div>
    </section>
  );
}
