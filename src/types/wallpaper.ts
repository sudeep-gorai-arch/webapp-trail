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

// ================= WALLPAPER MEDIA =================

export type WallpaperMediaType = "IMAGE" | "VIDEO";

export type WallpaperQuality =
    | "HD"
    | "FULL_HD"
    | "QHD"
    | "UHD_4K"
    | "UHD_8K";

export type WallpaperVariantType =
    | "THUMBNAIL"
    | "DISPLAY"
    | "HD"
    | "FULL_HD"
    | "QHD"
    | "UHD"
    | "ORIGINAL"
    | "VIDEO"
    | "VIDEO_PREVIEW"
    | "VIDEO_THUMBNAIL";

export type WallpaperFileFormat =
    | "WEBP"
    | "JPG"
    | "PNG"
    | "AVIF"
    | "MP4"
    | "WEBM"
    | "MOV"
    | "M4V"
    | string;

// ================= WALLPAPER =================

export interface Wallpaper {
    id: string;

    title: string;

    subtitle?: string;

    description?: string | null;

    slug?: string;

    mediaType?: WallpaperMediaType | string;

    isVideo?: boolean;

    imageUrl: string;

    thumbnailUrl: string;

    downloadUrl?: string | null;

    videoUrl?: string | null;

    videoPreviewUrl?: string | null;

    videoThumbnailUrl?: string | null;

    durationSeconds?: number | null;

    videoBitrate?: number | null;

    videoFps?: number | null;

    videoSize?: number | null;

    mimeType?: string | null;

    extension?: string | null;

    resolution?: string;

    width?: number;

    height?: number;

    aspectRatio?: number;

    quality?: WallpaperQuality | string;

    format?: WallpaperFileFormat;

    categoryId?: string;

    category?: Category | null;

    likes?: number;

    likeCount?: number;

    favoriteCount?: number;

    downloads?: number;

    downloadCount?: number;

    downloadsThisWeek?: number;

    weeklyDownloads?: number;

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

    variants?: WallpaperVariant[];

    wallpaperVariants?: WallpaperVariant[];

    isFavorite?: boolean;

    isLiked?: boolean;

    createdAt: string;

    updatedAt: string;
}

export interface WallpaperVariant {
    id?: string;

    type: WallpaperVariantType | string;

    url: string;

    width?: number;

    height?: number;

    size?: number;

    format?: WallpaperFileFormat;

    quality?: number;

    compressionQuality?: number;

    isDefault?: boolean;
}

// ================= CREATE / UPDATE =================

export interface CreateWallpaperInput {
    title: string;

    description?: string;

    categoryId: string;

    mediaType?: WallpaperMediaType;

    quality?: WallpaperQuality;

    isPremium?: boolean;

    isFeatured?: boolean;

    featuredOrder?: number;

    durationSeconds?: number;

    videoBitrate?: number;

    videoFps?: number;

    tags?: string[];
}

export interface UpdateWallpaperInput {
    title?: string;

    description?: string;

    categoryId?: string;

    mediaType?: WallpaperMediaType;

    quality?: WallpaperQuality;

    isPremium?: boolean;

    isFeatured?: boolean;

    featuredOrder?: number;

    active?: boolean;

    durationSeconds?: number;

    videoBitrate?: number;

    videoFps?: number;

    tags?: string[];
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

    wallpaper?: Wallpaper;

    wallpaperId?: string;

    mediaType?: WallpaperMediaType | string;

    isVideo?: boolean;

    downloadUrl?: string | null;

    imageUrl?: string | null;

    thumbnailUrl?: string | null;

    videoUrl?: string | null;

    videoPreviewUrl?: string | null;

    videoThumbnailUrl?: string | null;

    durationSeconds?: number | null;

    videoSize?: number | null;

    mimeType?: string | null;

    extension?: string | null;

    quality?: WallpaperQuality | string;

    isPremium?: boolean;

    downloadCount?: number;

    favoriteCount?: number;

    createdAt: string;
}