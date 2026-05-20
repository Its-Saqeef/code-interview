import { Search } from 'lucide-react';
import { Input } from '../ui/Input';

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
        <Search className="absolute left-3.5 top-3 h-4.5 w-4.5 text-[#908fa0]/60" />
        <Input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search problems by name, tag, or ID..."
          className="pl-10.5 h-10 bg-[#1A1D27] border-[#2D3149] focus:border-[#6366F1] placeholder:text-[#908fa0]/30 text-xs"
        />
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
