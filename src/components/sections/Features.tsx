import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Users,
  UserX,
  Camera,
  Clock,
  DollarSign,
  BarChart3,
  Instagram,
  Layers
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "AI UGC Creators",
    description: "Ultra-realistic AI humans that look like real influencers",
  },
  {
    icon: UserX,
    title: "No Influencers Needed",
    description: "Skip the negotiations, contracts, and scheduling hassles",
  },
  {
    icon: Camera,
    title: "No Camera or Studio",
    description: "Professional quality without expensive equipment",
  },
  {
    icon: Clock,
    title: "24-Hour Delivery",
    description: "Receive your fully edited ads within one day",
  },
  {
    icon: DollarSign,
    title: "Lower Cost Than Shoots",
    description: "Fraction of the price of traditional productions",
  },
  {
    icon: BarChart3,
    title: "Scalable for Ads",
    description: "Generate unlimited variations for A/B testing",
  },
  {
    icon: Instagram,
    title: "Custom Aspect Ratios",
    description: "Optimized for 9:16 (Reels/TikTok) & 16:9 (YouTube)",
  },
  {
    icon: Layers,
    title: "Consistent Quality",
    description: "Every ad meets the same high standard",
  },
];

export const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/10 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to <span className="text-gradient">Scale Ads</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful features designed for modern marketers
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card p-6 h-full hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
