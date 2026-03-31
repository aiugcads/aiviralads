import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { MobileCTA } from "@/components/layout/MobileCTA";
import { AdsGallery } from "@/components/sections/AdsGallery";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdsPage = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-20">
                <div className="container mx-auto px-4 py-8 relative z-20">
                    <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground" onClick={() => navigate('/')}>
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Button>
                </div>
                {/* Notice that no 'limit' prop is passed to AdsGallery here, meaning ALL videos will render along with the Search bar */}
                <AdsGallery />
            </main>
            <Footer />
            <MobileCTA />
        </div>
    );
};

export default AdsPage;
