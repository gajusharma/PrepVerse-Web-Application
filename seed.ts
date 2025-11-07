import { config } from "dotenv";
import process from "node:process";
import { resolve } from "node:path";

config({ path: resolve(process.cwd(), ".env.local") });
import dbConnect from "@/lib/dbConnect";
import CourseModel from "@/models/Course";
import MentorModel from "@/models/Mentor";

async function seed() {
  await dbConnect();

  await CourseModel.deleteMany({});
  await MentorModel.deleteMany({});

  await CourseModel.insertMany([
    {
      title: "CAT 2025 Elite Cohort",
      slug: "cat-2025-elite",
      category: "CAT",
      level: "Advanced",
      duration: "8 months",
      price: 17499,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=920&q=80",
      syllabus: [
        "Quant mastery sprints",
        "DI-LR caselet decoding",
        "VARC speed drills",
        "Mock debrief labs",
        "Interview masterclass"
      ],
      instructor: "Ananya Sharma (IIM-B)",
      description:
        "Mentor-led CAT program for 98+ percentilers. Adaptive mocks, analytics, and personal strategist check-ins."
    },
    {
      title: "CLAT 2025 Accelerator",
      slug: "clat-2025-accelerator",
      category: "CLAT",
      level: "Intermediate",
      duration: "6 months",
      price: 12999,
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=920&q=80",
      syllabus: [
        "Legal aptitude bootcamp",
        "GK update briefs",
        "Logical reasoning studio",
        "Reading comprehension labs"
      ],
      instructor: "Rahul Verma (NLSIU)",
      description:
        "Live sessions, daily practice tracker, and mentor accountability pods to scale your CLAT prep."
    },
    {
      title: "IPMAT 2025 Foundation",
      slug: "ipmat-2025-foundation",
      category: "IPMAT",
      level: "Beginner",
      duration: "10 months",
      price: 9999,
      image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=920&q=80",
      syllabus: [
        "Math fundamentals",
        "Logical reasoning prime",
        "Interview readiness",
        "Profile building workshops"
      ],
      instructor: "Meera Joshi (IIM-I)",
      description:
        "Foundational programme with concept classes, application drills, and holistic interview guidance."
    }
  ]);

  await MentorModel.insertMany([
    {
      name: "Ananya Sharma",
      title: "CAT Quant & Strategy Mentor",
      experience: "IIM Bangalore · Ex-McKinsey",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&w=400&h=400&q=80",
      bio: "98.9 percentile mentor helping aspirants decode quant and build high-impact routines.",
      socials: {
        linkedin: "https://www.linkedin.com/in/ananya-sharma",
        twitter: "https://twitter.com/ananya_cat"
      }
    },
    {
      name: "Rahul Verma",
      title: "CLAT Legal Expert",
      experience: "NLSIU Bengaluru · 6 yrs mentoring",
      image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&w=400&h=400&q=80",
      bio: "Demystifying legal aptitude with case studies, mock courts, and daily GK briefs.",
      socials: {
        linkedin: "https://www.linkedin.com/in/rahul-verma"
      }
    },
    {
      name: "Neha Patel",
      title: "IPMAT Strategist",
      experience: "IIM Indore · Ex-Deloitte",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&w=400&h=400&q=80",
      bio: "Helping aspirants build confidence across math, reasoning, and personal interviews.",
      socials: {
        linkedin: "https://www.linkedin.com/in/neha-patel"
      }
    }
  ]);

  console.log("✅ Seed data inserted successfully");
}

// eslint-disable-next-line unicorn/prefer-top-level-await
void (async () => {
  try {
    await seed();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
