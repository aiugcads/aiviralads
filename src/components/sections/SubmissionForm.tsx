import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const SubmissionForm = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { toast } = useToast();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Construct payload matching the Google Apps Script expectation
        const payload = {
            name: data.name,
            email: data.email,
            brand: data.brand,
            website: data.website,
            adType: data.adType,
            productInfo: data.description, // Mapped from 'description' to 'productInfo'
            assets: file ? `File attached: ${file.name}` : "No assets uploaded"
        };

        try {
            await fetch(
                "https://script.google.com/macros/s/AKfycbxaynrqHKxJdPk2HABL-qCPsjq3jdXfJlOtkev1cY18y8CMzs9d4XWNIwCaKyoWNnjGwQ/exec",
                {
                    method: "POST",
                    // Use text/plain to avoid CORS preflight (OPTIONS) which GAS doesn't handle.
                    // The script parses e.postData.contents so this works perfectly.
                    headers: { "Content-Type": "text/plain" },
                    body: JSON.stringify(payload),
                    mode: "no-cors",
                }
            );

            // Since 'no-cors' mode is used, we can't read the response status, 
            // so we assume success if no network error occurred.
            setIsSubmitted(true);
            toast({
                title: "Request Submitted!",
                description: "We've received your campaign request and will be in touch shortly.",
            });
        } catch (error) {
            console.error("Submission error:", error);
            toast({
                title: "Submission Failed",
                description: "There was an error sending your request. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <section id="submission-form" ref={ref} className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--neon-blue)/0.05)_0%,transparent_70%)]" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Start Your <span className="text-gradient">Viral Campaign</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Tell us about your product, and let our experts handle the creative heavy lifting.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-2xl mx-auto glass-card p-8 md:p-10"
                >
                    {isSubmitted ? (
                        <div className="text-center py-10">
                            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10 text-green-500" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Submission Successful!</h3>
                            <p className="text-muted-foreground mb-8">
                                Thank you for trusting us with your brand. Our team is already reviewing your details.
                                We will contact you at your provided email with the next steps.
                            </p>
                            <Button onClick={() => setIsSubmitted(false)} variant="outline">
                                Submit Another Product
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Your Name</Label>
                                    <Input id="name" name="name" required placeholder="John Doe" className="bg-secondary/50" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" name="email" type="email" required placeholder="john@company.com" className="bg-secondary/50" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="brand">Brand / Product Name</Label>
                                <Input id="brand" name="brand" required placeholder="e.g. SuperGlow Serum" className="bg-secondary/50" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="website">Website / Product URL</Label>
                                <Input id="website" name="website" type="url" placeholder="https://..." className="bg-secondary/50" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Product Information & Key Selling Points</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    required
                                    placeholder="Tell us what makes your product unique. Who is your target audience?"
                                    className="bg-secondary/50 min-h-[120px]"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Ad Type</Label>
                                    <Select name="adType">
                                        <SelectTrigger className="bg-secondary/50">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ugc-video">UGC Video Ad</SelectItem>
                                            <SelectItem value="static-image">Static Image Ad</SelectItem>
                                            <SelectItem value="carousel">Carousel Set</SelectItem>
                                            <SelectItem value="bundle">Full Bundle (Video + Images)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Product Images / Assets</Label>
                                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-secondary/30 transition-colors cursor-pointer relative">
                                        <Input
                                            type="file"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            onChange={handleFileChange}
                                            accept="image/*,video/*"
                                        />
                                        <div className="flex flex-col items-center gap-2">
                                            <Upload className="w-8 h-8 text-muted-foreground" />
                                            <span className="text-sm text-muted-foreground">
                                                {file ? file.name : "Click to upload or drag & drop"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button type="submit" size="lg" className="w-full glow-blue" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit Campaign Request"
                                )}
                            </Button>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
};
