import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Upload, Sparkles, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Submit Your Vision",
    description: "Fill out our simple form with your product details, website URL, and any specific requirements.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "We Create the Magic",
    description: "Our team of expert creators produces high-converting UGC ads tailored to your brand.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Review & Launch",
    description: "Receive your ads, request any revisions, and launch them on TikTok, Reels, and Shorts.",
  },
];

export const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden" id="how-it-works">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three simple steps to viral-ready ads
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent hidden md:block" />

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="glass-card p-8 text-center h-full group hover:glow-blue transition-all duration-500">
                    {/* Step number */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground z-10">
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-6 mt-4 group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>

                    <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>

                  {/* Arrow */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-24 -right-4 text-primary">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
