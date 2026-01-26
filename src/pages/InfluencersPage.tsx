
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { InfluencerShowcase } from "@/components/sections/InfluencerShowcase";
import { MobileCTA } from "@/components/layout/MobileCTA";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const InfluencersPage = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-20">
                <div className="container mx-auto px-4 py-8">
                    <Button variant="ghost" className="gap-2" onClick={() => navigate('/')}>
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Button>
                </div>
                <InfluencerShowcase />
            </main>
            <Footer />
            <MobileCTA />
        </div>
    );
};

export default InfluencersPage;
