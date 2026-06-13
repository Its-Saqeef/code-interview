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

export interface UpdateProfilePayload {
  name?: string;
  username?: string;
  bio?: string;
  country?: string;
  githubUrl?: string;
}

export interface ProfileStats {
  solvedCount: number;
  totalSubmissions: number;
  passedSubmissions: number;
  winRate: number | null;
}

export interface UserSubmission {
  id: string;
  status: 'passed' | 'failed' | 'error' | 'timeout';
  problem: string;
  slug: string;
  language: string;
  runtimeMs: number | null;
  createdAt: string | null;
  passedTestCases: number | null;
  totalTestCases: number | null;
}

export interface LanguageBreakdown {
  name: string;
  count: number;
  pct: number;
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
  avatarUrl?: string,
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

export const updateProfileApi = async (payload: UpdateProfilePayload): Promise<AuthResponse> => {
  const response = await apiClient.patch<AuthResponse>('/auth/me', payload);
  return response.data;
};

export const getMyStatsApi = async (): Promise<{ success: boolean; stats: ProfileStats }> => {
  const response = await apiClient.get<{ success: boolean; stats: ProfileStats }>('/auth/me/stats');
  return response.data;
};

export const getMySubmissionsApi = async (): Promise<{ success: boolean; submissions: UserSubmission[] }> => {
  const response = await apiClient.get<{ success: boolean; submissions: UserSubmission[] }>(
    '/auth/me/submissions',
  );
  return response.data;
};

export const getMyLanguagesApi = async (): Promise<{ success: boolean; languages: LanguageBreakdown[] }> => {
  const response = await apiClient.get<{ success: boolean; languages: LanguageBreakdown[] }>(
    '/auth/me/languages',
  );
  return response.data;
};
