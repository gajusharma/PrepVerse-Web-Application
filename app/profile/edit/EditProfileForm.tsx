"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .max(64, "Name must be under 64 characters")
    .optional()
    .refine((value) => !value || value.length >= 2, {
      message: "Name must be at least 2 characters"
    }),
  email: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || z.string().email().safeParse(value).success, {
      message: "Enter a valid email"
    }),
  password: z
    .string()
    .optional()
    .refine((value) => !value || value.length >= 8, {
      message: "Password must be at least 8 characters"
    })
    .refine((value) => !value || value.length <= 64, {
      message: "Password must be 64 characters or fewer"
    })
});

type FormValues = z.infer<typeof formSchema>;

interface EditProfileFormProps {
  readonly defaultName: string;
  readonly defaultEmail: string;
}

export default function EditProfileForm({ defaultName, defaultEmail }: EditProfileFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultName,
      email: defaultEmail,
      password: ""
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: FormValues) => {
    const payload: Record<string, string> = {};
    const trimmedName = values.name?.trim();
    const trimmedEmail = values.email?.trim();

    if (trimmedName && trimmedName !== defaultName) {
      payload.name = trimmedName;
    }

    if (trimmedEmail && trimmedEmail !== defaultEmail) {
      payload.email = trimmedEmail;
    }

    if (values.password) {
      payload.password = values.password;
    }

    if (Object.keys(payload).length === 0) {
      toast.info("No changes to update");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error ?? "Failed to update profile");
        return;
      }

      toast.success("Profile updated successfully!");
      reset({
        name: trimmedName ?? defaultName,
        email: trimmedEmail ?? defaultEmail,
        password: ""
      });
      router.refresh();
    } catch (error) {
      console.error("Profile update failed", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50"
    >
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-semibold text-slate-600">
          Full name
        </label>
        <Input id="name" placeholder="Your full name" {...register("name")} />
        {errors.name && <p className="text-sm text-rose-500">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-semibold text-slate-600">
          Email address
        </label>
        <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
        {errors.email && <p className="text-sm text-rose-500">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-semibold text-slate-600">
          New password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          {...register("password")}
        />
        <p className="text-xs text-slate-400">Leave blank to keep your current password.</p>
        {errors.password && <p className="text-sm text-rose-500">{errors.password.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Saving changes..." : "Save changes"}
      </Button>
    </form>
  );
}
