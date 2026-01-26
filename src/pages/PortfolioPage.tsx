
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Portfolio } from "@/components/sections/Portfolio";
import { MobileCTA } from "@/components/layout/MobileCTA";

const PortfolioPage = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-20">
                <Portfolio />
            </main>
            <Footer />
            <MobileCTA />
        </div>
    );
};

export default PortfolioPage;
