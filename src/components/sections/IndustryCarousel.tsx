import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const industries = [
  {
    name: "Skincare & Beauty",
    gradient: "from-pink-500 to-rose-500",
    icon: "💄",
    description: "Glow-up content that converts",
  },
  {
    name: "Tech & Gadgets",
    gradient: "from-blue-500 to-cyan-500",
    icon: "📱",
    description: "Unboxing & demo style ads",
  },
  {
    name: "Fashion & Apparel",
    gradient: "from-purple-500 to-indigo-500",
    icon: "👗",
    description: "Outfit reveals & try-ons",
  },
  {
    name: "Fitness & Wellness",
    gradient: "from-green-500 to-emerald-500",
    icon: "💪",
    description: "Transformation content",
  },
  {
    name: "Food & Beverage",
    gradient: "from-orange-500 to-amber-500",
    icon: "🍕",
    description: "Taste test & recipes",
  },
];

export const IndustryCarousel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % industries.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goTo = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prev = () => goTo((currentIndex - 1 + industries.length) % industries.length);
  const next = () => goTo((currentIndex + 1) % industries.length);

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI Ads for <span className="text-gradient">Every Industry</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From beauty to tech, create scroll-stopping content for any niche
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Carousel container */}
          <div className="flex flex-col items-center">
            {/* Cards container */}
            <div className="relative h-[500px] w-full flex items-center justify-center overflow-hidden">
              {industries.map((industry, index) => {
                const offset = index - currentIndex;
                const isActive = index === currentIndex;
                const absOffset = Math.abs(offset);
                
                // Only show current and adjacent cards
                if (absOffset > 2) return null;
                
                return (
                  <motion.div
                    key={industry.name}
                    animate={{
                      scale: isActive ? 1 : 0.8,
                      opacity: absOffset > 1 ? 0 : isActive ? 1 : 0.5,
                      x: offset * 300,
                      zIndex: isActive ? 10 : 5 - absOffset,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute cursor-pointer"
                    onClick={() => goTo(index)}
                  >
                    <div className={`glass-card p-4 transition-all duration-300 ${isActive ? 'glow-blue' : ''}`}>
                      <div className="relative w-[200px] h-[400px] bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-[2rem] p-1.5 shadow-2xl">
                        <div className={`relative w-full h-full bg-gradient-to-br ${industry.gradient} rounded-[1.7rem] flex flex-col items-center justify-center p-4`}>
                          <span className="text-5xl mb-3">{industry.icon}</span>
                          <h3 className="text-base font-bold text-white text-center">{industry.name}</h3>
                          <p className="text-xs text-white/80 text-center mt-1">{industry.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation row */}
            <div className="flex items-center justify-center gap-6 mt-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                className="rounded-full border-border hover:bg-secondary"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              {/* Dots */}
              <div className="flex gap-2">
                {industries.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goTo(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "w-8 bg-primary"
                        : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={next}
                className="rounded-full border-border hover:bg-secondary"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
