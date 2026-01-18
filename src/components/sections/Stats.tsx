import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Zap, TrendingDown, TrendingUp } from "lucide-react";

const stats = [
  {
    value: 10,
    suffix: "x",
    label: "Faster Production",
    description: "Create ads in minutes, not weeks",
    icon: Zap,
    color: "text-neon-blue",
  },
  {
    value: 90,
    suffix: "%",
    label: "Cost Reduction",
    description: "Fraction of traditional ad costs",
    icon: TrendingDown,
    color: "text-green-400",
  },
  {
    value: 3,
    suffix: "x",
    label: "Higher Engagement",
    description: "AI-optimized for conversions",
    icon: TrendingUp,
    color: "text-accent",
  },
];

const AnimatedCounter = ({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span className="text-5xl md:text-6xl font-bold text-gradient">
      {count}{suffix}
    </span>
  );
};

export const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--neon-purple)/0.08)_0%,transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Results That <span className="text-gradient">Speak</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real performance metrics from AI-generated campaigns
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="glass-card p-8 text-center group hover:glow-purple transition-all duration-500"
            >
              <div className={`inline-flex p-3 rounded-xl bg-secondary mb-6 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              
              <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={isInView} />
              
              <h3 className="text-xl font-semibold mt-4 mb-2">{stat.label}</h3>
              <p className="text-muted-foreground text-sm">{stat.description}</p>
              
              {/* Progress bar */}
              <div className="mt-6 h-1 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${stat.value > 10 ? stat.value : stat.value * 10}%` } : {}}
                  transition={{ duration: 1.5, delay: 0.5 + index * 0.15 }}
                  className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
