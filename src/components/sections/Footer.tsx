import { motion } from "framer-motion";
import { Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const footerLinks = [
  { label: "About", href: "#" },
  { label: "Pricing", href: "#pricing" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Contact", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/aiviralads", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <Logo className="w-8 h-8 rounded-full" />
              <span className="text-2xl font-bold text-gradient">aiviralads</span>
            </div>
            <p className="text-sm text-muted-foreground">High-speed AI-powered UGC creative production.</p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} aiviralads. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
