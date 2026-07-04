import API from "./api";

import {
    Wallpaper,
    ApiResponse,
    WallpaperQuality,
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

const normalizeWallpaper = (item: any): Wallpaper => {
    const imageUrl =
        absoluteBackendUrl(item.imageUrl) ||
        absoluteBackendUrl(item.displayPath) ||
        absoluteBackendUrl(item.originalPath);

    const thumbnailUrl =
        absoluteBackendUrl(item.thumbnailUrl) ||
        absoluteBackendUrl(item.thumbnailPath) ||
        imageUrl;

    const downloadUrl =
        absoluteBackendUrl(item.downloadUrl) ||
        absoluteBackendUrl(item.originalPath) ||
        imageUrl;

    return {
        ...item,
        imageUrl,
        thumbnailUrl,
        downloadUrl,
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

    values.forEach((tag, index) => {
        formData.append(`tags[${index}]`, tag);
    });
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
// Backend multipart field names: image, title, description, categoryId,
// quality, isPremium, isFeatured, featuredOrder, tags[index]
// =============================

export interface CreateWallpaperRequest {
    title: string;
    description?: string;
    categoryId: string;
    quality?: string;
    isPremium: boolean;
    isFeatured: boolean;
    featuredOrder?: number;
    tags?: string[] | string;
    image: File;
}

export const createWallpaper = async (
    payload: CreateWallpaperRequest,
) => {
    const formData = new FormData();

    formData.append("image", payload.image);
    formData.append("title", payload.title);
    formData.append("categoryId", payload.categoryId);
    formData.append("quality", normalizeQuality(payload.quality));
    formData.append("isPremium", String(payload.isPremium));
    formData.append("isFeatured", String(payload.isFeatured));

    if (payload.description) {
        formData.append("description", payload.description);
    }

    if (payload.featuredOrder !== undefined) {
        formData.append("featuredOrder", String(payload.featuredOrder));
    }

    appendTags(formData, payload.tags);

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
        formData.append("images", item.file);
        formData.append(`titles[${index}]`, item.title);
        formData.append(`descriptions[${index}]`, item.description ?? "");
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
    quality?: string;
    isPremium?: boolean;
    isFeatured?: boolean;
    featuredOrder?: number;
    active?: boolean;
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
