export type EditorLanguage = 'JavaScript' | 'Python' | 'Java' | 'C++';

export type TestCaseResultStatus = 'passed' | 'failed' | 'error' | 'skipped';

export interface TestCaseResult {
  id: string;
  label: string;
  input: string;
  expectedOutput: string;
  actualOutput: string | null;
  status: TestCaseResultStatus;
  runtimeMs: number | null;
  error: string | null;
}

export interface RunSummary {
  passed: number;
  total: number;
  results: TestCaseResult[];
  stdout: string[];
  stderr: string[];
}
