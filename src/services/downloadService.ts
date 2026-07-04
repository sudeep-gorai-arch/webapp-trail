import API from "./api";

import {
    ApiResponse,
    Download,
} from "@/types/wallpaper";

// ==============================
// USER DOWNLOAD
// ==============================

export const recordDownload = async (
    wallpaperId: string,
) => {
    const response = await API.post<ApiResponse<null>>(
        "/downloads",
        {
            wallpaperId,
        },
    );

    return response.data;
};

// ==============================
// PUBLIC DOWNLOAD
// ==============================

export const recordPublicDownload = async (
    wallpaperId: string,
) => {
    const response = await API.post<ApiResponse<null>>(
        "/downloads/public",
        {
            wallpaperId,
        },
    );

    return response.data;
};

// ==============================
// COMPATIBILITY ALIAS USED BY WEBSITE COMPONENTS
// ==============================

export const addDownload = async (
    wallpaperId: string,
) => {
    const hasToken =
        typeof window !== "undefined" &&
        Boolean(localStorage.getItem("token"));

    return hasToken
        ? recordDownload(wallpaperId)
        : recordPublicDownload(wallpaperId);
};

// ==============================
// DOWNLOAD HISTORY
// ==============================

export const getDownloads = async (
    limit = 20,
    offset = 0,
) => {
    const response = await API.get<ApiResponse<Download[]>>(
        "/downloads",
        {
            params: {
                limit,
                offset,
            },
        },
    );

    return response.data;
};
