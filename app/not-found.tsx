import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-white px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand">
        404
      </p>
      <h1 className="max-w-xl text-3xl font-semibold text-slate-900 sm:text-4xl">
        We couldn&apos;t find that page. Let&apos;s get you back on track.
      </h1>
      <p className="max-w-lg text-sm text-slate-600">
        The page may have moved or the link is outdated. Explore our latest
        mentor-led programs and get back to learning.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/">
          <Button size="lg">Go to Home</Button>
        </Link>
        <Link href="/courses">
          <Button size="lg" variant="secondary">
            Browse Courses
          </Button>
        </Link>
      </div>
    </main>
  );
}
