import API from "./api";

import { Category } from "@/types/category";
import { Wallpaper, ApiResponse } from "@/types/wallpaper";

export interface CategoryPayload {
    name: string;
    slug?: string;
    icon?: string;
    description?: string;
    active?: boolean;
    sortOrder?: number;
    thumbnail?: File | null;
}

const toCategoryFormData = (payload: CategoryPayload | FormData) => {
    if (payload instanceof FormData) {
        return payload;
    }

    const formData = new FormData();

    formData.append("name", payload.name);

    if (payload.slug) {
        formData.append("slug", payload.slug);
    }

    if (payload.icon) {
        formData.append("icon", payload.icon);
    }

    if (payload.description) {
        formData.append("description", payload.description);
    }

    if (payload.active !== undefined) {
        formData.append("active", String(payload.active));
    }

    if (payload.sortOrder !== undefined) {
        formData.append("sortOrder", String(payload.sortOrder));
    }

    if (payload.thumbnail) {
        formData.append("thumbnail", payload.thumbnail);
    }

    return formData;
};

// ==============================
// GET ALL CATEGORIES
// ==============================

export const getCategories = async (
    params?: {
        active?: boolean;
        search?: string;
        limit?: number;
        offset?: number;
    },
) => {
    const response = await API.get<ApiResponse<Category[]>>(
        "/categories",
        {
            params,
        },
    );

    return response.data;
};

// ==============================
// GET CATEGORY BY SLUG
// ==============================

export const getCategory = async (slug: string) => {
    const response = await API.get<ApiResponse<Category>>(
        `/categories/${slug}`,
    );

    return response.data;
};

// ==============================
// CREATE CATEGORY
// multipart/form-data: name, slug, icon, description, active, sortOrder, thumbnail
// ==============================

export const createCategory = async (
    payload: CategoryPayload | FormData,
) => {
    const response = await API.post<ApiResponse<Category>>(
        "/categories",
        toCategoryFormData(payload),
    );

    return response.data;
};

// ==============================
// UPDATE CATEGORY
// Backend expects slug in URL, not category id.
// ==============================

export const updateCategory = async (
    slug: string,
    payload: Partial<CategoryPayload> | FormData,
) => {
    const response = await API.put<ApiResponse<Category>>(
        `/categories/${slug}`,
        payload instanceof FormData ? payload : toCategoryFormData(payload as CategoryPayload),
    );

    return response.data;
};

// ==============================
// DELETE CATEGORY
// ==============================

export const deleteCategory = async (slug: string) => {
    const response = await API.delete<ApiResponse<{
        deleted: boolean;
        category: Category;
    }>>(`/categories/${slug}`);

    return response.data;
};

// ==============================
// TOGGLE ACTIVE
// ==============================

export const toggleCategory = async (slug: string) => {
    const response = await API.patch<ApiResponse<Category>>(
        `/categories/${slug}/toggle`,
    );

    return response.data;
};

// ==============================
// REORDER
// ==============================

export const reorderCategory = async (
    slug: string,
    sortOrder: number,
) => {
    const response = await API.patch<ApiResponse<Category>>(
        `/categories/${slug}/reorder`,
        {
            sortOrder,
        },
    );

    return response.data;
};

// ==============================
// CATEGORY WALLPAPERS
// Backend response data shape: { category, wallpapers }
// ==============================

export const getCategoryWallpapers = async (
    slug: string,
    limit = 20,
    offset = 0,
) => {
    const response = await API.get<ApiResponse<{
        category: Category;
        wallpapers: Wallpaper[];
    }>>(
        `/wallpapers/category/${slug}`,
        {
            params: {
                limit,
                offset,
            },
        },
    );

    return response.data;
};
