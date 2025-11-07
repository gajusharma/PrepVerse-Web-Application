"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { loginSchema } from "@/lib/validators";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import type { Route } from "next";

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setIsSubmitting(true);
      const result = await signIn("credentials", {
        ...values,
        redirect: false
      });

      if (result?.error) {
        toast.error("Invalid credentials. Please try again.");
        return;
      }

      toast.success("Login successful!");
      router.push("/" as Route);
      router.refresh();
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-8 px-4 py-16">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>
        <p className="text-sm text-slate-600">
          Log into your ThinkPlus dashboard to continue your learning journey.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 rounded-2xl bg-white p-8 shadow-xl shadow-slate-200/40"
      >
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-rose-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-slate-700">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-rose-500">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Log In"}
        </Button>

        <p className="text-center text-sm text-slate-600">
          New to ThinkPlus?{" "}
          <Link href={"/signup" as Route} className="font-semibold text-brand hover:text-brand-dark">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
