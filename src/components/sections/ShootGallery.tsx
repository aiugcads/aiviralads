
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ImageIcon, Layers, Video } from "lucide-react";
import productShowcase1 from "@/assets/product-showcase-1.webp";
import productShowcase2 from "@/assets/product-showcase-2.webp";
import productShowcase3 from "@/assets/product-showcase-3.webp";

// Mock data for different shoots (fallback)
const defaultShoots = [
    {
        id: "cosmetics",
        label: "Cosmetics",
        sourceInfo: "Studio Lighting",
        sourceImg: productShowcase3,
        assets: [
            { type: "image", label: "Nature Background", img: productShowcase1, color: "from-green-500/20" },
            { type: "image", label: "Luxury Indoor", img: productShowcase2, color: "from-amber-500/20" },
            { type: "video", label: "Product Reveal", img: productShowcase3, color: "from-purple-500/20" },
            { type: "image", label: "Summer Vibe", img: productShowcase1, color: "from-blue-500/20" },
        ]
    },
    // ... items ...
    {
        id: "tech",
        label: "Tech Gadgets",
        sourceInfo: "White Background",
        sourceImg: productShowcase2,
        assets: [
            { type: "image", label: "Desk Setup", img: productShowcase2, color: "from-slate-500/20" },
            { type: "video", label: "Feature Tour", img: productShowcase1, color: "from-cyan-500/20" },
        ]
    }
];

import { fetchExcelData, ProductShoot } from "@/lib/dataLoader";
import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

export const ShootGallery = ({ enableViewMore = false }: { enableViewMore?: boolean }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [shoots, setShoots] = useState<any[]>(defaultShoots);
    const [activeTab, setActiveTab] = useState(defaultShoots[0].id);
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchExcelData();
            if (data && data.productShoots && data.productShoots.length > 0) {
                setShoots(data.productShoots);
                setActiveTab(data.productShoots[0].id);
            }
        };
        loadData();
    }, []);

    const currentShoot = shoots.find(s => s.id === activeTab) || shoots[0];

    return (
        <section ref={ref} className="py-24 relative overflow-hidden" id="gallery">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center p-2 bg-secondary/50 rounded-full mb-4 px-4 border border-border">
                        <Layers className="w-4 h-4 text-primary mr-2" />
                        <span className="text-muted-foreground text-sm">Gallery</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Explore <span className="text-gradient">Generated Shoots</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        See how different products are transformed into complete asset libraries.
                    </p>
                </motion.div>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-2 mb-12"
                >
                    {shoots.map((shoot) => (
                        <button
                            key={shoot.id}
                            onClick={() => setActiveTab(shoot.id)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === shoot.id
                                ? "bg-primary text-primary-foreground shadow-lg scale-105"
                                : "bg-secondary/40 text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                                }`}
                        >
                            {shoot.label}
                        </button>
                    ))}
                </motion.div>

                {/* Content Area */}
                <div className="max-w-7xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5 }}
                            className="grid lg:grid-cols-12 gap-8"
                        >
                            {/* Source Side */}
                            <div className="lg:col-span-4 flex flex-col gap-4">
                                <div className="bg-card border border-border rounded-2xl p-6 shadow-xl h-full flex flex-col">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-semibold text-lg">Input Source</h3>
                                        <span className="text-xs bg-secondary px-2 py-1 rounded text-muted-foreground">{currentShoot.sourceInfo}</span>
                                    </div>
                                    <div className="flex-1 rounded-xl overflow-hidden relative group">
                                        <img
                                            src={currentShoot.sourceImg}
                                            alt="Original"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/20" />
                                        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-mono text-white">
                                            original.jpg
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Arrow (Visual Connector) */}
                            <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
                                <ArrowRight className="w-8 h-8 text-muted-foreground/30" />
                            </div>

                            {/* Generated Grid */}
                            <div className="lg:col-span-7">
                                <div className="grid grid-cols-2 gap-4 h-full">
                                    {currentShoot.assets.map((asset, idx) => (
                                        <motion.div
                                            key={`${activeTab}-${idx}`}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                                            className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-secondary"
                                        >
                                            <div className={`absolute inset-0 bg-gradient-to-br ${asset.color} mix-blend-overlay opacity-50 z-10`} />
                                            <img
                                                src={asset.img}
                                                alt={asset.label}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />

                                            {/* Overlay content */}
                                            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                                <div className="flex items-center gap-2 text-white mb-1">
                                                    {asset.type === 'video' ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                                                    <span className="text-xs font-medium uppercase tracking-wider">{asset.type}</span>
                                                </div>
                                                <p className="text-sm font-semibold text-white">{asset.label}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {enableViewMore && (
                    <div className="mt-12 text-center">
                        <Button size="lg" className="glow-blue px-8" onClick={() => navigate('/product-shoot')}>
                            View Full Gallery <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
};
