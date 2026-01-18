import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Pay Per Video",
    price: "₹2000",
    period: "/video",
    description: "Professional AI video ads with custom editing",
    features: [
      "Full Custom Editing",
      "2 Free Revisions Included",
      "Additional Revisions: ₹100/change",
      "High-Quality Export",
      "Platform Optimized (9:16)",
    ],
    popular: true,
  },
];

export const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden" id="pricing">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, <span className="text-gradient">Transparent</span> Pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the plan that fits your scale. No hidden fees.
          </p>
        </motion.div>

        <div className="flex justify-center max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative w-full max-w-md ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    <Star className="w-3 h-3" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`glass-card p-8 h-full ${plan.popular ? 'glow-blue border-primary/30' : ''}`}>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-gradient">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${plan.popular ? 'glow-blue' : ''}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  Get Started
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
