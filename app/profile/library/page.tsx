import Link from "next/link";
import { auth } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Route } from "next";

interface LibraryEntry {
  readonly id: string;
  readonly title: string;
  readonly image: string;
  readonly progress: number;
  readonly mentor: string;
  readonly slug: string;
}

function buildCookieHeader() {
  const cookieStore = cookies();
  const cookieArray = cookieStore.getAll().map((cookie) => `${cookie.name}=${cookie.value}`);
  return cookieArray.join("; ");
}

async function getLibrary(): Promise<LibraryEntry[]> {
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/library`, {
    method: "GET",
    headers: {
      cookie: buildCookieHeader()
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Failed to load library");
  }

  const data = (await response.json()) as { library?: LibraryEntry[] };
  return data.library ?? [];
}

function formatProgress(progress: number) {
  return `${Math.round(progress * 100)}%`;
}

export default async function LibraryPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login" as Route);
  }

  const library = await getLibrary();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-900">My Library</h1>
        <p className="mt-2 text-sm text-slate-600">
          Continue from where you left off and track your learning momentum across ThinkPlus programs.
        </p>
      </div>

      {library.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
          <h2 className="text-xl font-semibold text-slate-800">No courses yet</h2>
          <p className="mt-2 text-sm text-slate-600">
            Purchase a course to see it appear here and unlock mentor-led guidance.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {library.map((course) => (
            <Link
              key={course.id}
              href={course.slug as Route}
              className="group rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-brand hover:shadow-xl"
            >
              <div className="relative h-44 w-full overflow-hidden rounded-t-3xl">
                <div
                  className="absolute inset-0 bg-gradient-to-br from-brand/90 via-brand-dark/80 to-slate-900"
                  aria-hidden
                />
                <p className="absolute bottom-3 left-4 text-sm font-semibold uppercase tracking-wide text-white/80">
                  {course.mentor}
                </p>
              </div>
              <div className="space-y-4 p-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{course.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">Guided by {course.mentor}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-400">
                    <span>Progress</span>
                    <span>{formatProgress(course.progress)}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-brand transition-all duration-300"
                      style={{ width: formatProgress(course.progress) }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
