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

// ================= WALLPAPER =================


export interface Wallpaper {

    id: string;


    title: string;


    description?: string;


    /**
     * Mobile full image
     */
    imageUrl?: string;


    /**
     * API currently returns this
     */
    thumbnailUrl: string;


    videoUrl?: string;


    /**
     * 3840x2160
     * 7680x4320
     */
    resolution: string;


    /**
     * computed on frontend
     * 4K / 8K
     */
    quality?: string;



    category?: Category;



    likes: number;



    /**
     * OLD support
     */
    downloads?: number;



    /**
     * API field
     */
    downloadCount: number;



    isFeatured: boolean;


    isPremium: boolean;


    /**
     * Active / Inactive status
     */
    active: boolean;



    createdAt: string;


    updatedAt?: string;

}



// ================= FAVORITES =================

export interface Favorite {

    id: string;

    wallpaper: Wallpaper;


    createdAt?: string;

}



// ================= DOWNLOAD =================

export interface Download {

    id: string;


    wallpaper: Wallpaper;


    createdAt: string;

}