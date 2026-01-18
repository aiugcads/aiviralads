import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "We cut our ad production costs by 85% and our CTR actually improved. This is a game-changer.",
    author: "Sarah Chen",
    role: "CMO, BeautyBrand Co",
    avatar: "SC",
  },
  {
    quote: "From concept to launch in 2 hours instead of 2 weeks. Our team can finally move at startup speed.",
    author: "Marcus Johnson",
    role: "Growth Lead, TechStart",
    avatar: "MJ",
  },
  {
    quote: "The AI creators look so realistic, our customers can't tell the difference. Incredible technology.",
    author: "Emma Rodriguez",
    role: "Founder, FitLife App",
    avatar: "ER",
  },
];

const logos = [
  "TechCorp", "BeautyBrand", "FitLife", "StyleCo", "FoodieApp", "GadgetHub"
];

export const SocialProof = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-8">
            Trusted by innovative brands
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {logos.map((logo) => (
              <div
                key={logo}
                className="text-xl font-bold text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors"
              >
                {logo}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="glass-card p-6 h-full">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="text-foreground/90 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-sm font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.author}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
