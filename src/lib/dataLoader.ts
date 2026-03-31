
import productShowcase1 from "@/assets/product-showcase-1.webp";
import productShowcase2 from "@/assets/product-showcase-2.webp";
import productShowcase3 from "@/assets/product-showcase-3.webp";
import { influencers } from "@/data/influencers";

export interface PortfolioItem {
    id: number;
    image: string;
    videoUrl: string;
    client: string;
    type: string;
    result: string;
    description: string;
    aspectRatio: string;
}

export interface Influencer {
    id: string;
    name: string;
    gender: "Male" | "Female";
    image: string;
    category: string;
    followers: string;
    videos: { id: string; title: string; url: string }[];
}

export interface ProductShoot {
    id: string;
    label: string;
    sourceInfo: string;
    sourceImg: string;
    assets: { type: string; label: string; img: string; color: string }[];
}

const STATIC_PORTFOLIO_ITEMS: PortfolioItem[] = [
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


import * as XLSX from 'xlsx';

export const fetchExcelData = async () => {
    try {
        const response = await fetch('/aiviral_data.xlsx');
        if (!response.ok) {
            console.warn("Failed to fetch Excel file, using static data");
            return {
                portfolio: STATIC_PORTFOLIO_ITEMS,
                influencers: influencers,
                productShoots: []
            };
        }

        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });

        // Parse Portfolio Items (brands_ads)
        const portfolioSheetName = 'brands_ads';
        let portfolioItems: PortfolioItem[] = [];
        if (workbook.Sheets[portfolioSheetName]) {
            const rawData = XLSX.utils.sheet_to_json(workbook.Sheets[portfolioSheetName]);
            portfolioItems = rawData.map((row: any, index) => {
                // Determine aspect ratio relative to standard 9:16 (0.5625) or 16:9 (1.77)
                // The sample showed 0.386... which is very narrow? Wait, 1080/1920 = 0.5625.
                // If the value is numeric, we might just defaulting to 9:16 for now as safest bet for mobile UGC.
                const ar = row['Aspect Ratio'];
                let aspectRatioStr = "9:16";
                if (typeof ar === 'string' && ar.includes(':')) {
                    aspectRatioStr = ar;
                } else if (typeof ar === 'number') {
                    aspectRatioStr = ar > 1 ? "16:9" : "9:16";
                }

                return {
                    id: index + 100, // Offset to avoid conflict with static
                    image: productShowcase1, // Default placeholder as no image column
                    videoUrl: row['Video Url'] || "",
                    client: row[' Company/Brand Name'] || "Brand",
                    type: "UGC Ad",
                    result: "High Engagement", // Static default
                    description: row['Message'] || "High converting user generated content.",
                    aspectRatio: aspectRatioStr
                };
            }).filter(item => item.videoUrl); // Only keep items with videos
        }

        // Parse Influencers (our influencer)
        const influencerSheetName = 'our influencer';
        let parsedInfluencers: Influencer[] = [];
        if (workbook.Sheets[influencerSheetName]) {
            const rawData = XLSX.utils.sheet_to_json(workbook.Sheets[influencerSheetName]);
            parsedInfluencers = rawData.map((row: any, index) => {
                // Assign a subset of portfolio videos to each influencer to simulate content
                // We'll cycle through portfolio items
                const assignedVideos = [];
                if (portfolioItems.length > 0) {
                    // Give each influencer 3 videos, shifting by index
                    const startIndex = (index * 2) % portfolioItems.length; // Overlap slightly
                    for (let i = 0; i < 3; i++) {
                        const videoItem = portfolioItems[(startIndex + i) % portfolioItems.length];
                        if (videoItem) {
                            assignedVideos.push({
                                id: `vid-${index}-${i}`,
                                title: videoItem.client, // Use brand name as title
                                url: videoItem.videoUrl
                            });
                        }
                    }
                }

                return {
                    id: `excel-${index}`,
                    name: row['Name'] || "Influencer",
                    gender: row['Gender'] as "Male" | "Female" || "Female",
                    image: row['Image URL'] || productShowcase1,
                    category: "Content Creator", // Default
                    followers: "Growing", // Default
                    videos: assignedVideos.length > 0 ? assignedVideos : []
                };
            }).filter(inf => inf.image !== productShowcase1); // Filter if image URL is missing
        }

        // Parse Product Shoot (product shoot)
        const productShootSheetName = 'product shoot';
        let parsedProductShoots: ProductShoot[] = [];
        if (workbook.Sheets[productShootSheetName]) {
            const rawData = XLSX.utils.sheet_to_json(workbook.Sheets[productShootSheetName]);
            parsedProductShoots = rawData.map((row: any, index) => {
                const assets = [];
                for (let i = 1; i <= 5; i++) {
                    const url = row[`URL${i}`];
                    if (url) {
                        // Specific Indimums check: URL3 and URL4 (indices 3 and 4) are videos
                        const brandName = (row['Brand Name'] || "").toLowerCase();
                        const isIndimums = brandName.includes('indimum') || brandName.includes('imdimum');

                        let isVideo = url.toLowerCase().endsWith('.mp4') ||
                            url.toLowerCase().endsWith('.webm') ||
                            url.toLowerCase().includes('/video/');

                        if (isIndimums && (i === 3 || i === 4)) {
                            isVideo = true;
                        }

                        assets.push({
                            type: isVideo ? 'video' : 'image',
                            label: `Variant ${i}`,
                            img: url,
                            color: "from-blue-500/20" // Default color
                        });
                    }
                }

                return {
                    id: `shoot-${index}`,
                    label: row['Brand Name'] || "Product",
                    sourceInfo: "Original Product",
                    sourceImg: row['Product orignal image url'] || productShowcase1,
                    assets: assets
                };
            });
        }

        // Merge with static data or replace?
        // User said "connect all influencer image form these excel file".
        // Usually implies replacing or adding. I will return the parsed data.
        // If parsed data is empty, fallback to static.

        return {
            portfolio: portfolioItems.length > 0 ? portfolioItems : STATIC_PORTFOLIO_ITEMS,
            influencers: parsedInfluencers.length > 0 ? parsedInfluencers : influencers,
            productShoots: parsedProductShoots
        };

    } catch (error) {
        console.error("Error loading Excel data:", error);
        return {
            portfolio: STATIC_PORTFOLIO_ITEMS,
            influencers: influencers,
            productShoots: []
        };
    }
};
