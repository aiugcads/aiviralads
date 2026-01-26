
import productShowcase1 from "@/assets/product-showcase-1.webp";
import productShowcase2 from "@/assets/product-showcase-2.webp";
import productShowcase3 from "@/assets/product-showcase-3.webp";

export interface Video {
  id: string;
  title: string;
  thumbnail?: string;
  url: string;
}

export interface Influencer {
  id: string;
  name: string;
  gender: "Male" | "Female";
  image: string;
  category: string;
  followers: string;
  videos: Video[];
}

export const influencers: Influencer[] = [
  {
    id: "1",
    name: "Sarah Jenkins",
    gender: "Female",
    image: productShowcase1,
    category: "Lifestyle",
    followers: "1.2M",
    videos: [
      {
        id: "v1",
        title: "Morning Routine",
        url: "https://res.cloudinary.com/dnwui208j/video/upload/v1768640652/merged_video_1768584753_bakzq2.mp4",
      },
      {
        id: "v2",
        title: "Product Review",
        url: "https://res.cloudinary.com/dnwui208j/video/upload/v1768732719/merged_kuvana_video_lk5fhc.mp4",
      },
      {
        id: "v3",
        title: "Travel Vlog",
        url: "https://res.cloudinary.com/dnwui208j/video/upload/v1768732714/merged_mamaerath_shampoo_video_lij1ma.mp4",
      },
    ],
  },
  {
    id: "2",
    name: "Mike Chen",
    gender: "Male",
    image: productShowcase2,
    category: "Tech",
    followers: "850K",
    videos: [
      {
        id: "v4",
        title: "Gadget Unboxing",
        url: "https://res.cloudinary.com/dnwui208j/video/upload/v1768732703/merged_derme_serum_video_qtoixc.mp4",
      },
      {
        id: "v5",
        title: "Tech Tips",
        url: "https://res.cloudinary.com/dnwui208j/video/upload/v1768732700/merged_tulshi_tea_video_hpn3sn.mp4",
      },
    ],
  },
  {
    id: "3",
    name: "Jessica Lee",
    gender: "Female",
    image: productShowcase3,
    category: "Beauty",
    followers: "2.5M",
    videos: [
      {
        id: "v6",
        title: "Skincare 101",
        url: "https://res.cloudinary.com/dnwui208j/video/upload/v1768640652/merged_video_1768584753_bakzq2.mp4",
      },
      {
        id: "v7",
        title: "Makeup Tutorial",
        url: "https://res.cloudinary.com/dnwui208j/video/upload/v1768732714/merged_mamaerath_shampoo_video_lij1ma.mp4",
      },
    ],
  },
  {
    id: "4",
    name: "David Smith",
    gender: "Male",
    image: productShowcase2,
    category: "Fitness",
    followers: "500K",
    videos: [
      {
        id: "v8",
        title: "Workout Routine",
        url: "https://res.cloudinary.com/dnwui208j/video/upload/v1768640638/merged_video_1768386710_ftpil8.mp4",
      },
    ],
  },
    {
    id: "5",
    name: "Emily Davis",
    gender: "Female",
    image: productShowcase1,
    category: "Fashion",
    followers: "1.8M",
    videos: [
      {
        id: "v9",
        title: "Winter Haul",
        url: "https://res.cloudinary.com/dnwui208j/video/upload/v1768732703/merged_derme_serum_video_qtoixc.mp4",
      },
    ],
  },
];
