import { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, MinusCircle, Terminal, XCircle } from 'lucide-react';
import clsx from 'clsx';
import { usePracticeSession } from '../../context/PracticeSessionContext';
import type { TestCaseResultStatus } from '../../types/practice.types';

function StatusIcon({ status }: { status: TestCaseResultStatus }) {
  if (status === 'passed') {
    return <CheckCircle2 className="h-4 w-4 text-[#10B981]" />;
  }
  if (status === 'failed' || status === 'error') {
    return <XCircle className="h-4 w-4 text-[#EF4444]" />;
  }
  return <MinusCircle className="h-4 w-4 text-[#908fa0]" />;
}

function borderColorForStatus(status: TestCaseResultStatus) {
  if (status === 'passed') return 'border-[#10B981]';
  if (status === 'failed' || status === 'error') return 'border-[#EF4444]';
  return 'border-[#908fa0]';
}

export function PracticeOutputConsole() {
  const { lastRun, isRunning, isSubmitting } = usePracticeSession();
  const [activeTab, setActiveTab] = useState<'console' | 'testcases'>('console');

  useEffect(() => {
    if (lastRun) {
      setActiveTab('testcases');
    }
  }, [lastRun]);

  const isExecuting = isRunning || isSubmitting;

  return (
    <div className="flex flex-col h-full min-h-0 bg-[#0F1117] select-none text-left">
      <div className="h-9 shrink-0 border-b border-[#2D3149] flex items-center justify-between px-4 bg-[#151824]">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-[#6366F1]" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#908fa0]">
            Output
          </span>
          {lastRun && (
            <span
              className={clsx(
                'text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded',
                lastRun.passed === lastRun.total
                  ? 'text-[#10B981] bg-[#10B981]/10'
                  : 'text-[#d97721] bg-[#d97721]/10',
              )}
            >
              {lastRun.passed}/{lastRun.total} passed
            </span>
          )}
        </div>
        {isExecuting && (
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#908fa0]">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-[#6366F1]" />
            Executing...
          </div>
        )}
      </div>

      <div className="h-10 shrink-0 border-b border-[#2D3149] flex items-center px-4 bg-[#151824]/60">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setActiveTab('console')}
            className={clsx(
              'text-[10px] font-mono font-bold uppercase tracking-wider h-10 flex items-center transition-all border-b-2',
              activeTab === 'console'
                ? 'text-[#6366F1] border-[#6366F1]'
                : 'text-[#908fa0] border-transparent hover:text-white',
            )}
          >
            Console
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('testcases')}
            className={clsx(
              'text-[10px] font-mono font-bold uppercase tracking-wider h-10 flex items-center transition-all border-b-2',
              activeTab === 'testcases'
                ? 'text-[#6366F1] border-[#6366F1]'
                : 'text-[#908fa0] border-transparent hover:text-white',
            )}
          >
            Test Cases
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 font-mono text-xs space-y-4 custom-scrollbar min-h-0">
        {activeTab === 'console' ? (
          <>
            {!lastRun && !isExecuting && (
              <div className="text-[#908fa0]/60 text-center py-8">
                Run your code to see stdout and execution details here.
              </div>
            )}

            {isExecuting && !lastRun && (
              <div className="flex items-center justify-center gap-2 py-8 text-[#908fa0]">
                <Loader2 className="h-4 w-4 animate-spin text-[#6366F1]" />
                Running your code...
              </div>
            )}

            {lastRun && (
              <>
                <div className="bg-[#151824] border border-[#2D3149] rounded-[4px] p-3 space-y-1">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-[#908fa0]/60 mb-1">
                    Result
                  </div>
                  <div
                    className={clsx(
                      'text-sm font-semibold',
                      lastRun.passed === lastRun.total ? 'text-[#10B981]' : 'text-[#d97721]',
                    )}
                  >
                    {lastRun.passed}/{lastRun.total} test cases passed
                  </div>
                </div>

                {lastRun.stdout.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#908fa0]/60">
                      Stdout
                    </span>
                    <div className="bg-[#151824] border border-[#2D3149] rounded-[4px] p-3 text-[#e4e1ed] space-y-0.5">
                      {lastRun.stdout.map((line, index) => (
                        <div key={`stdout-${index}`}>{line}</div>
                      ))}
                    </div>
                  </div>
                )}

                {lastRun.stderr.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#908fa0]/60">
                      Stderr
                    </span>
                    <div className="bg-[#151824] border border-[#EF4444]/30 rounded-[4px] p-3 text-[#EF4444] space-y-0.5">
                      {lastRun.stderr.map((line, index) => (
                        <div key={`stderr-${index}`}>{line}</div>
                      ))}
                    </div>
                  </div>
                )}

                {lastRun.stdout.length === 0 && lastRun.stderr.length === 0 && (
                  <div className="text-[#908fa0]/60 text-center py-4">
                    No console output. Check the Test Cases tab for results.
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <>
            {!lastRun && !isExecuting && (
              <div className="text-[#908fa0]/60 text-center py-8">
                Click Run Code to execute against public test cases.
              </div>
            )}

            {isExecuting && !lastRun && (
              <div className="flex items-center justify-center gap-2 py-8 text-[#908fa0]">
                <Loader2 className="h-4 w-4 animate-spin text-[#6366F1]" />
                Evaluating test cases...
              </div>
            )}

            {lastRun?.results.map((result) => (
              <div
                key={result.id}
                className={clsx(
                  'flex flex-col bg-[#151824]/60 p-2.5 rounded-[4px] border-l-4 border-y border-r border-[#2D3149]/40',
                  borderColorForStatus(result.status),
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <StatusIcon status={result.status} />
                    <span className="text-[#e4e1ed] font-medium">{result.label}</span>
                  </div>
                  {result.runtimeMs !== null && (
                    <span className="text-[#908fa0] text-[10px]">{result.runtimeMs}ms</span>
                  )}
                </div>

                {result.status === 'passed' ? (
                  <div className="mt-2 pl-6 space-y-1 text-[11px]">
                    <div className="text-[#908fa0]">
                      <span className="font-semibold">Input:</span> {result.input}
                    </div>
                    <div className="text-[#10B981]">
                      <span className="font-semibold">Output:</span> {result.actualOutput}
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 pl-6 space-y-1 text-[11px]">
                    <div className="text-[#908fa0]">
                      <span className="font-semibold">Input:</span> {result.input}
                    </div>
                    <div className="text-[#908fa0]">
                      <span className="font-semibold">Expected:</span> {result.expectedOutput}
                    </div>
                    {result.actualOutput !== null && (
                      <div className="text-[#908fa0]">
                        <span className="font-semibold">Got:</span> {result.actualOutput}
                      </div>
                    )}
                    {result.error && (
                      <div className="text-[#EF4444] font-semibold">{result.error}</div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default PracticeOutputConsole;
