import API from "./api";

import { ApiResponse } from "@/types/wallpaper";

export interface User {
    id: string;
    email: string;
    username: string | null;
    avatarUrl: string | null;
    bio: string | null;
    authProvider?: "LOCAL" | "GOOGLE";
    isPremium: boolean;
    premiumUntil?: string | null;
    favoriteCount?: number;
    dailyDownloadCount?: number;

    role?: {
        id: string;
        name: string;
        description?: string | null;
    } | null;

    stats: {
        favorites: number;
        downloads: number;
        likes: number;
        subscriptions?: number;
        collections?: number;
    };

    createdAt: string;
    updatedAt?: string;
}

const normalizeUser = (user: any): User => ({
    ...user,
    username: user.username ?? "User",
    avatarUrl: user.avatarUrl ?? null,
    bio: user.bio ?? null,
    isPremium: user.isPremium ?? false,
    stats: {
        favorites: user.stats?.favorites ?? user.favoriteCount ?? 0,
        downloads: user.stats?.downloads ?? user.dailyDownloadCount ?? 0,
        likes: user.stats?.likes ?? 0,
        subscriptions: user.stats?.subscriptions ?? 0,
        collections: user.stats?.collections ?? 0,
    },
});

export const userService = {
    // ==============================
    // CURRENT USER
    // ==============================

    async me() {
        const response = await API.get<ApiResponse<User>>(
            "/users/me",
        );

        return {
            ...response.data,
            data: normalizeUser(response.data.data),
        };
    },

    // ==============================
    // UPDATE PROFILE
    // Backend supports username, bio, avatarUrl.
    // ==============================

    async update(payload: {
        username?: string;
        bio?: string;
        avatarUrl?: string;
    }) {
        const response = await API.put<ApiResponse<User>>(
            "/users/me",
            payload,
        );

        return {
            ...response.data,
            data: normalizeUser(response.data.data),
        };
    },

    // ==============================
    // DELETE ACCOUNT
    // ==============================

    async deleteAccount() {
        const response = await API.delete<ApiResponse<null>>(
            "/users/me",
        );

        return response.data;
    },

    // ==============================
    // BACKEND DOES NOT EXPOSE ADMIN USER LIST ROUTES.
    // Keep these helpers graceful so admin pages do not crash.
    // ==============================

    async list() {
        const response = await this.me();

        return response.data ? [response.data] : [];
    },

    async get(id: string) {
        const response = await this.me();

        if (response.data?.id !== id) {
            throw new Error("User list/detail API is not available in backend.");
        }

        return response.data;
    },

    async remove(_id: string) {
        throw new Error("Admin user delete API is not available in backend.");
    },
};
