import API from "./api";

import {
    AuthRequest,
    AuthResponse
} from '@/types/auth';

import { ApiResponse } from '@/types/wallpaper';



export interface User {
    id: string;
    email: string;
    username: string | null;
    avatarUrl: string | null;
    bio: string | null;
    isPremium: boolean;

    stats: {
        favorites: number;
        downloads: number;
        collections: number;
    };

    createdAt: string;
}




export const userService = {


    // GET ALL USERS
    async list() {

        const { data } =
            await API.get<User[]>(
                "/users"
            );

        return data;

    },



    // GET SINGLE USER
    async getById(id: string) {

        const { data } =
            await API.get<User>(
                `/users/${id}`
            );

        return data;

    },



    // DELETE USER
    async remove(id: string) {

        const { data } =
            await API.delete(
                `/users/${id}`
            );

        return data;

    },


};