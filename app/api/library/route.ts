import { NextResponse } from "next/server";
import { auth } from "@/auth";

const mockLibrary = [
  {
    id: "course-1",
    title: "CAT 2025 Accelerator Program",
    image: "/images/courses/cat-accelerator.jpg",
    progress: 0.65,
    mentor: "Ananya Sharma",
    slug: "/courses/cat-2025-accelerator"
  },
  {
    id: "course-2",
    title: "IPMAT Elite Mentorship Path",
    image: "/images/courses/ipmat-elite.jpg",
    progress: 0.38,
    mentor: "Rahul Menon",
    slug: "/courses/ipmat-elite-mentorship"
  },
  {
    id: "course-3",
    title: "CLAT Comprehensive Mastery",
    image: "/images/courses/clat-mastery.jpg",
    progress: 0.9,
    mentor: "Neha Kapoor",
    slug: "/courses/clat-comprehensive-mastery"
  }
];

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ library: mockLibrary });
}
