import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { isAxiosError } from 'axios';
import { getProblemDetail, runProblemCode, type RunProblemCodeResponse } from '../api/problems.api';
import { toastService } from '../services/toast.service';
import type { EditorLanguage, RunSummary } from '../types/practice.types';
import type { ProblemDetail } from '../types/problem.types';
import {
  getDefaultLanguage,
  getStarterCodeForLanguage,
} from '../utils/practiceCode';

interface PracticeSessionContextValue {
  problem: ProblemDetail | null;
  isLoading: boolean;
  error: string | null;
  language: EditorLanguage;
  code: string;
  hintsVisible: boolean;
  isRunning: boolean;
  isSubmitting: boolean;
  lastRun: RunSummary | null;
  elapsedSeconds: number;
  isTimerRunning: boolean;
  setLanguage: (language: EditorLanguage) => void;
  setCode: (code: string) => void;
  setHintsVisible: (visible: boolean) => void;
  resetCode: () => void;
  runCode: () => Promise<void>;
  submitCode: () => Promise<void>;
}

const PracticeSessionContext = createContext<PracticeSessionContextValue | null>(null);

function mapRunResponse(run: RunProblemCodeResponse['run']): RunSummary {
  return {
    passed: run.passed,
    total: run.total,
    stdout: run.stdout,
    stderr: run.stderr,
    results: run.results.map((result, index) => ({
      id: result.id,
      label: `Test Case ${index + 1}`,
      input: result.input,
      expectedOutput: result.expectedOutput,
      actualOutput: result.actualOutput,
      status: result.status,
      runtimeMs: result.runtimeMs,
      error: result.error,
    })),
  };
}

interface PracticeSessionProviderProps {
  slug: string;
  children: ReactNode;
}

export function PracticeSessionProvider({ slug, children }: PracticeSessionProviderProps) {
  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguageState] = useState<EditorLanguage>('JavaScript');
  const [code, setCode] = useState('');
  const [hintsVisible, setHintsVisible] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastRun, setLastRun] = useState<RunSummary | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    setElapsedSeconds(0);
    setIsTimerRunning(true);
  }, [slug]);

  useEffect(() => {
    if (!isTimerRunning) {
      return;
    }

    const timer = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isTimerRunning]);

  useEffect(() => {
    let cancelled = false;

    async function loadProblem() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getProblemDetail(slug);
        if (cancelled) return;

        const loadedProblem = data.problem;
        const defaultLanguage = getDefaultLanguage(loadedProblem.starterCode);
        const starter = getStarterCodeForLanguage(loadedProblem.starterCode, defaultLanguage);

        setProblem(loadedProblem);
        setLanguageState(defaultLanguage);
        setCode(starter);
      } catch (err) {
        if (!cancelled) {
          const message = isAxiosError(err)
            ? (err.response?.data as { message?: string })?.message ?? 'Failed to load problem'
            : 'Failed to load problem';
          setError(message);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadProblem();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const setLanguage = useCallback(
    (nextLanguage: EditorLanguage) => {
      if (!problem) return;

      setLanguageState(nextLanguage);
      setCode(getStarterCodeForLanguage(problem.starterCode, nextLanguage));
      setLastRun(null);
    },
    [problem],
  );

  const resetCode = useCallback(() => {
    if (!problem) return;

    const starter = getStarterCodeForLanguage(problem.starterCode, language);
    setCode(starter);
    setLastRun(null);
  }, [language, problem]);

  const execute = useCallback(
    async (mode: 'run' | 'submit') => {
      if (!problem || !code.trim()) {
        toastService.warning('Write some code before running.');
        return;
      }

      const isSubmit = mode === 'submit';
      if (isSubmit) {
        setIsSubmitting(true);
      } else {
        setIsRunning(true);
      }

      setLastRun(null);

      try {
        const response = await runProblemCode(problem.slug, {
          language,
          code,
          mode,
        });

        setLastRun(mapRunResponse(response.run));

        if (isSubmit) {
          const allPassed = response.run.passed === response.run.total;
          if (allPassed) {
            setIsTimerRunning(false);
          }
          toastService[allPassed ? 'success' : 'warning'](response.message);
        }
      } catch (err) {
        const message = isAxiosError(err)
          ? (err.response?.data as { message?: string })?.message ?? 'Execution failed'
          : 'Execution failed';
        toastService.error(message);
      } finally {
        if (isSubmit) {
          setIsSubmitting(false);
        } else {
          setIsRunning(false);
        }
      }
    },
    [code, language, problem],
  );

  const runCode = useCallback(() => execute('run'), [execute]);
  const submitCode = useCallback(() => execute('submit'), [execute]);

  const value = useMemo<PracticeSessionContextValue>(
    () => ({
      problem,
      isLoading,
      error,
      language,
      code,
      hintsVisible,
      isRunning,
      isSubmitting,
      lastRun,
      elapsedSeconds,
      isTimerRunning,
      setLanguage,
      setCode,
      setHintsVisible,
      resetCode,
      runCode,
      submitCode,
    }),
    [
      problem,
      isLoading,
      error,
      language,
      code,
      hintsVisible,
      isRunning,
      isSubmitting,
      lastRun,
      elapsedSeconds,
      isTimerRunning,
      setLanguage,
      resetCode,
      runCode,
      submitCode,
    ],
  );

  return (
    <PracticeSessionContext.Provider value={value}>
      {children}
    </PracticeSessionContext.Provider>
  );
}

export function usePracticeSession() {
  const context = useContext(PracticeSessionContext);
  if (!context) {
    throw new Error('usePracticeSession must be used within PracticeSessionProvider');
  }
  return context;
}
