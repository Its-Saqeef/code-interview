import apiClient from './client';
import type { AdminProblemFormData } from '../validation/adminProblem.schema';

export interface AddProblemResponse {
  success: boolean;
  message: string;
  problem: {
    id: string;
    title: string;
    slug: string;
    problemNumber: number;
  };
}

export async function addProblem(payload: AdminProblemFormData): Promise<AddProblemResponse> {
  const response = await apiClient.post<AddProblemResponse>('/admin/add-problem', {
    ...payload,
    imageUrl: payload.imageUrl || undefined,
  });
  return response.data;
}
