// ================= CATEGORY =================

export interface Category {
    id: string;

    name: string;

    slug: string;

    icon?: string | null;

    description?: string | null;

    folderName?: string | null;

    coverImage?: string | null;

    imageUrl?: string | null;

    thumbnailUrl?: string | null;

    active?: boolean;

    sortOrder?: number;

    order?: number;

    wallpaperCount?: number;

    count?: number;

    createdAt: string;

    updatedAt?: string;
}
