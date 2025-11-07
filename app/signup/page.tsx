"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { signupSchema } from "@/lib/validators";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Route } from "next";

const schema = signupSchema;
type SignupFormValues = z.infer<typeof schema>;

export default function SignupPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: SignupFormValues) => {
    try {
      setIsSubmitting(true);

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error ?? "Unable to create account");
        return;
      }

      toast.success("Account created! Please login to continue.");
  router.push("/login" as Route);
    } catch (error) {
      console.error("Signup failed", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-8 px-4 py-16">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Create your account</h1>
        <p className="text-sm text-slate-600">
          Join ThinkPlus to unlock premium courses, live mentorship, and personalised roadmaps.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 rounded-2xl bg-white p-8 shadow-xl shadow-slate-200/40"
      >
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-slate-700">
            Full name
          </label>
          <Input
            id="name"
            placeholder="Aisha Verma"
            {...register("name")}
            autoComplete="name"
          />
          {errors.name && (
            <p className="text-sm text-rose-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            autoComplete="email"
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
            {...register("password")}
            autoComplete="new-password"
          />
          {errors.password && (
            <p className="text-sm text-rose-500">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </Button>

        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link href={"/login" as Route} className="font-semibold text-brand hover:text-brand-dark">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
