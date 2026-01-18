import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

export const Comparison = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Why We Are <span className="text-gradient">Different</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Most platforms give you generic AI tools. We give you expert-driven results.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Others */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="glass-card p-8 border-red-500/20"
                    >
                        <h3 className="text-2xl font-bold mb-6 text-muted-foreground">Other AI Platforms</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-muted-foreground">
                                <X className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                                <span>Generic, robotic scripts</span>
                            </li>
                            <li className="flex items-start gap-3 text-muted-foreground">
                                <X className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                                <span>No audience targeting strategy</span>
                            </li>
                            <li className="flex items-start gap-3 text-muted-foreground">
                                <X className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                                <span>Limited customization options</span>
                            </li>
                            <li className="flex items-start gap-3 text-muted-foreground">
                                <X className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                                <span>One-size-fits-all templates</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Us */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="glass-card p-8 border-primary/50 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                        <h3 className="text-2xl font-bold mb-6 text-gradient">aiviralads</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                                <span className="font-medium">Expert Human Script Writing</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                                <span className="font-medium">Deep Target Audience Detection</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                                <span className="font-medium">100% Customization for your Brand</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                                <span className="font-medium">Optimized for Your Specific Niche</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
