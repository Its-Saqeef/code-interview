import apiClient from './client';
import type { Problem } from '../components/problems/ProblemCard';
import type { EditorLanguage } from '../types/practice.types';
import type { ProblemDetail } from '../types/problem.types';

export interface GetProblemsResponse {
  success: boolean;
  message: string;
  problems: Problem[];
}

export interface GetProblemDetailResponse {
  success: boolean;
  message: string;
  problem: ProblemDetail;
}

export interface CreateSubmissionPayload {
  language: string;
  code: string;
  passedTestCases: number;
  totalTestCases: number;
  runtimeMs?: number;
  memoryKb?: number;
}

export interface CreateSubmissionResponse {
  success: boolean;
  message: string;
  stats: {
    totalSubmissions: number;
    passedSubmissions: number;
    acceptanceRate: number | null;
  };
}

export interface RunProblemCodePayload {
  language: EditorLanguage;
  code: string;
  mode: 'run' | 'submit';
}

export interface RunProblemCodeResponse {
  success: boolean;
  message: string;
  run: {
    passed: number;
    total: number;
    results: Array<{
      id: string;
      input: string;
      expectedOutput: string;
      actualOutput: string | null;
      status: 'passed' | 'failed' | 'error' | 'skipped';
      runtimeMs: number | null;
      error: string | null;
    }>;
    stdout: string[];
    stderr: string[];
  };
  stats?: CreateSubmissionResponse['stats'];
}

export async function getProblems(): Promise<GetProblemsResponse> {
  const response = await apiClient.get<GetProblemsResponse>('/problems');
  return response.data;
}

export async function getProblemDetail(slug: string): Promise<GetProblemDetailResponse> {
  const response = await apiClient.get<GetProblemDetailResponse>(`/problems/${slug}`);
  return response.data;
}

export async function submitProblemSolution(
  slug: string,
  payload: CreateSubmissionPayload,
): Promise<CreateSubmissionResponse> {
  const response = await apiClient.post<CreateSubmissionResponse>(
    `/problems/${slug}/submissions`,
    payload,
  );
  return response.data;
}

export async function runProblemCode(
  slug: string,
  payload: RunProblemCodePayload,
): Promise<RunProblemCodeResponse> {
  const response = await apiClient.post<RunProblemCodeResponse>(
    `/problems/${slug}/run`,
    payload,
  );
  return response.data;
}
