
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchExcelData, Influencer } from "@/lib/dataLoader";
import { influencers as defaultInfluencers } from "@/data/influencers";

export const InfluencerMarquee = () => {
    const [influencers, setInfluencers] = useState<Influencer[]>(defaultInfluencers);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchExcelData();
            if (data && data.influencers.length > 0) {
                setInfluencers(data.influencers);
            }
        };
        loadData();
    }, []);

    // Duplicate items to create seamless loop
    const marqueeItems = [...influencers, ...influencers, ...influencers]; // Triple it for safety on wide screens

    return (
        <div className="w-full bg-black/50 backdrop-blur-sm border-y border-white/5 py-6 overflow-hidden relative z-10">
            <div className="flex">
                <motion.div
                    className="flex gap-8 flex-shrink-0"
                    animate={{
                        x: ["0%", "-50%"],
                    }}
                    transition={{
                        duration: 50, // Slow speed
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {marqueeItems.map((influencer, index) => (
                        <div
                            key={`${influencer.id}-${index}`}
                            className="flex items-center gap-3 bg-secondary/20 px-4 py-2 rounded-full border border-white/5 flex-shrink-0 min-w-[200px]"
                        >
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/30">
                                <img
                                    src={influencer.image}
                                    alt={influencer.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-white/90 truncate max-w-[120px]">
                                    {influencer.name}
                                </span>
                                <span className="text-xs text-primary/80">
                                    {influencer.followers}
                                </span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Gradient overlays for smooth fade */}
            <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-20" />
            <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-20" />
        </div>
    );
};
