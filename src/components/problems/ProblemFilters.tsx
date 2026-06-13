import clsx from 'clsx';

interface ProblemFiltersProps {
  selectedDifficulties: ('Easy' | 'Medium' | 'Hard')[];
  onDifficultyToggle: (difficulty: 'Easy' | 'Medium' | 'Hard') => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  selectedStatus: 'all' | 'solved' | 'unsolved';
  onStatusChange: (status: 'all' | 'solved' | 'unsolved') => void;
  availableTags?: string[];
  solvedCount?: number;
  unsolvedCount?: number;
}

const defaultTags = [
  'Arrays',
  'Strings',
  'Dynamic Programming',
  'Graphs',
  'Trees',
  'Recursion',
  'Design',
  'Hash Table',
  'Backtracking',
  'Stack',
  'Heap',
  'Math'
];

export const ProblemFilters = ({
  selectedDifficulties,
  onDifficultyToggle,
  selectedTags,
  onTagToggle,
  selectedStatus,
  onStatusChange,
  availableTags = defaultTags,
  solvedCount,
  unsolvedCount,
}: ProblemFiltersProps) => {
  return (
    <aside className="w-[280px] bg-[#151824] border-r border-[#2D3149] p-5 overflow-y-auto custom-scrollbar flex flex-col space-y-8 select-none text-left">
      {/* Difficulty Section */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-mono font-bold tracking-wider text-[#908fa0] uppercase">
          Difficulty
        </h3>
        <div className="space-y-3">
          {(['Easy', 'Medium', 'Hard'] as const).map((diff) => (
            <label key={diff} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={selectedDifficulties.includes(diff)}
                onChange={() => onDifficultyToggle(diff)}
                className="form-checkbox h-4.5 w-4.5 rounded-[4px] bg-[#0F1117] border-[#2D3149] text-[#6366F1] focus:ring-offset-[#0F1117] focus:ring-[#6366F1] focus:ring-1"
              />
              <span className="text-xs font-semibold text-[#e4e1ed] group-hover:text-white transition-colors">
                {diff}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Tags section */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-mono font-bold tracking-wider text-[#908fa0] uppercase">
          Tags
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {availableTags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => onTagToggle(tag)}
                className={clsx(
                  "px-3 py-1 text-[10px] font-mono font-semibold rounded-full border transition-all duration-200",
                  isSelected
                    ? "bg-[#6366F1]/10 border-[#6366F1]/40 text-[#6366F1] hover:bg-[#6366F1]/20"
                    : "bg-[#0F1117] border-[#2D3149] text-[#908fa0] hover:border-[#908fa0]/30 hover:text-white"
                )}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Status section */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-mono font-bold tracking-wider text-[#908fa0] uppercase">
          Status
        </h3>
        <div className="space-y-3">
          {(['all', 'solved', 'unsolved'] as const).map((status) => {
            const countLabel =
              status === 'solved' && solvedCount !== undefined
                ? ` (${solvedCount})`
                : status === 'unsolved' && unsolvedCount !== undefined
                  ? ` (${unsolvedCount})`
                  : '';

            return (
            <label key={status} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="status-filter"
                checked={selectedStatus === status}
                onChange={() => onStatusChange(status)}
                className="form-radio h-4.5 w-4.5 bg-[#0F1117] border-[#2D3149] text-[#6366F1] focus:ring-offset-[#0F1117] focus:ring-[#6366F1] focus:ring-1"
              />
              <span className="text-xs font-semibold text-[#e4e1ed] capitalize group-hover:text-white transition-colors">
                {status === 'all' ? 'All Problems' : status}
                {countLabel}
              </span>
            </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default ProblemFilters;
