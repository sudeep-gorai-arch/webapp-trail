import { Category } from "./category";

// ================= API =================

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;

    pagination?: {
        total: number;
        limit: number;
        offset: number;
        hasMore: boolean;
    };
}

export type WallpaperQuality =
    | "HD"
    | "FULL_HD"
    | "QHD"
    | "UHD_4K"
    | "UHD_8K";

// ================= WALLPAPER =================

export interface Wallpaper {
    id: string;

    title: string;

    subtitle?: string;

    description?: string | null;

    slug?: string;

    imageUrl: string;

    thumbnailUrl: string;

    downloadUrl?: string;

    videoUrl?: string;

    resolution?: string;

    width?: number;

    height?: number;

    aspectRatio?: number;

    quality?: WallpaperQuality | string;

    format?: string;

    categoryId?: string;

    category?: Category | null;

    likes?: number;

    likeCount?: number;

    downloads?: number;

    downloadCount?: number;

    views?: number;

    viewCount?: number;

    isFeatured: boolean;

    featuredOrder?: number;

    isPremium: boolean;

    active: boolean;

    status?: string;

    dominantColor?: string | null;

    blurHash?: string | null;

    cacheVersion?: number;

    tags?: string[];

    variants?: {
        type: string;
        url: string;
        width?: number;
        height?: number;
        size?: number;
        format?: string;
        quality?: number;
        isDefault?: boolean;
    }[];

    isFavorite?: boolean;

    isLiked?: boolean;

    createdAt: string;

    updatedAt: string;
}

// ================= FAVORITE =================

export interface Favorite {
    id: string;

    wallpaper: Wallpaper;

    createdAt: string;
}

// ================= DOWNLOAD =================

export interface Download {
    id: string;

    wallpaper: Wallpaper;

    createdAt: string;
}
