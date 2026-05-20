import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProblemFilters } from '../components/problems/ProblemFilters';
import { ProblemSearch } from '../components/problems/ProblemSearch';
import { ProblemCard } from '../components/problems/ProblemCard';
import type { Problem } from '../components/problems/ProblemCard';

const mockProblems: Problem[] = [
  {
    id: 'lru-cache',
    title: 'LRU Cache Implementation',
    difficulty: 'Hard',
    tags: ['Design', 'Hash Table'],
    acceptance: '41.2%',
    solved: false,
  },
  {
    id: 'word-break-ii',
    title: 'Word Break II',
    difficulty: 'Hard',
    tags: ['Dynamic Programming', 'Backtracking'],
    acceptance: '58.7%',
    solved: false,
  },
  {
    id: 'subsets',
    title: 'Subsets',
    difficulty: 'Medium',
    tags: ['Arrays', 'Recursion'],
    acceptance: '76.3%',
    solved: false,
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    tags: ['Stack', 'Strings'],
    acceptance: '92.1%',
    solved: true,
  },
  {
    id: 'network-delay-time',
    title: 'Network Delay Time',
    difficulty: 'Medium',
    tags: ['Graphs', 'Heap'],
    acceptance: '52.8%',
    solved: false,
  },
  {
    id: 'rotate-image',
    title: 'Rotate Image',
    difficulty: 'Medium',
    tags: ['Arrays', 'Math'],
    acceptance: '71.0%',
    solved: false,
  },
];

export const ProblemsPage = () => {
  const [selectedDifficulties, setSelectedDifficulties] = useState<('Easy' | 'Medium' | 'Hard')[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'solved' | 'unsolved'>('all');
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const handleDifficultyToggle = (diff: 'Easy' | 'Medium' | 'Hard') => {
    setSelectedDifficulties((prev) =>
      prev.includes(diff) ? prev.filter((d) => d !== diff) : [...prev, diff]
    );
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleStatusChange = (status: 'all' | 'solved' | 'unsolved') => {
    setSelectedStatus(status);
  };

  // Filter & Sort list
  const filteredProblems = useMemo(() => {
    let result = [...mockProblems];

    // Search Query
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Difficulties
    if (selectedDifficulties.length > 0) {
      result = result.filter((p) => selectedDifficulties.includes(p.difficulty));
    }

    // Tags
    if (selectedTags.length > 0) {
      result = result.filter((p) =>
        p.tags.some((t) => selectedTags.includes(t))
      );
    }

    // Status
    if (selectedStatus === 'solved') {
      result = result.filter((p) => p.solved);
    } else if (selectedStatus === 'unsolved') {
      result = result.filter((p) => !p.solved);
    }

    // Sort
    if (sortBy === 'easiest') {
      const diffWeight = { Easy: 1, Medium: 2, Hard: 3 };
      result.sort((a, b) => diffWeight[a.difficulty] - diffWeight[b.difficulty]);
    } else if (sortBy === 'hardest') {
      const diffWeight = { Easy: 1, Medium: 2, Hard: 3 };
      result.sort((a, b) => diffWeight[b.difficulty] - diffWeight[a.difficulty]);
    } else if (sortBy === 'popularity') {
      result.sort((a, b) => parseFloat(b.acceptance) - parseFloat(a.acceptance));
    }

    return result;
  }, [query, selectedDifficulties, selectedTags, selectedStatus, sortBy]);

  return (
    <div className="flex h-[calc(100vh-56px)] overflow-hidden select-none border border-[#2D3149] rounded-lg bg-[#0F1117] animate-fade-in">
      {/* Sub-sidebar filter panel */}
      <ProblemFilters
        selectedDifficulties={selectedDifficulties}
        onDifficultyToggle={handleDifficultyToggle}
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
      />

      {/* Main List Column */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#0F1117]">
        {/* Search & Sort Panel */}
        <ProblemSearch
          query={query}
          onQueryChange={setQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Scrollable cards listing */}
        <div className="flex-grow overflow-y-auto p-6 custom-scrollbar">
          {filteredProblems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredProblems.map((problem) => (
                <ProblemCard key={problem.id} problem={problem} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-2">
              <p className="text-sm font-semibold text-white">No problems match your current criteria</p>
              <p className="text-xs text-[#908fa0]">Try relaxing difficulty, tags, or search parameters.</p>
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        <footer className="px-6 py-4 border-t border-[#2D3149] bg-[#151824] flex items-center justify-between">
          <span className="text-xs font-mono font-medium text-[#908fa0]">
            Showing 1-{filteredProblems.length} of {filteredProblems.length} problems
          </span>
          <div className="flex items-center gap-2">
            <button 
              disabled 
              className="p-1.5 border border-[#2D3149] rounded-[4px] text-[#908fa0]/40 bg-[#1A1D27] cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 text-xs font-mono font-bold bg-[#6366F1] text-white rounded-[4px]">
                1
              </button>
            </div>
            <button 
              disabled 
              className="p-1.5 border border-[#2D3149] rounded-[4px] text-[#908fa0]/40 bg-[#1A1D27] cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default ProblemsPage;
