import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .min(7, "Phone must be at least 7 digits")
    .max(15, "Phone must be less than 15 digits"),
  message: z.string().min(10, "Please share more details")
});

export const courseSchema = z.object({
  title: z.string().min(4),
  slug: z.string().min(2),
  category: z.string(),
  level: z.string(),
  duration: z.string(),
  price: z.number().nonnegative(),
  image: z.string().url(),
  syllabus: z.array(z.string()),
  instructor: z.string(),
  description: z.string()
});

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be 64 characters or fewer")
});

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required")
});

export const profileUpdateSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(64, "Name must be under 64 characters")
      .optional(),
    email: z
      .string()
      .email("Enter a valid email")
      .optional(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must be 64 characters or fewer")
      .optional()
  })
  .refine(
    (data) => Boolean(data.name ?? data.email ?? data.password),
    "Please update at least one field"
  );
