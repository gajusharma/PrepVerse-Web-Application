# ThinkPlus Education — EdTech Demo

A production-ready Next.js 14 demo for ThinkPlus Education showcasing a polished marketing site, mentor-led program catalogue, testimonials, and fully wired backend APIs with MongoDB.

## ✨ Features

- Responsive marketing website with hero, feature highlights, testimonials, and pricing
- Dynamic courses, mentors, and course detail pages backed by MongoDB via Mongoose models
- Next.js App Router API routes for courses, mentors, and contact intake
- Contact form with react-hook-form + Zod validation and Sonner toast notifications
- Tailwind CSS utility-first styling with custom gradients, reusable UI primitives, and framer-motion animations
- Seed script to populate initial courses and mentors data

## 🧱 Tech Stack

- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + framer-motion
- **UI Toolkit:** Custom components inspired by shadcn/ui + lucide-react icons
- **Forms:** react-hook-form + @hookform/resolvers + zod
- **Backend:** Next.js API routes with Mongoose models
- **Database:** MongoDB (Atlas or self-hosted)
- **Notifications:** Sonner toast system

## 📁 Folder Structure

```
app/
  page.tsx               # Home page with hero, features, courses, testimonials
  courses/
    page.tsx             # Courses catalogue page with filtering
    [slug]/page.tsx      # Course detail page
  mentors/page.tsx       # Mentor listing
  pricing/page.tsx       # Pricing tiers
  contact/page.tsx       # Contact form with validation
  api/                   # App Router API endpoints
components/
  cards/                 # CourseCard, MentorCard, PricingTable
  layout/                # Navbar, Footer
  sections/              # Hero, CoursesExplorer, TestimonialCarousel, ContactForm
  ui/                    # Reusable UI primitives (Button, Input, Textarea)
lib/
  dbConnect.ts           # MongoDB connection helper
  queries/               # Server utilities for courses & mentors
  validators.ts          # zod schemas for forms & payloads
models/                  # Mongoose models (Course, Mentor, Contact)
data/                    # Static testimonial copy
public/images/           # ThinkPlus logo asset
seed.ts                  # Seed script for initial data
```

## ⚙️ Setup

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Environment variables**
   Create `.env.local` with your MongoDB connection string:
   ```bash
   MONGODB_URI="mongodb+srv://<user>:<password>@cluster0.mongodb.net/thinkplus"
   ```
3. **Run database seed (optional)**
   ```bash
   npm run seed
   ```
4. **Start the dev server**
   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000` and explore the site.

## 🚀 Deployment (Vercel)

- Ensure `MONGODB_URI` is configured in the Vercel project settings
- `npm run build` to verify the production build locally
- Deploy via Vercel CLI or GitHub integration

## ✅ API Endpoints

| Method | Route                   | Description                  |
| ------ | ----------------------- | ---------------------------- |
| GET    | `/api/courses`          | List courses with filters    |
| GET    | `/api/courses/[slug]`   | Fetch single course          |
| POST   | `/api/courses`          | Create course (admin usage)  |
| GET    | `/api/mentors`          | List mentors                 |
| POST   | `/api/contact`          | Persist contact form entries |

## 🧪 Testing Ideas

- Validate API routes using VS Code REST client or Thunder Client
- Extend with NextAuth.js for protected dashboards
- Write Playwright smoke tests for primary user flows

## 📽️ Demo & Deployment Links

- **Vercel Deployment:** _Add once deployed_
- **Demo Walkthrough Video:** _Add recording link_

Enjoy building your ThinkPlus Education presentation! ✨
