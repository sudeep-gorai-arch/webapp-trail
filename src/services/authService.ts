import API from "./api";

import {
    AuthRequest,
    AuthResponse,
} from "@/types/auth";

import { ApiResponse } from "@/types/wallpaper";

// ==============================
// LOGIN
// ==============================

export const login = async (data: AuthRequest) => {
    const response = await API.post<ApiResponse<AuthResponse>>(
        "/auth/login",
        data
    );

    return response.data;
};

// ==============================
// REGISTER (Optional)
// ==============================

export const register = async (data: AuthRequest) => {
    const response = await API.post<ApiResponse<AuthResponse>>(
        "/auth/register",
        data
    );

    return response.data;
};

// ==============================
// LOGOUT
// ==============================

export const logout = async () => {
    const response = await API.post<ApiResponse<null>>(
        "/auth/logout"
    );

    return response.data;
};

// ==============================
// CURRENT USER
// ==============================

export const getMe = async () => {
    const response = await API.get(
        "/users/me"
    );

    return response.data;
};