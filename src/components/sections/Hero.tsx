import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { PhoneMockup } from "@/components/ui/phone-mockup";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
// Import showcase images for posters
import showcase1 from "@/assets/product-showcase-1.webp";
import showcase2 from "@/assets/product-showcase-2.webp";
import showcase3 from "@/assets/product-showcase-3.webp";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const typewriterTexts = [
  "10x Faster Production",
  "No Influencers Needed",
  "90% Cost Reduction",
  "Viral-Ready Content",
];

export const Hero = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const carouselItems = [
    {
      video: "https://res.cloudinary.com/dnwui208j/video/upload/v1768640652/merged_video_1768584753_bakzq2.mp4",
      poster: showcase1
    },
    {
      video: "https://res.cloudinary.com/dnwui208j/video/upload/v1768732719/merged_kuvana_video_lk5fhc.mp4",
      poster: showcase2
    },
    {
      video: "https://res.cloudinary.com/dnwui208j/video/upload/v1768732714/merged_mamaerath_shampoo_video_lij1ma.mp4",
      poster: showcase3
    },
    {
      video: "https://res.cloudinary.com/dnwui208j/video/upload/v1768732703/merged_derme_serum_video_qtoixc.mp4",
      poster: showcase1
    },
    {
      video: "https://res.cloudinary.com/dnwui208j/video/upload/v1768732700/merged_tulshi_tea_video_hpn3sn.mp4",
      poster: showcase2
    }
  ];

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  useEffect(() => {
    const currentFullText = typewriterTexts[currentTextIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentFullText.length) {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % typewriterTexts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--neon-blue)/0.1)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--neon-purple)/0.1)_0%,transparent_50%)]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">Professional Ad Creation Service</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              We Create <span className="text-gradient">High-Converting</span>
              <br />
              UGC Ads For You
            </h1>

            <div className="h-12 mb-6">
              <span className="text-xl md:text-2xl text-primary font-semibold">
                {displayText}
                <span className="animate-blink">|</span>
              </span>
            </div>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Send us your product, we handle the rest.
              <br />
              No influencers to manage. No shoots to organize. Just results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="glow-blue group" onClick={() => document.getElementById('submission-form')?.scrollIntoView({ behavior: 'smooth' })}>
                Start Your Campaign
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-secondary"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="mr-2 w-4 h-4" />
                View Portfolio
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              Trusted by modern D2C brands & startups
            </p>
          </motion.div>

          {/* Right content - Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center w-full"
          >
            <div className="flex items-center gap-2 md:gap-8">
              {/* Prev Button */}
              <Button
                size="icon"
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shrink-0 z-20 w-10 h-10 md:w-12 md:h-12 border-none"
                onClick={prevVideo}
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </Button>

              {/* Phone Component */}
              <div className="animate-float w-full max-w-[200px] xs:max-w-[240px] sm:max-w-[280px] lg:max-w-[300px] shrink-0">
                <PhoneMockup>
                  {/* Video Carousel */}
                  <div className="w-full h-full bg-black relative">
                    <AnimatePresence mode="wait">
                      <motion.video
                        key={currentVideoIndex}
                        src={carouselItems[currentVideoIndex].video}
                        poster={carouselItems[currentVideoIndex].poster}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        playsInline
                        onEnded={handleVideoEnd}
                      />
                    </AnimatePresence>
                  </div>

                  {/* Overlay UI elements */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                    <div className="flex items-center gap-2 mb-2">
                      <Logo className="w-8 h-8 rounded-full border border-white/20" />
                      <span className="text-sm font-semibold text-white">@aiviralads</span>
                      <span className="text-xs text-muted-foreground/80">Sponsored</span>
                    </div>
                    <p className="text-sm text-gray-200">
                      ✨ High-converting UGC ads created with AI in minutes...
                    </p>
                  </div>
                </PhoneMockup>
              </div>

              {/* Next Button */}
              <Button
                size="icon"
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shrink-0 z-20 w-10 h-10 md:w-12 md:h-12 border-none"
                onClick={nextVideo}
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </Button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </div>
      </motion.div>

      {/* Video Demo Modal - Optional, keeping for now if they want to show a 'reel' */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-card border-border overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="text-xl font-bold">
              Our Ad Creation Process
            </DialogTitle>
          </DialogHeader>
          <div className="p-4 pt-2">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-secondary">
              {/* Demo video content - animated walkthrough */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  {/* Step-by-step animation */}
                  <DemoAnimation />
                </motion.div>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <Button size="lg" className="glow-blue" onClick={() => { setIsVideoOpen(false); document.getElementById('submission-form')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Get Started Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

// Animated demo component showing the 3-step process
const DemoAnimation = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      title: "Step 1: Upload Your Product",
      description: "Simply share your product link or images",
      icon: "📦",
    },
    {
      title: "Step 2: AI Generates Content",
      description: "Our AI creates scripts, creators, and videos",
      icon: "🤖",
    },
    {
      title: "Step 3: Get Your Ads",
      description: "Receive high-converting UGC ads instantly",
      icon: "🚀",
    },
    {
      title: "Ready to Scale!",
      description: "Launch viral ads across all platforms",
      icon: "📈",
    },
  ];

  return (
    <div className="w-full max-w-lg mx-auto px-8">
      {/* Progress indicators */}
      <div className="flex justify-center gap-2 mb-8">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 w-12 rounded-full transition-all duration-500 ${index === step ? "bg-primary" : "bg-muted"
              }`}
          />
        ))}
      </div>

      {/* Current step display */}
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="text-6xl mb-6">{steps[step].icon}</div>
        <h3 className="text-2xl font-bold mb-3 text-gradient">
          {steps[step].title}
        </h3>
        <p className="text-muted-foreground text-lg">
          {steps[step].description}
        </p>
      </motion.div>

      {/* Animated mockup preview */}
      <motion.div
        className="mt-8 mx-auto w-32 h-48 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-border overflow-hidden"
        animate={{
          boxShadow:
            step === 3
              ? "0 0 30px hsl(var(--primary)/0.5)"
              : "0 0 0px transparent",
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl"
          >
            {step === 0 && "📸"}
            {step === 1 && "⚡"}
            {step === 2 && "✨"}
            {step === 3 && "🎬"}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
