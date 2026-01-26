import { Navbar } from "@/components/layout/Navbar";
import { MobileCTA } from "@/components/layout/MobileCTA";
import { Hero } from "@/components/sections/Hero";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { IndustryCarousel } from "@/components/sections/IndustryCarousel";
import { Stats } from "@/components/sections/Stats";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { Portfolio } from "@/components/sections/Portfolio";
import { SocialProof } from "@/components/sections/SocialProof";
import { FAQ } from "@/components/sections/FAQ";
import { SubmissionForm } from "@/components/sections/SubmissionForm";
import { Footer } from "@/components/sections/Footer";
import { Comparison } from "@/components/sections/Comparison";
import { ExtraTips } from "@/components/sections/ExtraTips";
import { Pricing } from "@/components/sections/Pricing";
import { InfluencerShowcase } from "@/components/sections/InfluencerShowcase";
import { InfluencerMarquee } from "@/components/sections/InfluencerMarquee";
import { ProductPhotoshoot } from "@/components/sections/ProductPhotoshoot";
import { ShootGallery } from "@/components/sections/ShootGallery";

const Index = () => {
  console.log("Index page rendering...");
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <InfluencerMarquee />
        <BeforeAfter />
        <ProductPhotoshoot />
        <ShootGallery />
        <HowItWorks />
        <Portfolio limit={5} />
        <InfluencerShowcase limit={8} />
        <Stats />
        <Comparison />
        <section id="features">
          <Features />
        </section>
        <ExtraTips />
        <Pricing />
        <SubmissionForm />
        <SocialProof />
        <FAQ />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
};

export default Index;
// Force refresh
