"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Route } from "next";

const REMINDER_INTERVAL_MS = 15_000;

export default function AuthReminder() {
  const { status } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  type TimerHandle = ReturnType<typeof globalThis.setTimeout>;
  const intervalRef = useRef<TimerHandle | null>(null);
  const timeoutRef = useRef<TimerHandle | null>(null);

  useEffect(() => {
    if (status !== "unauthenticated") {
      setIsOpen(false);

      if (intervalRef.current) {
  globalThis.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      if (timeoutRef.current) {
  globalThis.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      return;
    }

    timeoutRef.current = globalThis.setTimeout(() => {
      setIsOpen(true);
    }, REMINDER_INTERVAL_MS);

    intervalRef.current = globalThis.setInterval(() => {
      setIsOpen(true);
    }, REMINDER_INTERVAL_MS);

    return () => {
      if (intervalRef.current) {
  globalThis.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      if (timeoutRef.current) {
  globalThis.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [status]);

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleSignUp = () => {
    setIsOpen(false);
  router.push("/signup" as Route);
  };

  if (status !== "unauthenticated") {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <button
              type="button"
              onClick={closePopup}
              className="absolute right-4 top-4 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              aria-label="Close reminder"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="space-y-4 pt-2 text-center">
              <h3 className="text-lg font-semibold text-slate-900">
                Join ThinkPlus today!
              </h3>
              <p className="text-sm text-slate-600">
                Sign up now to access all premium courses and personalised mentor
                support.
              </p>
              <Button type="button" onClick={handleSignUp} className="w-full">
                Sign Up
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
