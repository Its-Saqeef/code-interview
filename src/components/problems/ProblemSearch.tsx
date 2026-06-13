import { Search } from 'lucide-react';

interface ProblemSearchProps {
  query: string;
  onQueryChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export const ProblemSearch = ({
  query,
  onQueryChange,
  sortBy,
  onSortChange,
}: ProblemSearchProps) => {
  return (
    <div className="p-4 border-b border-[#2D3149] bg-[#151824] flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
      {/* Search Input */}
      <div className="relative w-full sm:max-w-md text-left">
        <div className="flex items-center gap-3 h-10 rounded-[6px] border border-[#2D3149] bg-[#1A1D27] px-3 transition-all duration-200 focus-within:border-[#6366F1] focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#6366F1]">
          <Search className="h-4 w-4 shrink-0 text-[#908fa0]/60" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search problems by name, tag, or ID..."
            className="min-w-0 flex-1 bg-transparent text-xs text-white placeholder:text-[#908fa0]/40 outline-none border-0 p-0 focus:ring-0"
          />
        </div>
      </div>

      {/* Sort Select Selector */}
      <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-end">
        <span className="text-[10px] font-mono font-bold tracking-wider text-[#908fa0] uppercase">
          Sort by:
        </span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-[#1A1D27] border border-[#2D3149] text-xs font-mono font-semibold text-[#e4e1ed] rounded-[4px] px-3 py-1.5 focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] outline-none cursor-pointer"
        >
          <option value="newest">Newest first</option>
          <option value="hardest">Hardest first</option>
          <option value="easiest">Easiest first</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>
    </div>
  );
};

export default ProblemSearch;
