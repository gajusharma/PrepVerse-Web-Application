"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Edit3, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Route } from "next";

const dropdownVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0 }
};

const homeRoute = "/" as Route;
const editRoute = "/profile/edit" as Route;
const libraryRoute = "/profile/library" as Route;

export default function ProfileMenu() {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const displayName = session?.user?.name ?? "Learner";
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!menuRef.current || !(event.target instanceof Node)) {
        return;
      }

      if (!menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handler);
    return () => {
      document.removeEventListener("pointerdown", handler);
    };
  }, []);

  const handleLogout = async () => {
    setOpen(false);
    await signOut({ callbackUrl: homeRoute });
  };

  const handleNavigate = (route: Route) => {
    setOpen(false);
    router.push(route);
  };

  return (
    <div className="relative" ref={menuRef}>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:border-brand hover:text-brand"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-xs font-semibold uppercase tracking-wider text-brand">
          {initials || <User className="h-4 w-4" />}
        </span>
        <span className="hidden sm:inline">{displayName.split(" ")[0]}</span>
      </Button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownVariants}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-56 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl shadow-slate-200/50"
          >
            <div className="mb-2 rounded-xl bg-slate-50 p-3">
              <p className="text-xs font-medium uppercase text-slate-400">Signed in as</p>
              <p className="truncate text-sm font-semibold text-slate-800">{displayName}</p>
            </div>

            <nav className="flex flex-col gap-1">
              <button
                type="button"
                className={menuItemClassName}
                onClick={() => handleNavigate(editRoute)}
              >
                <Edit3 className="h-4 w-4" />
                Edit Profile
              </button>
              <button
                type="button"
                className={menuItemClassName}
                onClick={() => handleNavigate(libraryRoute)}
              >
                <BookOpen className="h-4 w-4" />
                My Library
              </button>
              <button type="button" className={menuItemClassName} onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const menuItemClassName = cn(
  "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-brand/10 hover:text-brand"
);
