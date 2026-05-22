import apiClient from './client';
import type { User } from '../hooks/useAuth';

export interface AuthResponse {
    success: boolean;
    message: string;
    user: User;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    user: User;
}

export interface LogoutResponse {
    success: boolean;
    message: string;
}

export const loginApi = async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
};

export const registerApi = async (
    name: string,
    username: string,
    email: string,
    password: string,
    avatarUrl?: string
): Promise<RegisterResponse> => {
    const response = await apiClient.post<RegisterResponse>('/user/register', {
        name,
        username,
        email,
        password,
        avatarUrl,
    });
    return response.data;
};

export const logoutApi = async (): Promise<LogoutResponse> => {
    const response = await apiClient.post<LogoutResponse>('/auth/logout');
    return response.data;
};

export const getMeApi = async (): Promise<AuthResponse> => {
    const response = await apiClient.get<AuthResponse>('/auth/me');
    return response.data;
};
