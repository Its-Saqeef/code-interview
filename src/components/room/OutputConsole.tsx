import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import clsx from 'clsx';

export const OutputConsole = () => {
  const [activeTab, setActiveTab] = useState<'console' | 'testcases'>('console');

  return (
    <div className="h-[35%] flex flex-col bg-[#0F1117] select-none text-left">
      {/* Tab Selector */}
      <div className="h-10 border-b border-[#2D3149] flex items-center px-4 bg-[#151824]">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab('console')}
            className={clsx(
              "text-[10px] font-mono font-bold uppercase tracking-wider h-10 flex items-center transition-all border-b-2",
              activeTab === 'console'
                ? "text-[#6366F1] border-[#6366F1]"
                : "text-[#908fa0] border-transparent hover:text-white"
            )}
          >
            Console
          </button>
          <button
            onClick={() => setActiveTab('testcases')}
            className={clsx(
              "text-[10px] font-mono font-bold uppercase tracking-wider h-10 flex items-center transition-all border-b-2",
              activeTab === 'testcases'
                ? "text-[#6366F1] border-[#6366F1]"
                : "text-[#908fa0] border-transparent hover:text-white"
            )}
          >
            Test Cases
          </button>
        </div>
      </div>

      {/* Panel Body */}
      <div className="flex-1 overflow-auto p-4 font-mono text-xs space-y-4">
        {activeTab === 'console' ? (
          <>
            {/* Stdout section */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#908fa0]/60">Stdout</span>
              <div className="text-[#e4e1ed] space-y-0.5">
                <div>Checking partition at index i=1, j=1...</div>
                <div>Binary search: lower=1, upper=2</div>
              </div>
            </div>

            {/* Test Case list */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between bg-[#151824]/60 p-2.5 rounded-[4px] border-l-4 border-[#10B981] border-y border-r border-[#2D3149]/40">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                  <span className="text-[#e4e1ed] font-medium">Test Case 1</span>
                </div>
                <span className="text-[#908fa0] text-[10px]">12ms</span>
              </div>

              <div className="flex items-center justify-between bg-[#151824]/60 p-2.5 rounded-[4px] border-l-4 border-[#10B981] border-y border-r border-[#2D3149]/40">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                  <span className="text-[#e4e1ed] font-medium">Test Case 2</span>
                </div>
                <span className="text-[#908fa0] text-[10px]">8ms</span>
              </div>

              <div className="flex flex-col bg-[#151824]/60 p-2.5 rounded-[4px] border-l-4 border-[#EF4444] border-y border-r border-[#2D3149]/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-[#EF4444]" />
                    <span className="text-[#e4e1ed] font-medium">Test Case 3</span>
                  </div>
                  <span className="text-[#908fa0] text-[10px]">15ms</span>
                </div>
                <div className="text-[#EF4444] text-[11px] mt-1.5 pl-6 font-semibold">
                  AssertionError: Expected 2.5, got 2.0
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-[#908fa0]/60 text-center py-8">
            Click Run Code to execute customized inputs.
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputConsole;
