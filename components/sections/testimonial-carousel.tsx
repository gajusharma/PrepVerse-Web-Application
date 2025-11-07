"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "@/data/testimonials";

const INTERVAL = 6000;

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev: number) => (prev + 1) % testimonials.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const testimonial = testimonials[index];

  return (
    <section className="section-padding bg-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 text-center sm:px-6">
        <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
          Loved by ambitious aspirants nationwide
        </h2>
        <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
          Cohort camaraderie, mentor feedback loops, and actionable analytics—
          ThinkPlus brings the human touch back to online prep.
        </p>

        <div className="relative w-full overflow-hidden rounded-3xl border border-brand/20 bg-white p-8 shadow-xl shadow-brand/10 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-full">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <blockquote className="text-lg font-medium text-slate-900 sm:text-xl">
                “{testimonial.quote}”
              </blockquote>
              <div className="text-sm uppercase tracking-wide text-brand">
                {testimonial.name} · {testimonial.exam}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((item, idx) => (
              <button
                key={item.name}
                onClick={() => setIndex(idx)}
                className={
                  "h-2.5 w-6 rounded-full transition-all " +
                  (idx === index ? "bg-brand" : "bg-slate-200")
                }
                aria-label={`Show testimonial from ${item.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
