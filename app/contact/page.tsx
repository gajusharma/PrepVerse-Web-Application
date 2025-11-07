import ContactForm from "@/components/sections/contact-form";
import { Mail, Phone, Video } from "lucide-react";

export const metadata = {
  title: "Contact | ThinkPlus Education",
  description:
    "Reach out to ThinkPlus mentors for personalised exam strategies, enrolment queries, and partnership opportunities."
};

export default function ContactPage() {
  return (
    <section className="section-padding bg-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:flex-row">
        <div className="w-full space-y-6 lg:w-2/5">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">
            Talk to us
          </span>
          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            Ready to fast-track your prep? Our mentors are a message away.
          </h1>
          <p className="text-sm text-slate-600 sm:text-base">
            Share your preparation plans and our team will call you back within
            24 hours. We&apos;ll help you map the right cohort, mentor, and study
            sprint for your goals.
          </p>

          <div className="grid gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white px-4 py-3">
              <Phone className="h-4 w-4 text-brand" /> +91 98765 43210
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white px-4 py-3">
              <Mail className="h-4 w-4 text-brand" /> hello@thinkplus.in
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white px-4 py-3">
              <Video className="h-4 w-4 text-brand" /> Book a discovery call
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/5">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
