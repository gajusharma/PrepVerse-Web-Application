"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/lib/validators";
import type { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: ""
    }
  });

  const onSubmit = handleSubmit(async (values: ContactFormValues) => {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message ?? "Failed to submit message");
      }

      toast.success("Thanks! Our mentors will reach out within 24 hours.");
      reset();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-3xl border border-slate-200/70 bg-white p-8 shadow-lg shadow-brand/10"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700" htmlFor="name">
            Name
          </label>
          <Input id="name" placeholder="Your name" {...register("name")} />
          {errors.name ? (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            {...register("email")}
          />
          {errors.email ? (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700" htmlFor="phone">
            Phone
          </label>
          <Input id="phone" placeholder="+91 98765 43210" {...register("phone")} />
          {errors.phone ? (
            <p className="text-xs text-red-500">{errors.phone.message}</p>
          ) : null}
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold text-slate-700" htmlFor="message">
            How can we help?
          </label>
          <Textarea
            id="message"
            rows={5}
            placeholder="Share your prep goals, preferred program, or questions."
            {...register("message")}
          />
          {errors.message ? (
            <p className="text-xs text-red-500">{errors.message.message}</p>
          ) : null}
        </div>
      </div>
      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
        {isSubmitting ? "Sending..." : "Request a Call Back"}
      </Button>
    </form>
  );
}
