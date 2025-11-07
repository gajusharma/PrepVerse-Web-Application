"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface PricingTier {
  name: string;
  price: string;
  description: string;
  highlight?: boolean;
  features: string[];
}

const tiers: PricingTier[] = [
  {
    name: "Basic",
    price: "₹4,999",
    description: "Self-paced video lessons with mentor Q&A twice a month.",
    features: [
      "Modular recorded curriculum",
      "Monthly doubt resolution",
      "Benchmark mock tests",
      "Community discussions"
    ]
  },
  {
    name: "Pro",
    price: "₹9,999",
    description: "Live mentor sessions, adaptive practice and mock analysis.",
    highlight: true,
    features: [
      "3 live mentor sessions/week",
      "Adaptive practice engine",
      "Unlimited doubt solving",
      "Mock test debrief labs",
      "Personalised revision plan"
    ]
  },
  {
    name: "Elite",
    price: "₹17,499",
    description: "All-access elite mentorship with personal strategist support.",
    features: [
      "1:1 strategist check-ins",
      "Interview masterclasses",
      "Weekly performance sprints",
      "Offline bootcamps",
      "Elite peer mastermind"
    ]
  }
];

export default function PricingTable() {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
          Pick a plan that scales with your ambition
        </h2>
        <p className="mt-3 text-sm text-slate-600 sm:text-base">
          Start with the essentials or go all-in with elite mentorship. Every
          plan comes with structured study plans, analytics, and community.
        </p>
      </div>

      <div className="mx-auto mt-12 grid w-full max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-3">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className={`relative flex h-full flex-col rounded-3xl border border-slate-200/70 p-8 shadow-sm shadow-brand/10 ${
              tier.highlight ? "bg-white ring-2 ring-brand" : "bg-white"
            }`}
          >
            {tier.highlight ? (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-4 py-1 text-xs font-semibold uppercase tracking-wide text-brand-foreground">
                Most Popular
              </span>
            ) : null}

            <div className="space-y-4 text-center">
              <h3 className="text-xl font-semibold text-slate-900">{tier.name}</h3>
              <p className="text-3xl font-bold text-slate-900">{tier.price}</p>
              <p className="text-sm text-slate-600">{tier.description}</p>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              {tier.features.map((feature) => (
                <li key={feature} className="rounded-2xl border border-slate-200/60 bg-slate-50/60 px-4 py-3">
                  {feature}
                </li>
              ))}
            </ul>

            <Button className="mt-8 w-full" size="lg" variant={tier.highlight ? "primary" : "secondary"}>
              Start Learning
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
