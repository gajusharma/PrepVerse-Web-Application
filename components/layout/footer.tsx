import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const footerLinks = [
  {
    title: "Company",
    items: [
      { href: "/about", label: "About" },
      { href: "/careers", label: "Careers" },
      { href: "/blog", label: "Blog" }
    ]
  },
  {
    title: "Programs",
    items: [
      { href: "/courses?category=CAT", label: "CAT" },
      { href: "/courses?category=CLAT", label: "CLAT" },
      { href: "/courses?category=IPMAT", label: "IPMAT" }
    ]
  },
  {
    title: "Support",
    items: [
      { href: "/pricing", label: "Pricing" },
      { href: "/contact", label: "Contact" },
      { href: "/faq", label: "FAQ" }
    ]
  }
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="col-span-2">
          <h3 className="text-lg font-semibold text-slate-900">
            ThinkPlus Education
          </h3>
          <p className="mt-3 text-sm text-slate-600">
            Mentor-led live classes, adaptive practice, and personalised guidance
            to crack your next competitive exam with confidence.
          </p>
          <div className="mt-6 space-y-2 text-sm text-slate-600">
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-brand" /> +91 98765 43210
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand" /> hello@thinkplus.in
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand" /> Bengaluru, India
            </p>
          </div>
        </div>

        {footerLinks.map((group) => (
          <div key={group.title}>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              {group.title}
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-600 transition hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200/70 bg-slate-50 py-6">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-slate-500 sm:flex-row sm:px-6">
          <span>© {new Date().getFullYear()} ThinkPlus Education. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
