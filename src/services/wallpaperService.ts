import API from "./api";

import {
    Wallpaper,
    ApiResponse,
    WallpaperQuality,
    WallpaperMediaType,
} from "@/types/wallpaper";
import { Category } from "@/types/category";

const QUALITY_MAP: Record<string, WallpaperQuality> = {
    HD: "HD",
    "1080P": "FULL_HD",
    FULL_HD: "FULL_HD",
    QHD: "QHD",
    "2K": "QHD",
    "4K": "UHD_4K",
    UHD_4K: "UHD_4K",
    "8K": "UHD_8K",
    UHD_8K: "UHD_8K",
};

const VIDEO_MIME_PREFIX = "video/";

const apiOrigin = () => {
    const baseUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "http://localhost:5000/api";

    try {
        return new URL(baseUrl).origin;
    } catch {
        return "";
    }
};

const absoluteBackendUrl = (value?: string | null) => {
    if (!value) return undefined;

    if (/^https?:\/\//i.test(value)) {
        return value;
    }

    if (value.startsWith("/")) {
        return `${apiOrigin()}${value}`;
    }

    return value;
};

const normalizeQuality = (quality?: string) => {
    if (!quality) return "UHD_4K";

    return QUALITY_MAP[quality.toUpperCase()] ?? "UHD_4K";
};

const buildResolution = (item: any) => {
    if (item.resolution) return item.resolution;

    if (item.width && item.height) {
        return `${item.width}x${item.height}`;
    }

    return "";
};

const isVideoFile = (file?: File | null) => {
    if (!file) return false;

    const type = String(file.type || "").toLowerCase();

    if (type.startsWith(VIDEO_MIME_PREFIX)) {
        return true;
    }

    const name = String(file.name || "").toLowerCase();

    return /\.(mp4|webm|mov|m4v)$/i.test(name);
};

const normalizeMediaTypeFromFile = (
    mediaType?: WallpaperMediaType,
    file?: File | null,
    videoFile?: File | null,
): WallpaperMediaType => {
    if (mediaType === "VIDEO" || mediaType === "IMAGE") {
        return mediaType;
    }

    if (videoFile || isVideoFile(file)) {
        return "VIDEO";
    }

    return "IMAGE";
};

const normalizeWallpaper = (item: any): Wallpaper => {
    const mediaType = String(
        item.mediaType ||
        item.media_type ||
        (item.videoUrl || item.videoPath ? "VIDEO" : "IMAGE"),
    ).toUpperCase();

    const isVideo = mediaType === "VIDEO";

    const imageUrl =
        absoluteBackendUrl(item.imageUrl) ||
        absoluteBackendUrl(item.displayPath) ||
        absoluteBackendUrl(item.originalPath) ||
        absoluteBackendUrl(item.videoPreviewUrl) ||
        absoluteBackendUrl(item.videoPreviewPath) ||
        absoluteBackendUrl(item.thumbnailUrl) ||
        absoluteBackendUrl(item.thumbnailPath);

    const videoUrl =
        absoluteBackendUrl(item.videoUrl) ||
        absoluteBackendUrl(item.videoPath);

    const videoPreviewUrl =
        absoluteBackendUrl(item.videoPreviewUrl) ||
        absoluteBackendUrl(item.videoPreviewPath) ||
        imageUrl;

    const videoThumbnailUrl =
        absoluteBackendUrl(item.videoThumbnailUrl) ||
        absoluteBackendUrl(item.videoThumbnailPath) ||
        absoluteBackendUrl(item.thumbnailUrl) ||
        absoluteBackendUrl(item.thumbnailPath) ||
        videoPreviewUrl ||
        imageUrl;

    const thumbnailUrl =
        absoluteBackendUrl(item.thumbnailUrl) ||
        absoluteBackendUrl(item.thumbnailPath) ||
        videoThumbnailUrl ||
        imageUrl;

    const downloadUrl =
        absoluteBackendUrl(item.downloadUrl) ||
        (isVideo ? videoUrl : undefined) ||
        absoluteBackendUrl(item.originalPath) ||
        imageUrl ||
        thumbnailUrl;

    return {
        ...item,

        mediaType: isVideo ? "VIDEO" : "IMAGE",

        isVideo,

        imageUrl: imageUrl || "",

        thumbnailUrl: thumbnailUrl || imageUrl || "",

        downloadUrl: downloadUrl || null,

        videoUrl: videoUrl || null,

        videoPreviewUrl: videoPreviewUrl || null,

        videoThumbnailUrl: videoThumbnailUrl || null,

        durationSeconds:
            item.durationSeconds ?? item.duration_seconds ?? null,

        videoBitrate:
            item.videoBitrate ?? item.video_bitrate ?? null,

        videoFps:
            item.videoFps ?? item.video_fps ?? null,

        videoSize:
            item.videoSize ?? item.video_size ?? null,

        mimeType:
            item.mimeType ?? item.mime_type ?? null,

        resolution: buildResolution(item),

        likes: item.likes ?? item.likeCount ?? 0,

        likeCount: item.likeCount ?? item.likes ?? 0,

        downloads: item.downloads ?? item.downloadCount ?? 0,

        downloadCount: item.downloadCount ?? item.downloads ?? 0,

        views: item.views ?? item.viewCount ?? 0,

        viewCount: item.viewCount ?? item.views ?? 0,

        isPremium: item.isPremium ?? false,

        isFeatured: item.isFeatured ?? false,

        active: item.active ?? true,
    };
};

const normalizeCategoryWallpapers = (response: ApiResponse<any>) => {
    if (Array.isArray(response.data)) {
        return {
            ...response,
            data: response.data.map(normalizeWallpaper),
        } as ApiResponse<Wallpaper[]>;
    }

    if (response.data?.wallpapers) {
        return {
            ...response,
            data: {
                category: response.data.category as Category,
                wallpapers: response.data.wallpapers.map(normalizeWallpaper),
            },
        } as ApiResponse<{
            category: Category;
            wallpapers: Wallpaper[];
        }>;
    }

    return response;
};

const appendTags = (formData: FormData, tags?: string[] | string) => {
    const values = Array.isArray(tags)
        ? tags
        : (tags ?? "")
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);

    values.forEach((tag) => {
        formData.append("tags", tag);
    });
};

const appendOptionalNumber = (
    formData: FormData,
    key: string,
    value?: number | string | null,
) => {
    if (value === undefined || value === null || value === "") {
        return;
    }

    formData.append(key, String(value));
};

const appendCommonWallpaperFields = (
    formData: FormData,
    payload: {
        title?: string;
        description?: string;
        categoryId: string;
        mediaType?: WallpaperMediaType;
        quality?: string;
        isPremium: boolean;
        isFeatured: boolean;
        featuredOrder?: number;
        durationSeconds?: number | string | null;
        videoBitrate?: number | string | null;
        videoFps?: number | string | null;
        tags?: string[] | string;
    },
) => {
    if (payload.title) {
        formData.append("title", payload.title);
    }

    formData.append("categoryId", payload.categoryId);
    formData.append("quality", normalizeQuality(payload.quality));
    formData.append("isPremium", String(payload.isPremium));
    formData.append("isFeatured", String(payload.isFeatured));

    if (payload.mediaType) {
        formData.append("mediaType", payload.mediaType);
    }

    if (payload.description) {
        formData.append("description", payload.description);
    }

    if (payload.featuredOrder !== undefined) {
        formData.append("featuredOrder", String(payload.featuredOrder));
    }

    appendOptionalNumber(formData, "durationSeconds", payload.durationSeconds);
    appendOptionalNumber(formData, "videoBitrate", payload.videoBitrate);
    appendOptionalNumber(formData, "videoFps", payload.videoFps);

    appendTags(formData, payload.tags);
};

// =============================
// LIST WALLPAPERS
// =============================

export const getWallpapers = async (
    limit = 10,
    offset = 0,
    search = "",
    category = "",
    active: boolean | undefined = true,
    extra?: {
        premium?: boolean;
        featured?: boolean;
        quality?: WallpaperQuality;
        mediaType?: WallpaperMediaType;
        sort?: "latest" | "popular" | "downloads" | "likes" | "featured";
    },
) => {
    const params: Record<string, string | number | boolean | undefined> = {
        limit,
        offset,
        active,
        ...extra,
    };

    if (search.trim()) {
        params.search = search.trim();
    }

    if (category.trim()) {
        params.category = category.trim();
    }

    const response = await API.get<ApiResponse<Wallpaper[]>>(
        "/wallpapers",
        {
            params,
            headers: {
                "Cache-Control": "no-cache",
            },
        },
    );

    return {
        ...response.data,
        data: (response.data.data || []).map(normalizeWallpaper),
    };
};

// =============================
// FEATURED WALLPAPERS
// =============================

export const getFeaturedWallpapers = async (limit = 5) => {
    const response = await API.get<ApiResponse<Wallpaper[]>>(
        "/wallpapers/featured",
        {
            params: {
                limit,
            },
        },
    );

    return {
        ...response.data,
        data: (response.data.data || []).map(normalizeWallpaper),
    };
};

// =============================
// TRENDING WALLPAPERS
// =============================

export const getTrendingWallpapers = async (limit = 10) => {
    const response = await API.get<ApiResponse<Wallpaper[]>>(
        "/wallpapers/trending",
        {
            params: {
                limit,
            },
        },
    );

    return {
        ...response.data,
        data: (response.data.data || []).map(normalizeWallpaper),
    };
};

// =============================
// PREMIUM WALLPAPERS
// =============================

export const getPremiumWallpapers = async (limit = 20) => {
    const response = await API.get<ApiResponse<Wallpaper[]>>(
        "/wallpapers/premium",
        {
            params: {
                limit,
            },
        },
    );

    return {
        ...response.data,
        data: (response.data.data || []).map(normalizeWallpaper),
    };
};

// =============================
// WALLPAPER DETAILS
// =============================

export const getWallpaperById = async (id: string) => {
    const response = await API.get<ApiResponse<Wallpaper>>(
        `/wallpapers/${id}`,
    );

    return {
        ...response.data,
        data: normalizeWallpaper(response.data.data),
    };
};

// =============================
// CREATE SINGLE WALLPAPER
// =============================

export interface CreateWallpaperRequest {
    title: string;
    description?: string;
    categoryId: string;
    mediaType?: WallpaperMediaType;
    quality?: string;
    isPremium: boolean;
    isFeatured: boolean;
    featuredOrder?: number;
    tags?: string[] | string;

    image?: File;
    video?: File;
    previewImage?: File;
    thumbnail?: File;

    durationSeconds?: number | string | null;
    videoBitrate?: number | string | null;
    videoFps?: number | string | null;
}

export const createWallpaper = async (
    payload: CreateWallpaperRequest,
) => {
    const formData = new FormData();

    const mediaType = normalizeMediaTypeFromFile(
        payload.mediaType,
        payload.image,
        payload.video,
    );

    appendCommonWallpaperFields(formData, {
        ...payload,
        mediaType,
    });

    if (mediaType === "VIDEO") {
        if (!payload.video && payload.image && isVideoFile(payload.image)) {
            formData.append("video", payload.image);
        } else if (payload.video) {
            formData.append("video", payload.video);
        }

        if (payload.previewImage) {
            formData.append("previewImage", payload.previewImage);
        }

        if (payload.thumbnail) {
            formData.append("thumbnail", payload.thumbnail);
        }
    } else if (payload.image) {
        formData.append("image", payload.image);
    }

    const response = await API.post<ApiResponse<Wallpaper>>(
        "/wallpapers",
        formData,
    );

    return {
        ...response.data,
        data: normalizeWallpaper(response.data.data),
    };
};

// =============================
// BATCH UPLOAD
// =============================

export interface BatchWallpaperRequest {
    categoryId: string;
    quality?: string;
    isPremium: boolean;
    isFeatured: boolean;
    featuredOrder?: number;
    tags?: string[] | string;

    wallpapers: {
        title: string;
        description?: string;
        file: File;
        mediaType?: WallpaperMediaType;
        previewImage?: File;
        thumbnail?: File;
        durationSeconds?: number | string | null;
        videoBitrate?: number | string | null;
        videoFps?: number | string | null;
    }[];
}

export const uploadWallpapers = async (
    payload: BatchWallpaperRequest,
) => {
    const formData = new FormData();

    formData.append("categoryId", payload.categoryId);
    formData.append("quality", normalizeQuality(payload.quality));
    formData.append("isPremium", String(payload.isPremium));
    formData.append("isFeatured", String(payload.isFeatured));

    if (payload.featuredOrder !== undefined) {
        formData.append("featuredOrder", String(payload.featuredOrder));
    }

    appendTags(formData, payload.tags);

    payload.wallpapers.forEach((item, index) => {
        const mediaType = normalizeMediaTypeFromFile(
            item.mediaType,
            item.file,
        );

        if (mediaType === "VIDEO") {
            formData.append("videos", item.file);

            if (item.previewImage) {
                formData.append("previewImages", item.previewImage);
            }

            if (item.thumbnail) {
                formData.append("thumbnails", item.thumbnail);
            }
        } else {
            formData.append("images", item.file);
        }

        formData.append(`titles[${index}]`, item.title);
        formData.append(`descriptions[${index}]`, item.description ?? "");

        appendOptionalNumber(
            formData,
            `durationSeconds[${index}]`,
            item.durationSeconds,
        );

        appendOptionalNumber(
            formData,
            `videoBitrate[${index}]`,
            item.videoBitrate,
        );

        appendOptionalNumber(
            formData,
            `videoFps[${index}]`,
            item.videoFps,
        );
    });

    const response = await API.post<ApiResponse<Wallpaper[]>>(
        "/wallpapers/batch",
        formData,
    );

    return {
        ...response.data,
        data: (response.data.data || []).map(normalizeWallpaper),
    };
};

// =============================
// UPDATE WALLPAPER
// =============================

export interface UpdateWallpaperRequest {
    title?: string;
    slug?: string;
    description?: string | null;
    categoryId?: string;
    mediaType?: WallpaperMediaType;
    quality?: string;
    isPremium?: boolean;
    isFeatured?: boolean;
    featuredOrder?: number;
    active?: boolean;
    durationSeconds?: number | string | null;
    videoBitrate?: number | string | null;
    videoFps?: number | string | null;
    tags?: string[];
}

export const updateWallpaper = async (
    id: string,
    payload: UpdateWallpaperRequest,
) => {
    const body = {
        ...payload,
        quality: payload.quality
            ? normalizeQuality(payload.quality)
            : undefined,
    };

    const response = await API.put<ApiResponse<Wallpaper>>(
        `/wallpapers/${id}`,
        body,
    );

    return {
        ...response.data,
        data: normalizeWallpaper(response.data.data),
    };
};

// =============================
// DELETE WALLPAPER
// =============================

export const deleteWallpaper = async (id: string) => {
    const response = await API.delete<ApiResponse<{ deleted: boolean }>>(
        `/wallpapers/${id}`,
    );

    return response.data;
};

// =============================
// RELATED WALLPAPERS
// =============================

export const getRelatedWallpapers = async (
    id: string,
    limit = 10,
) => {
    const response = await API.get<ApiResponse<Wallpaper[]>>(
        `/wallpapers/${id}/related`,
        {
            params: { limit },
        },
    );

    return {
        ...response.data,
        data: (response.data.data || []).map(normalizeWallpaper),
    };
};

// =============================
// SEARCH
// Backend search endpoint expects q, not search.
// =============================

export const searchWallpapers = async (
    q: string,
    limit = 20,
    offset = 0,
) => {
    const response = await API.get<ApiResponse<Wallpaper[]>>(
        "/wallpapers/search",
        {
            params: {
                q,
                limit,
                offset,
            },
        },
    );

    return {
        ...response.data,
        data: (response.data.data || []).map(normalizeWallpaper),
    };
};

// =============================
// CATEGORY
// =============================

export const getCategoryWallpapers = async (
    slug: string,
    limit = 20,
    offset = 0,
) => {
    const response = await API.get<ApiResponse<any>>(
        `/wallpapers/category/${slug}`,
        {
            params: {
                limit,
                offset,
            },
        },
    );

    return normalizeCategoryWallpapers(response.data);
};

// =============================
// TOGGLE FEATURED
// =============================

export const toggleFeatured = async (id: string) => {
    const response = await API.patch<ApiResponse<Wallpaper>>(
        `/wallpapers/${id}/featured`,
    );

    return {
        ...response.data,
        data: normalizeWallpaper(response.data.data),
    };
};

// =============================
// TOGGLE PREMIUM
// =============================

export const togglePremium = async (id: string) => {
    const response = await API.patch<ApiResponse<Wallpaper>>(
        `/wallpapers/${id}/premium`,
    );

    return {
        ...response.data,
        data: normalizeWallpaper(response.data.data),
    };
};

// =============================
// TOGGLE ACTIVE
// =============================

export const toggleActive = async (id: string) => {
    const response = await API.patch<ApiResponse<Wallpaper>>(
        `/wallpapers/${id}/active`,
    );

    return {
        ...response.data,
        data: normalizeWallpaper(response.data.data),
    };
};

// =============================
// VIEW COUNT
// =============================

export const incrementView = async (id: string) => {
    const response = await API.post<ApiResponse<{ success: boolean }>>(
        `/wallpapers/${id}/view`,
    );

    return response.data;
};

// =============================
// DOWNLOAD COUNT
// =============================

export const incrementDownload = async (id: string) => {
    const response = await API.post<ApiResponse<{ success: boolean }>>(
        `/wallpapers/${id}/download`,
    );

    return response.data;
};