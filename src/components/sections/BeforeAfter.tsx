import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X, Check } from "lucide-react";

export const BeforeAfter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(5, Math.min(95, x)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(5, Math.min(95, x)));
  };

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Traditional Ads vs <span className="text-gradient">AI Viral Ads</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Drag to compare the difference
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Comparison slider */}
          <div
            className="relative h-[500px] rounded-2xl overflow-hidden cursor-ew-resize glass-card"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* Before side (Traditional) - Warm/Red Theme for "Pain Points" */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-orange-500/5 to-red-500/5 dark:from-red-950/20 dark:via-orange-950/20 dark:to-red-950/20 p-8 flex flex-col justify-center">
              <div className="max-w-sm">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 mb-4 border border-red-500/20">
                  <X className="w-4 h-4" />
                  <span className="text-sm font-medium">Traditional Ads</span>
                </div>
                <h3 className="text-2xl font-bold mb-6 text-foreground/80">The Old Way</h3>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-red-500/10 text-red-500 mt-0.5">
                      <X className="w-3 h-3" />
                    </div>
                    <span>$5,000+ per influencer campaign</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-red-500/10 text-red-500 mt-0.5">
                      <X className="w-3 h-3" />
                    </div>
                    <span>2-4 weeks production time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-red-500/10 text-red-500 mt-0.5">
                      <X className="w-3 h-3" />
                    </div>
                    <span>Inconsistent quality & results</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-red-500/10 text-red-500 mt-0.5">
                      <X className="w-3 h-3" />
                    </div>
                    <span>Hard to scale quickly</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* After side (AI) - Cool/Neon Theme for "Solution" */}
            <div
              className="absolute inset-0 p-8 flex flex-col justify-center items-end"
              style={{
                clipPath: `inset(0 0 0 ${sliderPosition}%)`,
                background: "linear-gradient(135deg, hsl(var(--neon-blue)/0.25), hsl(var(--neon-purple)/0.25))",
              }}
            >
              <div className="max-w-sm text-right">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary mb-4">
                  <Check className="w-4 h-4" />
                  <span className="text-sm font-medium">AI Viral Ads</span>
                </div>
                <h3 className="text-2xl font-bold mb-6 text-gradient">The AI Way</h3>
                <ul className="space-y-4 text-foreground/80">
                  <li className="flex items-start gap-3 justify-end">
                    <span>Starting at $99/month</span>
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  </li>
                  <li className="flex items-start gap-3 justify-end">
                    <span>Ready in minutes</span>
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  </li>
                  <li className="flex items-start gap-3 justify-end">
                    <span>Consistent high quality</span>
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  </li>
                  <li className="flex items-start gap-3 justify-end">
                    <span>Unlimited scalability</span>
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  </li>
                </ul>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--neon-blue)/0.1)_0%,transparent_70%)]" />
            </div>

            {/* Slider handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-neon-blue to-neon-purple z-10"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center glow-blue">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
