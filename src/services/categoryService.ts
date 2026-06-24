import API from "./api";

import { Category } from "@/types/category";

import {
    Wallpaper,
    ApiResponse
} from "@/types/wallpaper";



// GET ALL

export const getCategories = () =>

    API
        .get<ApiResponse<Category[]>>(
            "/categories"
        )
        .then(
            r => r.data
        );




// CREATE

export const createCategory = (
    payload: {
        name: string;
        slug: string;
        icon?: string;
    }
) =>

    API
        .post(
            "/categories",
            payload
        )
        .then(
            r => r.data
        );




// UPDATE

export const updateCategory = (
    id: string,
    payload: Partial<Category>
) =>

    API
        .put(
            `/categories/${id}`,
            payload
        )
        .then(
            r => r.data
        );




// WALLPAPERS

export const getCategoryWallpapers = (
    slug: string,
    limit = 20,
    offset = 0
) =>

    API
        .get<ApiResponse<Wallpaper[]>>(
            `/categories/${slug}/wallpapers`,
            {
                params: {
                    limit,
                    offset
                }
            }
        )
        .then(
            r => r.data
        );