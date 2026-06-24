import API from "./api";

import {
    Wallpaper,
    ApiResponse
} from "@/types/wallpaper";


// =============================
// LIST WALLPAPERS
// =============================

export const getWallpapers = (
    limit = 10,
    offset = 0,
    search = "",
    category = "",
    active = true
) => {


    const params: any = {

        limit,

        offset,

        active,

        _t: Date.now()

    };



    if (search.trim()) {

        params.search = search;

    }



    if (category.trim()) {

        params.category = category;

    }





    console.log(
        "WALLPAPER PARAMS",
        params
    );



    return API
        .get<ApiResponse<Wallpaper[]>>(

            "/wallpapers",

            {

                params,

                headers: {

                    "Cache-Control": "no-cache"

                }

            }

        )
        .then(

            res => res.data

        );


};


// =============================
// FEATURED WALLPAPERS
// =============================

export const getFeaturedWallpapers = () =>

    API
        .get<ApiResponse<Wallpaper[]>>(
            "/wallpapers/featured",
            {
                params: {
                    limit: 5
                }
            }
        )
        .then(
            r => r.data
        );




// =============================
// TRENDING WALLPAPERS
// =============================

export const getTrendingWallpapers = () =>

    API
        .get<ApiResponse<Wallpaper[]>>(
            "/wallpapers/trending",
            {
                params: {
                    limit: 10
                }
            }
        )
        .then(
            r => r.data
        );




// =============================
// WALLPAPER DETAILS
// =============================

export const getWallpaperById = (
    id: string
) =>

    API
        .get<ApiResponse<Wallpaper>>(
            `/wallpapers/${id}`
        )
        .then(
            r => r.data
        );





// =============================
// CREATE SINGLE WALLPAPER
// =============================


export interface CreateWallpaperRequest {

    title: string;

    description?: string;

    categoryId: string;

    quality: string;

    resolution: string;

    isPremium: boolean;

    isFeatured: boolean;

    image: File;

}



export const createWallpaper = (
    payload: CreateWallpaperRequest
) => {


    const formData =
        new FormData();



    Object.entries(payload)
        .forEach(
            ([key, value]) => {


                if (key === "image") {

                    formData.append(
                        "image",
                        value as File
                    );

                }
                else {

                    formData.append(
                        key,
                        String(value)
                    );

                }

            }
        );



    return API
        .post(
            "/wallpapers",
            formData, {
            timeout: 120000,
        }
        )
        .then(
            r => r.data
        );

};






// =============================
// BATCH UPLOAD
// =============================


export interface BatchWallpaperRequest {

    categoryId: string;

    quality: string;

    resolution: string;

    isPremium: boolean;

    isFeatured: boolean;


    wallpapers: {
        title: string;
        description?: string;
        file: File;
    }[];

}



export const uploadWallpapers = (
    payload: BatchWallpaperRequest
) => {


    const formData =
        new FormData();



    formData.append(
        "categoryId",
        payload.categoryId
    );


    formData.append(
        "quality",
        payload.quality
    );


    formData.append(
        "resolution",
        payload.resolution
    );


    formData.append(
        "isPremium",
        String(payload.isPremium)
    );


    formData.append(
        "isFeatured",
        String(payload.isFeatured)
    );





    payload.wallpapers.forEach(
        (item, index) => {


            formData.append(
                "images",
                item.file
            );


            formData.append(
                `titles[${index}]`,
                item.title
            );


            formData.append(
                `descriptions[${index}]`,
                item.description ?? ""
            );


        }
    );





    return API
        .post(
            "/wallpapers/batch",
            formData, {
            timeout: 120000,
        }
        )
        .then(
            r => r.data
        );


};



// =============================
// UPDATE WALLPAPER
// =============================


export const updateWallpaper = (
    id: string,
    payload: Partial<Wallpaper>
) =>

    API
        .put(
            `/wallpapers/${id}`,
            payload
        )
        .then(
            r => r.data
        );






// =============================
// DELETE WALLPAPER
// =============================


export const deleteWallpaper = (
    id: string
) =>

    API
        .delete(
            `/wallpapers/${id}`
        )
        .then(
            r => r.data
        );