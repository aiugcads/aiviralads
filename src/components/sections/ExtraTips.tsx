import { motion } from "framer-motion";
import { Share2, Target, Zap } from "lucide-react";

const tips = [
    {
        icon: Share2,
        title: "Multi-Platform Distribution",
        description: "We help you process and post your ads to multiple platforms like Meta, Google, Instagram, and others where you need to host them.",
    },
    {
        icon: Target,
        title: "Audience Detection",
        description: "You don't need any influencers. We help you with precise audience detection to target the right people.",
    },
];

export const ExtraTips = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-secondary/5">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Extra <span className="text-gradient">Tips</span> & Services
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        We go beyond just creation effectively.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {tips.map((tip, index) => (
                        <motion.div
                            key={tip.title}
                            initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 * index }}
                            viewport={{ once: true }}
                            className="glass-card p-8 flex flex-col items-center text-center space-y-4 hover:border-primary/40 transition-colors"
                        >
                            <div className="p-4 rounded-full bg-primary/10 text-primary">
                                <tip.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold">{tip.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {tip.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
