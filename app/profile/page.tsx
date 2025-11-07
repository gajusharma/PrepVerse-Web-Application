import { redirect } from "next/navigation";
import { auth } from "@/auth";
import type { Route } from "next";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login" as Route);
  }

  const user = session.user;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-16">
      <section className="rounded-3xl bg-white p-10 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-dark text-3xl font-semibold text-white">
            {(user.name ?? "TP").slice(0, 2).toUpperCase()}
          </div>
          <div className="space-y-2">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                {user.name ?? "ThinkPlus Learner"}
              </h1>
              <p className="text-sm text-slate-500">Member since {new Date().getFullYear()}</p>
            </div>
            <p className="text-sm text-slate-600">
              Welcome back to your personalised ThinkPlus dashboard. Track your enrolled programs,
              follow mentor feedback, and stay on top of upcoming live sessions.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Account details</h2>
          <dl className="mt-3 space-y-2 text-sm text-slate-600">
            <div>
              <dt className="font-medium text-slate-500">Name</dt>
              <dd>{user.name}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Email</dt>
              <dd>{user.email}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Next steps</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>• Explore new CAT crash course launching this week.</li>
            <li>• Book a 1-1 mentorship slot for personalised feedback.</li>
            <li>• Complete your weekly mock test for detailed analytics.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
