import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Timer } from 'lucide-react';
import clsx from 'clsx';
import { usePracticeSession } from '../../context/PracticeSessionContext';
import { formatElapsedTime } from '../../utils/formatDuration';

export function PracticeTopbar() {
  const navigate = useNavigate();
  const { problem, elapsedSeconds, isTimerRunning } = usePracticeSession();

  return (
    <header className="flex justify-between items-center px-4 w-full bg-[#1F2231] border-b border-[#2D3149] h-14 select-none">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={() => navigate(problem ? `/problems/${problem.slug}` : '/problems')}
          className="p-1.5 rounded hover:bg-[#22263A] text-[#908fa0] hover:text-white transition-colors"
          aria-label="Back to problem"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <span className="font-bold text-[#6366F1] text-sm uppercase tracking-wider font-mono shrink-0">
          Solo Practice
        </span>
        {problem && (
          <span className="text-sm text-white font-semibold truncate">
            {problem.problemNumber}. {problem.title}
          </span>
        )}
      </div>

      <div
        className={clsx(
          'flex items-center gap-1.5 font-mono text-sm font-semibold',
          isTimerRunning ? 'text-[#00a6e0]' : 'text-[#10B981]',
        )}
      >
        {isTimerRunning ? (
          <Timer className="h-4 w-4" />
        ) : (
          <CheckCircle2 className="h-4 w-4" />
        )}
        <span>{formatElapsedTime(elapsedSeconds)}</span>
      </div>
    </header>
  );
}

export default PracticeTopbar;
