import { auth } from "@/auth";
import EditProfileForm from "./EditProfileForm";
import { redirect } from "next/navigation";
import type { Route } from "next";

export default async function EditProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login" as Route);
  }

  const defaultName = session.user.name ?? "";
  const defaultEmail = session.user.email ?? "";

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Edit profile</h1>
        <p className="text-sm text-slate-600">
          Update your personal details and keep your ThinkPlus account up to date.
        </p>
      </div>

      <div className="mt-8">
        <EditProfileForm defaultName={defaultName} defaultEmail={defaultEmail} />
      </div>
    </div>
  );
}
