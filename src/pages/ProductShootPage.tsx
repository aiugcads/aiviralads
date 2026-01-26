
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ProductPhotoshoot } from "@/components/sections/ProductPhotoshoot";
import { ShootGallery } from "@/components/sections/ShootGallery";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ProductShootPage = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-20">
                <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Professional <span className="text-gradient">AI Product Photography</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                        Transform a single product image into unlimited marketing assets. No physical studio required.
                    </p>
                </div>

                <ProductPhotoshoot />
                <ShootGallery />

                <section className="py-24 bg-secondary/10 text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Catalog?</h2>
                        <Button size="lg" className="glow-blue px-8 text-lg py-6" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                            Start Your Free Trial <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default ProductShootPage;
