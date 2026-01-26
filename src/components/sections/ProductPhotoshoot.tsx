
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Camera, Image as ImageIcon, MapPin, Video } from "lucide-react";
import productShowcase1 from "@/assets/product-showcase-1.webp";
import productShowcase2 from "@/assets/product-showcase-2.webp";
import productShowcase3 from "@/assets/product-showcase-3.webp";

export const ProductPhotoshoot = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const outputs = [
        { type: "image", icon: <MapPin className="w-4 h-4" />, label: "Urban Setting", img: productShowcase2, color: "from-blue-500/20 to-purple-500/20" },
        { type: "image", icon: <ImageIcon className="w-4 h-4" />, label: "Studio Shot", img: productShowcase3, color: "from-amber-500/20 to-red-500/20" },
        { type: "video", icon: <Video className="w-4 h-4" />, label: "Lifestyle Video", img: productShowcase1, color: "from-green-500/20 to-emerald-500/20" },
        { type: "video", icon: <Video className="w-4 h-4" />, label: "360° View", img: productShowcase2, color: "from-pink-500/20 to-rose-500/20" },
    ];

    return (
        <section ref={ref} className="py-24 relative overflow-hidden bg-secondary/10" id="photoshoot">
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
                        <Camera className="w-5 h-5 text-primary mr-2" />
                        <span className="text-primary font-medium text-sm">New Feature</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        AI Product <span className="text-gradient">Photoshoot</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Upload one product image. Get professional photoshoots in multiple locations and video formats instantly.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
                    {/* Input Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl relative z-10">
                            <div className="absolute -top-3 left-6 bg-background border border-border px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                                Input: 1 Product Image
                            </div>
                            <div className="aspect-square rounded-xl overflow-hidden bg-secondary relative group">
                                <img
                                    src={productShowcase1}
                                    alt="Source Product"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white font-medium">Original Product</span>
                                </div>
                            </div>
                        </div>

                        {/* Arrow for mobile (hidden on large) */}
                        <div className="flex justify-center my-6 lg:hidden">
                            <ArrowRight className="w-8 h-8 text-primary animate-pulse rotate-90" />
                        </div>

                        {/* Connecting Lines for Desktop */}
                        <div className="hidden lg:block absolute top-1/2 -right-8 w-16 h-px bg-gradient-to-r from-primary/50 to-transparent border-t border-dashed border-primary/30" />
                        <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 bg-background border border-border p-2 rounded-full z-20 shadow-lg">
                            <ArrowRight className="w-4 h-4 text-primary" />
                        </div>
                    </motion.div>

                    {/* Output Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {outputs.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                                className="group relative bg-card border border-border rounded-xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="aspect-[4/5] rounded-lg overflow-hidden bg-secondary relative mb-3">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} mix-blend-overlay opacity-60 z-10 transition-opacity group-hover:opacity-40`} />
                                    <img
                                        src={item.img}
                                        alt={item.label}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Badge */}
                                    <div className="absolute top-2 right-2 z-20 bg-black/60 backdrop-blur-sm p-1.5 rounded-full text-white">
                                        {item.icon}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h4 className="font-semibold text-sm">{item.label}</h4>
                                    <p className="text-xs text-muted-foreground capitalize">{item.type}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    );
};
