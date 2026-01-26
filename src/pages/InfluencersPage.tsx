
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { InfluencerShowcase } from "@/components/sections/InfluencerShowcase";
import { MobileCTA } from "@/components/layout/MobileCTA";

const InfluencersPage = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-20">
                <InfluencerShowcase />
            </main>
            <Footer />
            <MobileCTA />
        </div>
    );
};

export default InfluencersPage;
