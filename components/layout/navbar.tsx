"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";
import ProfileMenu from "@/components/ProfileMenu";
import type { Route } from "next";

const links: Array<{ href: Route; label: string }> = [
  { href: "/courses" as Route, label: "Courses" },
  { href: "/mentors" as Route, label: "Mentors" },
  { href: "/pricing" as Route, label: "Pricing" },
  { href: "/contact" as Route, label: "Contact" }
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isAuthenticated = session?.user && status === "authenticated";
  const greetingName = session?.user?.name?.split(" ")[0] ?? "";
  const loginRoute = "/login" as Route;
  const signupRoute = "/signup" as Route;
  const editRoute = "/profile/edit" as Route;
  const libraryRoute = "/profile/library" as Route;

  const handleToggle = () => setOpen((prev: boolean) => !prev);
  const handleClose = () => setOpen(false);

  const handleMobileLogout = async () => {
    setOpen(false);
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <Image
            src="/images/thinkplus-logo.svg"
            alt="ThinkPlus logo"
            width={36}
            height={36}
          />
          <span className="text-lg uppercase tracking-wide">ThinkPlus</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname.startsWith(link.href)
                  ? "text-brand"
                  : "text-slate-500 hover:text-slate-900"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {isMounted && isAuthenticated ? (
            <>
              <span className="text-sm font-medium text-slate-500">
                Hello{greetingName ? `, ${greetingName}` : ""}
              </span>
              <ProfileMenu />
            </>
          ) : (
            <>
              <Link href={loginRoute}>
                <Button variant="secondary" size="sm">
                  Login
                </Button>
              </Link>
              <Link href={signupRoute}>
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="inline-flex items-center justify-center rounded-xl p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          onClick={handleToggle}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-4">
            {links.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleClose}
                  className={cn(
                    "rounded-xl px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-brand/10 text-brand"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            {isMounted && isAuthenticated ? (
              <div className="mt-3 space-y-2 rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-700">
                  Hello{greetingName ? `, ${greetingName}` : ""}
                </p>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => {
                    handleClose();
                    router.push(editRoute);
                  }}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => {
                    handleClose();
                    router.push(libraryRoute);
                  }}
                >
                  My Library
                </Button>
                <Button className="w-full" onClick={handleMobileLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="mt-3 grid gap-2">
                <Link href={loginRoute} onClick={handleClose}>
                  <Button variant="secondary" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href={signupRoute} onClick={handleClose}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
