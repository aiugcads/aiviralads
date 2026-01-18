import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail, Calendar, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail("");
    
    toast({
      title: "You're on the list! 🎉",
      description: "We'll notify you when early access is available.",
    });
  };

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--neon-blue)/0.15)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--neon-purple)/0.1)_0%,transparent_60%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-card p-8 md:p-12 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-neon-blue/20 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-neon-purple/20 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Ready to Scale Your Ads <span className="text-gradient">With AI?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Create viral UGC ads without influencers or shoots. Join the future of ad creation.
              </p>

              {/* Email form */}
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-3 text-neon-blue mb-8"
                >
                  <CheckCircle className="w-6 h-6" />
                  <span className="text-lg font-medium">You're on the list!</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-secondary/50 border-border h-12"
                      disabled={isSubmitting}
                    />
                  </div>
                  <Button size="lg" className="glow-blue group h-12" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Joining...
                      </>
                    ) : (
                      <>
                        Get Early Access
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              )}

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <span>or</span>
              </div>

              <Button 
                size="lg" 
                variant="outline" 
                className="mt-4 border-primary/30 hover:bg-primary/10"
              >
                <Calendar className="mr-2 w-4 h-4" />
                Book Free Demo
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
