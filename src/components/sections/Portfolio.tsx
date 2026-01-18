import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
// Using original assets for now, can swap to specific S3 URLs later
import productShowcase1 from "@/assets/product-showcase-1.webp";
import productShowcase2 from "@/assets/product-showcase-2.webp";
import productShowcase3 from "@/assets/product-showcase-3.webp";

const portfolioItems = [
    // 9:16 Items (Vertical)
    {
        id: 1,
        image: productShowcase1,
        videoUrl: "https://res.cloudinary.com/dnwui208j/video/upload/v1768640652/merged_video_1768584753_bakzq2.mp4",
        client: "E-Commerce Brand",
        type: "TikTok UGC",
        result: "High Engagement",
        description: "Authentic user-generated content driving sales.",
        aspectRatio: "9:16"
    },
    {
        id: 2,
        image: productShowcase2,
        videoUrl: "https://res.cloudinary.com/dnwui208j/video/upload/v1768732719/merged_kuvana_video_lk5fhc.mp4",
        client: "Kuvana",
        type: "Instagram Reel",
        result: "Viral Reach",
        description: "Trendy, fast-paced editing for maximum retention.",
        aspectRatio: "9:16"
    },
    {
        id: 3,
        image: productShowcase3,
        videoUrl: "https://res.cloudinary.com/dnwui208j/video/upload/v1768732714/merged_mamaerath_shampoo_video_lij1ma.mp4",
        client: "Mamaearth",
        type: "YouTube Short",
        result: "300+ Sales",
        description: "Feature-focused showcase with clear value props.",
        aspectRatio: "9:16"
    },
    {
        id: 4,
        image: productShowcase1,
        videoUrl: "https://res.cloudinary.com/dnwui208j/video/upload/v1768732703/merged_derme_serum_video_qtoixc.mp4",
        client: "Derma Serum",
        type: "TikTok UGC",
        result: "4.5x ROAS",
        description: "Direct response style video optimized for conversions.",
        aspectRatio: "9:16"
    },
    {
        id: 5,
        image: productShowcase2,
        videoUrl: "https://res.cloudinary.com/dnwui208j/video/upload/v1768732700/merged_tulshi_tea_video_hpn3sn.mp4",
        client: "Tulsi Tea",
        type: "Instagram Reel",
        result: "High CTR",
        description: "Natural and organic product presentation.",
        aspectRatio: "9:16"
    },
    // 16:9 Items (Horizontal) - Placeholders
    {
        id: 6,
        image: productShowcase2,
        videoUrl: "https://res.cloudinary.com/dnwui208j/video/upload/v1768640638/merged_video_1768386710_ftpil8.mp4",
        client: "Brand Campaign",
        type: "YouTube Ad",
        result: "High CTR",
        description: "Cinematic horizontal ad designed for high engagement.",
        aspectRatio: "16:9"
    },
    {
        id: 7,
        image: productShowcase3,
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        client: "Product Launch",
        type: "Website Hero",
        result: "High CTR",
        description: "Wide format product demonstration video.",
        aspectRatio: "16:9"
    }
];

export const Portfolio = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [activeItem, setActiveItem] = useState(0);
    const [activeAspectRatio, setActiveAspectRatio] = useState("9:16");
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = ["All", "TikTok UGC", "Instagram Reel", "YouTube Short", "YouTube Ad"];

    const filteredItems = portfolioItems.filter(item =>
        (activeCategory === "All" || item.type === activeCategory) &&
        item.aspectRatio === activeAspectRatio
    );

    // Reset active item index when filtering changes
    if (activeItem >= filteredItems.length && filteredItems.length > 0) {
        setActiveItem(0);
    }

    return (
        <section ref={ref} className="py-24 relative overflow-hidden" id="portfolio">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Our Recent <span className="text-gradient">Success Stories</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                        See the results we've delivered for brands just like yours.
                    </p>

                    {/* Controls */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
                        {/* Aspect Ratio Toggle */}
                        <div className="flex items-center gap-2 p-1 rounded-lg bg-secondary/50 border border-border">
                            <button
                                onClick={() => setActiveAspectRatio("9:16")}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeAspectRatio === "9:16"
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                9:16 (Vertical)
                            </button>
                            <button
                                onClick={() => setActiveAspectRatio("16:9")}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeAspectRatio === "16:9"
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                16:9 (Horizontal)
                            </button>
                        </div>

                        {/* Category Filter */}
                        <div className="flex bg-secondary/30 rounded-full p-1 border border-white/10 overflow-x-auto max-w-full">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${activeCategory === cat
                                        ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg"
                                        : "text-muted-foreground hover:text-white"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Featured Video Player */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Dynamic Aspect Ratio Container */}
                        <div className={`relative rounded-2xl overflow-hidden glow-blue bg-black mx-auto transition-all duration-500 ease-in-out ${activeAspectRatio === "9:16" ? "aspect-[9/16] max-w-sm" : "aspect-[16/9] w-full"
                            }`}>
                            {filteredItems[activeItem] ? (
                                filteredItems[activeItem].videoUrl ? (
                                    <video
                                        key={filteredItems[activeItem].id + activeAspectRatio} // Force reload on ratio change if needed
                                        src={filteredItems[activeItem].videoUrl}
                                        controls
                                        preload="metadata"
                                        className="w-full h-full object-cover"
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <>
                                        <motion.img
                                            key={filteredItems[activeItem].id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                            src={filteredItems[activeItem].image}
                                            alt={filteredItems[activeItem].client}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                                <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                                            </div>
                                        </div>
                                    </>
                                )
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                    No videos found in this category
                                </div>
                            )}

                            {/* Overlay Info (Only if video not playing/available overlay logic could be here, but sticking to previous design it was always visible for images, maybe problematic for controls. Let's keep it minimal for video player clarity) */}
                        </div>
                    </motion.div>

                    {/* List View */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-4"
                    >
                        {filteredItems.map((item, index) => (
                            <motion.button
                                key={item.id}
                                onClick={() => setActiveItem(index)}
                                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${activeItem === index
                                    ? "border-primary bg-primary/10 glow-blue scale-[1.02]"
                                    : "border-border/50 bg-card/30 hover:border-primary/30 hover:bg-card/50"
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-secondary">
                                        <img
                                            src={item.image}
                                            alt={item.client}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className="font-semibold truncate">{item.client}</h4>
                                            {activeItem === index && <span className="text-xs text-primary font-medium">Viewing</span>}
                                        </div>
                                        <div className="flex gap-2 mb-1">
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-primary">{item.type}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {item.description}
                                        </p>
                                    </div>
                                    <ArrowRight className={`w-5 h-5 transition-transform ${activeItem === index ? "text-primary translate-x-1" : "text-muted-foreground"}`} />
                                </div>
                            </motion.button>
                        ))}

                        {filteredItems.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                                No videos found in this category.
                            </div>
                        )}

                        <div className="pt-6">
                            <Button size="lg" className="w-full glow-blue" onClick={() => document.getElementById('submission-form')?.scrollIntoView({ behavior: 'smooth' })}>
                                Get Similar Results
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
