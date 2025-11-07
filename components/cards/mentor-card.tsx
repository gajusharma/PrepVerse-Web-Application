import Image from "next/image";
import type { Mentor } from "@/types/mentor";
import { Linkedin, Twitter } from "lucide-react";

interface MentorCardProps {
  mentor: Mentor;
}

export default function MentorCard({ mentor }: Readonly<MentorCardProps>) {
  return (
    <div className="group flex flex-col rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm shadow-brand/10 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/20">
      <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-brand/40">
        <Image
          src={mentor.image}
          alt={mentor.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="128px"
        />
      </div>
      <div className="mt-6 space-y-2 text-center">
        <h3 className="text-lg font-semibold text-slate-900">{mentor.name}</h3>
        <p className="text-sm font-medium uppercase tracking-wide text-brand">
          {mentor.title}
        </p>
        <p className="text-xs text-slate-500">{mentor.experience}</p>
        <p className="text-sm text-slate-600">{mentor.bio}</p>
      </div>
      <div className="mt-6 flex items-center justify-center gap-3">
        {mentor.socials.linkedin ? (
          <a
            href={mentor.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-brand hover:text-brand"
            aria-label={`${mentor.name} on LinkedIn`}
          >
            <Linkedin className="h-4 w-4" />
          </a>
        ) : null}
        {mentor.socials.twitter ? (
          <a
            href={mentor.socials.twitter}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-brand hover:text-brand"
            aria-label={`${mentor.name} on Twitter`}
          >
            <Twitter className="h-4 w-4" />
          </a>
        ) : null}
      </div>
    </div>
  );
}
