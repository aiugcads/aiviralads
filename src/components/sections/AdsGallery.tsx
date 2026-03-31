import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Play, X, Star, Sparkles, Search, ArrowRight } from "lucide-react";
import { adsVideosData, AdVideo } from "@/data/adsVideos";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const AdsGallery = ({ limit }: { limit?: number }) => {
  const [selectedVideo, setSelectedVideo] = useState<AdVideo | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  // Get distinct categories
  const categories = useMemo(() => {
    const cats = new Set(adsVideosData.map(ad => ad.category));
    return ["All", ...Array.from(cats)];
  }, []);

  const sortedAndFiltered = useMemo(() => {
    let result = adsVideosData;
    
    // Category Filter
    if (filter !== "All") {
      result = result.filter(ad => ad.category === filter);
    }
    
    // Text Search Filter (Title & Description)
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(ad => 
        ad.title.toLowerCase().includes(q) || 
        ad.description.toLowerCase().includes(q)
      );
    }

    return limit ? result.slice(0, limit) : result;
  }, [limit, filter, searchQuery]);

  return (
    <section className="py-24 relative overflow-hidden bg-background" id="ads-gallery">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {!limit && (
             <div className="inline-flex items-center justify-center p-2 bg-secondary/50 rounded-full mb-6 px-5 border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.2)]">
               <Sparkles className="w-4 h-4 text-primary mr-2 animate-pulse" />
               <span className="text-foreground text-sm font-semibold tracking-wide">Premium UGC & Brand Ads</span>
             </div>
          )}
          
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            High-Converting <span className="text-gradient">Vertical Ads</span>
          </h2>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            Scroll through our extensive portfolio of 9:16 vertical videos. Designed specifically for TikTok, Reels, and YouTube Shorts to maximize your brand's ROI.
          </p>

          {/* Search Bar - Only show on dedicated page (!limit) */}
          {!limit && (
            <div className="max-w-xl mx-auto mb-8 relative">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search by app name, description, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-full bg-secondary/50 border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary outline-none transition-all text-foreground shadow-inner"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Filter Options - Hide on homepage to save space if desired, but user asked for "filtger option with name of app", so we keep it or just rely on search. We keep it active on both. */}
          {categories.length > 2 && (
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    filter === cat
                      ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.4)] scale-105"
                      : "bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Massive Masonry-like Grid for Vertical Videos */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {sortedAndFiltered.map((ad, idx) => (
              <motion.div
                key={ad.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: (idx % 10) * 0.05 }}
                className="group relative rounded-2xl overflow-hidden aspect-[9/16] bg-secondary cursor-pointer border border-white/5 hover:border-primary/50 transition-all duration-500"
                onClick={() => setSelectedVideo(ad)}
                whileHover={{ y: -10, scale: 1.02, zIndex: 20 }}
              >
                {/* Glow behind the card on hover */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500 blur-xl -z-10" />

                <img
                  src={ad.thumbnailUrl}
                  alt={ad.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                
                {/* Static Top Info */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <Badge className="bg-white/10 backdrop-blur-md text-white border-none text-[10px] uppercase font-bold tracking-wider">
                    {ad.category}
                  </Badge>
                  <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded text-white text-xs font-medium">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    Top
                  </div>
                </div>

                {/* Big Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-[0_0_30px_rgba(var(--primary),0.6)] backdrop-blur-sm">
                    <Play className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground ml-1 fill-current" />
                  </div>
                </div>

                {/* Bottom Info Details */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold text-sm md:text-base leading-tight mb-2 line-clamp-2 drop-shadow-md">
                    {ad.title}
                  </h3>
                  <div className="flex items-center gap-3 text-white/80 text-xs font-medium">
                    <span className="flex items-center gap-1">
                      <Play className="w-3 h-3" />
                      {ad.duration}s
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/50" />
                    <span>Vertical Format</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {sortedAndFiltered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No videos found matching your criteria.
          </div>
        )}

        {/* View All Button - Only show on homepage (when limit is applied) */}
        {limit && sortedAndFiltered.length === limit && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Button size="lg" className="glow-blue px-8 text-lg h-14 rounded-full" onClick={() => navigate('/sample-ads')}>
              Explore All {adsVideosData.length} Videos <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        )}
      </div>

      {/* Cinematic Modal Player */}
      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="max-w-md p-0 bg-black/95 border-border/20 overflow-hidden rounded-2xl shadow-2xl backdrop-blur-xl">
          {selectedVideo && (
            <div className="relative aspect-[9/16] w-full flex flex-col justify-center bg-black group">
              <video
                src={selectedVideo.videoUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              
              {/* Floating Header Inside Video */}
              <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/90 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Badge className="bg-primary/80 backdrop-blur-md text-white border-none mb-2">
                  {selectedVideo.category}
                </Badge>
                <h3 className="text-white font-bold text-xl drop-shadow-xl leading-tight">
                  {selectedVideo.title}
                </h3>
                <p className="text-white/80 text-sm mt-2 max-w-sm line-clamp-3">
                  {selectedVideo.description.split('\n')[0]} {/* Show first meaningful line */}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
