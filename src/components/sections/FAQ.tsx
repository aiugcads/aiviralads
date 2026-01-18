import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What exactly is AI-generated UGC?",
    answer:
      "AI-generated UGC (User-Generated Content) uses advanced artificial intelligence to create realistic video ads featuring AI-generated creators. These ads look and feel like authentic influencer content but are produced entirely by AI, eliminating the need for real influencers, expensive shoots, or studio setups.",
  },
  {
    question: "How long does it take to create an AI ad?",
    answer:
      "Most AI ads are generated within minutes. Simply upload your product information, and our AI handles the rest—from scripting to final video production. What traditionally takes weeks with influencers can now be done in a single session.",
  },
  {
    question: "Do the AI creators look realistic?",
    answer:
      "Yes! Our AI generates ultra-realistic human creators that are indistinguishable from real people. They have natural expressions, movements, and speaking patterns that make your ads feel authentic and engaging.",
  },
  {
    question: "What platforms are the ads optimized for?",
    answer:
      "Our AI ads are specifically optimized for Meta (Facebook & Instagram), TikTok, and other social platforms. We create content in the right formats, aspect ratios, and styles that perform best on each platform.",
  },
  {
    question: "How much does AI ad generation cost compared to traditional methods?",
    answer:
      "AI-generated ads typically cost 90% less than traditional influencer marketing. You eliminate influencer fees, production costs, studio rentals, and lengthy negotiation processes. Plus, you can create unlimited variations for A/B testing.",
  },
  {
    question: "Can I customize the AI creators and scripts?",
    answer:
      "Absolutely! You have full control over the creator's appearance, tone of voice, script content, and visual style. Our AI adapts to your brand guidelines and target audience preferences.",
  },
  {
    question: "Are AI-generated ads compliant with platform policies?",
    answer:
      "Yes, our AI ads are designed to comply with advertising policies on major platforms. We stay updated with the latest guidelines to ensure your content meets all requirements for paid promotion.",
  },
  {
    question: "What if I'm not satisfied with the generated content?",
    answer:
      "We offer unlimited revisions and regenerations. If an ad doesn't meet your expectations, simply provide feedback and our AI will create new versions until you're completely satisfied.",
  },
];

export const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--neon-purple)/0.05)_0%,transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know about AI-powered ad generation
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass border border-border rounded-xl px-6 data-[state=open]:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-medium hover:text-primary transition-colors py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <a
              href="#cta"
              className="text-primary hover:underline font-medium"
            >
              Book a demo call
            </a>{" "}
            and we'll walk you through everything.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
