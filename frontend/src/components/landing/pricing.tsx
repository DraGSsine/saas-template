"use client";

import React from "react";
import { CheckCircle, MessageSquare, Crown, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const pricingPlans = [
  {
    name: "Basic",
    icon: MessageSquare,
    price: "5",
    description: "Perfect for professionals starting to build their network",
    features: [
      "50 AI-enhanced messages per month",
      "Basic message templates",
      "Real-time enhancement",
      "Standard support",
    ],
  },
  {
    name: "Pro",
    icon: Crown,
    price: "15",
    description: "Ideal for active networkers and job seekers",
    popular: true,
    features: [
      "Unlimited AI-enhanced messages",
      "Advanced message templates",
      "Priority message enhancement",
      "24/7 priority support",
      "Custom response styles",
      "Analytics dashboard",
    ],
  },
  {
    name: "Enterprise",
    icon: Rocket,
    price: "29",
    description: "For teams and businesses scaling their network",
    features: [
      "Everything in Pro plan",
      "Team collaboration features",
      "Custom AI training",
      "API access",
      "Dedicated account manager",
      "Custom integration options",
    ],
  },
];

function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Simple Pricing
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Select the perfect plan for your networking needs and start sending
            enhanced LinkedIn messages today
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-xl transition-all duration-300 ${
                plan.popular ? "md:-translate-y-4" : ""
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white text-sm font-medium">
                  Most Popular
                </div>
              )}

              {/* Content */}
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                {/* Plan Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/[0.06] border border-primary/[0.12]">
                    <plan.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-zinc-400">{plan.description}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-4xl font-bold text-white">
                    ${plan.price}
                  </span>
                  <span className="text-zinc-400">/month</span>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-primary text-white"
                      : "bg-white/[0.03] hover:bg-white/[0.06] text-white border border-white/[0.08]"
                  }`}
                >
                  Get Started
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-16">
          <p className="text-zinc-400">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Pricing;