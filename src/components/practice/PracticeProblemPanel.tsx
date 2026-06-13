import { Lightbulb } from 'lucide-react';
import { usePracticeSession } from '../../context/PracticeSessionContext';
import { DifficultyBadge } from '../problems/DifficultyBadge';

export function PracticeProblemPanel() {
  const { problem, hintsVisible } = usePracticeSession();

  if (!problem) {
    return null;
  }

  return (
    <div className="flex flex-col h-full min-h-0 text-left">
      <div className="h-9 shrink-0 border-b border-[#2D3149] flex items-center px-4 bg-[#151824] select-none">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#908fa0]">
          Problem
        </span>
      </div>
      <div className="flex-1 overflow-auto p-6 space-y-6 custom-scrollbar">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-lg font-bold text-white tracking-tight leading-tight">
          {problem.problemNumber}. {problem.title}
        </h1>
        <DifficultyBadge difficulty={problem.difficulty} />
      </div>

      {problem.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 select-none">
          {problem.tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#1A1D27] border border-[#2D3149] text-[#908fa0] px-2 py-0.5 rounded-[4px] text-[10px] font-mono font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="text-xs text-[#908fa0] leading-relaxed space-y-3 whitespace-pre-wrap">
        {problem.description}
      </div>

      {problem.examples.length > 0 && (
        <div className="space-y-4">
          {problem.examples.map((example, index) => (
            <div key={`${example.input}-${index}`}>
              <h3 className="text-[10px] font-mono font-semibold uppercase tracking-wider text-white mb-2">
                Example {index + 1}
              </h3>
              <div className="bg-[#0F1117] border border-[#2D3149] p-4 rounded-[4px] font-mono text-xs space-y-1">
                <div className="text-[#e4e1ed]">
                  <span className="text-[#908fa0]">Input:</span> {example.input}
                </div>
                <div className="text-[#e4e1ed]">
                  <span className="text-[#908fa0]">Output:</span> {example.output}
                </div>
                {example.explanation && (
                  <div className="text-[#908fa0] italic mt-2">
                    <span className="text-[#908fa0] not-italic font-semibold">Explanation:</span>{' '}
                    {example.explanation}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {problem.constraints.length > 0 && (
        <div>
          <h3 className="text-[10px] font-mono font-semibold uppercase tracking-wider text-white mb-2">
            Constraints
          </h3>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-[#908fa0] font-mono">
            {problem.constraints.map((constraint) => (
              <li key={constraint}>{constraint}</li>
            ))}
          </ul>
        </div>
      )}

      {hintsVisible && problem.hints.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="text-[10px] font-mono font-semibold uppercase tracking-wider text-white">
            Hints
          </h3>
          {problem.hints.map((hint, index) => (
            <div
              key={`${hint}-${index}`}
              className="bg-[#151824] border border-[#2D3149] rounded-lg p-4 flex gap-4"
            >
              <Lightbulb className="h-5 w-5 text-[#d97721] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-[#908fa0] leading-relaxed">{hint}</p>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}

export default PracticeProblemPanel;
