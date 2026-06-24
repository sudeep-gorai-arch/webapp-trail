import API from './api';

import {
    AuthRequest,
    AuthResponse
} from '@/types/auth';

import { ApiResponse } from '@/types/wallpaper';


export const register = (data: AuthRequest) =>

    API
        .post<ApiResponse<AuthResponse>>(
            '/auth/register',
            data
        )
        .then(r => r.data);


export const login = (data: AuthRequest) =>

    API
        .post<ApiResponse<AuthResponse>>(
            '/auth/login',
            data
        )
        .then(r => r.data);


export const logout = () =>

    API
        .post<ApiResponse<{
            success: boolean
        }>>(
            '/auth/logout'
        )
        .then(r => r.data);