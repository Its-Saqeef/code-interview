import { useState, useMemo, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { ProblemFilters } from '../components/problems/ProblemFilters';
import { ProblemSearch } from '../components/problems/ProblemSearch';
import { ProblemCard } from '../components/problems/ProblemCard';
import type { Problem } from '../components/problems/ProblemCard';
import { getProblems } from '../api/problems.api';

export const ProblemsPage = () => {
  const location = useLocation();
  const [selectedDifficulties, setSelectedDifficulties] = useState<('Easy' | 'Medium' | 'Hard')[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'solved' | 'unsolved'>('all');
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [problems, setProblems] = useState<Problem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProblems = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getProblems();
      setProblems(data.problems);
    } catch {
      setError('Failed to load problems. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems, location.key]);

  const solvedCount = useMemo(
    () => problems.filter((problem) => problem.solved).length,
    [problems],
  );

  const availableTags = useMemo(
    () => [...new Set(problems.flatMap((p) => p.tags))].sort(),
    [problems],
  );

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

  const filteredProblems = useMemo(() => {
    let result = [...problems];

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedDifficulties.length > 0) {
      result = result.filter((p) => selectedDifficulties.includes(p.difficulty));
    }

    if (selectedTags.length > 0) {
      result = result.filter((p) =>
        p.tags.some((t) => selectedTags.includes(t))
      );
    }

    if (selectedStatus === 'solved') {
      result = result.filter((p) => p.solved);
    } else if (selectedStatus === 'unsolved') {
      result = result.filter((p) => !p.solved);
    }

    if (sortBy === 'easiest') {
      const diffWeight = { Easy: 1, Medium: 2, Hard: 3 };
      result.sort((a, b) => diffWeight[a.difficulty] - diffWeight[b.difficulty]);
    } else if (sortBy === 'hardest') {
      const diffWeight = { Easy: 1, Medium: 2, Hard: 3 };
      result.sort((a, b) => diffWeight[b.difficulty] - diffWeight[a.difficulty]);
    } else if (sortBy === 'popularity') {
      result.sort((a, b) => (b.acceptanceRate ?? -1) - (a.acceptanceRate ?? -1));
    }

    return result;
  }, [problems, query, selectedDifficulties, selectedTags, selectedStatus, sortBy]);

  return (
    <div className="flex h-[calc(100vh-56px)] overflow-hidden select-none border border-[#2D3149] rounded-lg bg-[#0F1117] animate-fade-in">
      <ProblemFilters
        selectedDifficulties={selectedDifficulties}
        onDifficultyToggle={handleDifficultyToggle}
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
        availableTags={availableTags.length > 0 ? availableTags : undefined}
        solvedCount={solvedCount}
        unsolvedCount={problems.length - solvedCount}
      />

      <main className="flex-1 flex flex-col overflow-hidden bg-[#0F1117]">
        <ProblemSearch
          query={query}
          onQueryChange={setQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <div className="flex-grow overflow-y-auto p-6 custom-scrollbar">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
              <Loader2 className="h-8 w-8 animate-spin text-[#6366F1]" />
              <p className="text-sm text-[#908fa0]">Loading problems...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-2">
              <p className="text-sm font-semibold text-[#EF4444]">{error}</p>
            </div>
          ) : filteredProblems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredProblems.map((problem) => (
                <ProblemCard key={problem.id} problem={problem} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-2">
              <p className="text-sm font-semibold text-white">
                {problems.length === 0 ? 'No published problems yet' : 'No problems match your current criteria'}
              </p>
              <p className="text-xs text-[#908fa0]">
                {problems.length === 0
                  ? 'Publish a problem from the admin panel to see it here.'
                  : 'Try relaxing difficulty, tags, or search parameters.'}
              </p>
            </div>
          )}
        </div>

        <footer className="px-6 py-4 border-t border-[#2D3149] bg-[#151824] flex items-center justify-between">
          <span className="text-xs font-mono font-medium text-[#908fa0]">
            {solvedCount} of {problems.length} solved · Showing {filteredProblems.length} of{' '}
            {problems.length} problems
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
