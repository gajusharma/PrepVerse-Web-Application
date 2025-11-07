"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10 bg-hero-gradient opacity-10" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full space-y-8 lg:w-1/2">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center rounded-full border border-brand/30 bg-brand/10 px-4 py-2 text-sm font-medium text-brand"
          >
            New: Mentor-backed personalised learning paths
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
          >
            Crack competitive exams with an elite mentor in your corner.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="max-w-xl text-base text-slate-600 sm:text-lg"
          >
            Join thousands of aspirants learning live with India&apos;s top faculty.
            Structured cohorts, adaptive practice, and actionable analytics keep
            you ahead every mock.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/courses">
              <Button size="lg">Browse Programs</Button>
            </Link>
            <Link href="/mentors">
              <Button variant="secondary" size="lg">
                Meet the Mentors
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="grid grid-cols-2 gap-4 text-sm text-slate-600 sm:grid-cols-4"
          >
            {[
              { label: "Live mentor hours", value: "5k+" },
              { label: "Mock attempts", value: "60k" },
              { label: "Avg rating", value: "4.9/5" },
              { label: "Success stories", value: "2.3k" }
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-lg font-semibold text-slate-900">
                  {stat.value}
                </p>
                <p>{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-brand/20 bg-white p-8 shadow-xl shadow-brand/10"
        >
          <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-brand/20 blur-3xl" />
          <div className="relative space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-wide text-slate-500">
                  Upcoming cohort
                </p>
                <p className="text-xl font-semibold text-slate-900">
                  CAT 2025 Elite
                </p>
              </div>
              <span className="rounded-full bg-brand/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
                Filling fast
              </span>
            </div>
            <div className="grid gap-4 text-sm text-slate-600">
              <div className="rounded-2xl border border-slate-200/60 bg-slate-50/70 p-4">
                <p className="text-xs uppercase text-slate-500">Mentor</p>
                <p className="text-base font-medium text-slate-900">
                  Ananya Sharma (IIM-B)
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/60 bg-slate-50/70 p-4">
                <p className="text-xs uppercase text-slate-500">Starts</p>
                <p className="text-base font-medium text-slate-900">
                  18 November, Live + Hybrid
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/60 bg-slate-50/70 p-4">
                <p className="text-xs uppercase text-slate-500">What you get</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-slate-600">
                  <li>Daily mentor sync (30 mins)</li>
                  <li>Mock test decoding labs</li>
                  <li>Personalised revision sprints</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
