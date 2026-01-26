import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { influencers as defaultInfluencers, Influencer, Video } from "@/data/influencers";
import { fetchExcelData } from "@/lib/dataLoader";
import { Play, User, X, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface InfluencerShowcaseProps {
    limit?: number;
}

export const InfluencerShowcase = ({ limit }: InfluencerShowcaseProps) => {
    const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);
    const [filter, setFilter] = useState<"All" | "Male" | "Female">("All");
    const [influencerData, setInfluencerData] = useState<Influencer[]>(defaultInfluencers);
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchExcelData();
            if (data && data.influencers.length > 0) {
                setInfluencerData(data.influencers);
            }
        };
        loadData();
    }, []);

    // Only apply gender filter if NOT in limited capability mode (i.e. full page)
    const filteredInfluencers = influencerData.filter(
        (influencer) => limit ? true : (filter === "All" || influencer.gender === filter)
    );

    // Apply limit if provided
    const displayInfluencers = limit ? filteredInfluencers.slice(0, limit) : filteredInfluencers;

    return (
        <section className="py-24 bg-background relative overflow-hidden" id="influencers">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Meet Our <span className="text-gradient">Influencers</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                        Collaborate with top creators to amplify your brand's message.
                    </p>

                    {/* Filter Controls - Hide if limited (preview mode) */}
                    {!limit && (
                        <div className="flex items-center justify-center gap-4">
                            {(["All", "Male", "Female"] as const).map((option) => (
                                <button
                                    key={option}
                                    onClick={() => setFilter(option)}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${filter === option
                                        ? "bg-primary text-primary-foreground shadow-lg scale-105"
                                        : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Influencer Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <AnimatePresence mode="popLayout">
                        {displayInfluencers.map((influencer) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={influencer.id}
                            >
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div
                                            className="group relative cursor-pointer rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                                            onClick={() => setSelectedInfluencer(influencer)}
                                        >
                                            {/* Image Container */}
                                            <div className="aspect-[3/4] overflow-hidden relative">
                                                <img
                                                    src={influencer.image}
                                                    alt={influencer.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                                {/* Overlay Content */}
                                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                                    <h3 className="text-xl font-bold mb-1">{influencer.name}</h3>
                                                    <div className="flex items-center gap-2 text-sm text-white/80 mb-2">
                                                        <User className="w-4 h-4" />
                                                        <span>{influencer.followers} Followers</span>
                                                    </div>
                                                    <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm">
                                                        {influencer.category}
                                                    </Badge>
                                                </div>

                                                {/* Hover Overlay with Button */}
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                                                    <div className="bg-primary/90 text-primary-foreground px-6 py-3 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                                                        View Profile <Play className="w-4 h-4 fill-current" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </DialogTrigger>

                                    <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background border-border">
                                        <InfluencerModalContent influencer={influencer} />
                                    </DialogContent>
                                </Dialog>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* View All Button - Show only if limited */}
                {limit && (
                    <div className="mt-12 text-center">
                        <Button
                            size="lg"
                            className="glow-blue px-8"
                            onClick={() => navigate("/influencers")}
                        >
                            View All Influencers <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
};

const InfluencerModalContent = ({ influencer }: { influencer: Influencer }) => {
    const [playingVideo, setPlayingVideo] = useState<Video | null>(null);

    return (
        <div className="flex flex-col h-[85vh] md:h-auto md:max-h-[85vh]">
            <div className="flex flex-col md:flex-row h-full">
                {/* Sidebar Info */}
                <div className="w-full md:w-1/3 bg-secondary/30 p-8 border-b md:border-b-0 md:border-r border-border flex flex-col items-center text-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-primary/20">
                        <img src={influencer.image} alt={influencer.name} className="w-full h-full object-cover" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{influencer.name}</h2>
                    <p className="text-muted-foreground mb-4">{influencer.category} Creator</p>

                    <div className="flex gap-2 mb-6">
                        <Badge variant="outline">{influencer.followers} Followers</Badge>
                        <Badge variant="outline">{influencer.gender}</Badge>
                    </div>

                    <div className="w-full mt-auto">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Stats</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-background p-3 rounded-lg border border-border">
                                <div className="font-bold text-primary">4.8%</div>
                                <div className="text-muted-foreground text-xs">Avg. ER</div>
                            </div>
                            <div className="bg-background p-3 rounded-lg border border-border">
                                <div className="font-bold text-primary">2.5M</div>
                                <div className="text-muted-foreground text-xs">Reach</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content - Videos */}
                <div className="flex-1 p-8 overflow-y-auto">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Play className="w-5 h-5 text-primary" /> Recent Content
                    </h3>

                    {playingVideo ? (
                        <div className="space-y-4">
                            <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl relative group">
                                <video
                                    src={playingVideo.url}
                                    className="w-full h-full object-contain"
                                    controls
                                    autoPlay
                                />
                                <button
                                    onClick={() => setPlayingVideo(null)}
                                    className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-lg">{playingVideo.title}</h4>
                                <button onClick={() => setPlayingVideo(null)} className="text-sm text-primary hover:underline">
                                    Back to list
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {influencer.videos.map(video => (
                                <div
                                    key={video.id}
                                    className="group relative cursor-pointer rounded-xl overflow-hidden bg-secondary/20 border border-border hover:border-primary/50 transition-all hover:shadow-md"
                                    onClick={() => setPlayingVideo(video)}
                                >
                                    <div className="aspect-video bg-black/10 relative">
                                        {/* Assuming video thumbnail logic or fallback */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Play className="w-12 h-12 text-white/50 group-hover:text-primary transition-colors fill-current" />
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <h5 className="font-medium text-sm truncate">{video.title}</h5>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
