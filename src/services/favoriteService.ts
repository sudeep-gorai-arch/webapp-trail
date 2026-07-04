import API from "./api";

import {
    ApiResponse,
    Favorite,
} from "@/types/wallpaper";

// ==============================
// GET FAVORITES
// ==============================

export const getFavorites = async (
    limit = 20,
    offset = 0
) => {
    const response = await API.get<ApiResponse<Favorite[]>>(
        "/favorites",
        {
            params: {
                limit,
                offset,
            },
        }
    );

    return response.data;
};

// ==============================
// ADD FAVORITE
// ==============================

export const addFavorite = async (
    wallpaperId: string
) => {
    const response = await API.post<ApiResponse<null>>(
        "/favorites",
        {
            wallpaperId,
        }
    );

    return response.data;
};

// ==============================
// REMOVE FAVORITE
// ==============================

export const removeFavorite = async (
    wallpaperId: string
) => {
    const response = await API.delete<ApiResponse<null>>(
        `/favorites/${wallpaperId}`
    );

    return response.data;
};

// ==============================
// TOGGLE FAVORITE
// ==============================

export const toggleFavorite = async (
    wallpaperId: string
) => {
    const response = await API.post<ApiResponse<{
        isFavorite: boolean;
    }>>(
        `/favorites/${wallpaperId}/toggle`
    );

    return response.data;
};

// ==============================
// FAVORITE STATUS
// ==============================

export const getFavoriteStatus = async (
    wallpaperId: string
) => {
    const response = await API.get<ApiResponse<{
        isFavorite: boolean;
    }>>(
        `/favorites/${wallpaperId}/status`
    );

    return response.data;
};