"use client";

import { Sparkles, Zap, MessageSquare } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Smart Response",
    description:
      "Our AI analyzes incoming messages and suggests professional responses that maintain your voice.",
  },
  {
    icon: Sparkles,
    title: "Message Enhancement",
    description:
      "Transform your draft messages into polished, professional communications with one click.",
  },
  {
    icon: Zap,
    title: "Real-time Polish",
    description:
      "Get instant improvements as you type, ensuring your messages are always professional and impactful.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Everything you need to create professional LinkedIn messages that get results
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-xl p-6 bg-white/[0.02] border border-white/[0.05] hover:border-primary/20 hover:bg-primary/[0.02] transition-colors"
            >
              <div className="relative">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-blue-400" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Number */}
                <span className="absolute top-1 right-1 text-sm font-medium text-zinc-600">
                  0{index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Details */}
        <div className="mt-16 p-6 rounded-xl bg-white/[0.02] border border-white/[0.05]">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: "Messages Enhanced", value: "1M+" },
              { label: "Success Rate", value: "98%" },
              { label: "Active Users", value: "50K+" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 rounded-lg bg-white/[0.02]"
              >
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-zinc-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;