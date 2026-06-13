import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Users,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Rocket,
  HelpCircle,
  Bell,
  History,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { isAxiosError } from 'axios';
import { Button } from '../components/ui/Button';
import { DifficultyBadge } from '../components/problems/DifficultyBadge';
import { CreateRoomModal } from '../components/dashboard/CreateRoomModal';
import { getProblemDetail } from '../api/problems.api';
import { formatAcceptanceDisplay, formatSubmissionCount } from '../utils/problemStats';
import type { ProblemDetail } from '../types/problem.types';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import rainWaterImg from '../assets/rain_water.png';

export const ProblemDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { problemId: slug } = useParams<{ problemId: string }>();
  const [constraintsExpanded, setConstraintsExpanded] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useDocumentTitle(problem ? `${problem.problemNumber}. ${problem.title}` : undefined);

  useEffect(() => {
    if (!slug) {
      setError('Problem not found');
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    const problemSlug = slug;

    async function fetchProblem() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getProblemDetail(problemSlug);
        if (!cancelled) {
          setProblem(data.problem);
        }
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

    fetchProblem();

    return () => {
      cancelled = true;
    };
  }, [slug, location.key]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F1117] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-[#908fa0]">
          <Loader2 className="h-8 w-8 animate-spin text-[#6366F1]" />
          <p className="text-sm">Loading problem...</p>
        </div>
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="min-h-screen bg-[#0F1117] flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-sm font-semibold text-[#EF4444]">{error ?? 'Problem not found'}</p>
        <Button onClick={() => navigate('/problems')} className="text-xs font-bold">
          Back to Problems
        </Button>
      </div>
    );
  }

  const heroImage = problem.imageUrl || rainWaterImg;

  return (
    <div className="min-h-screen bg-[#0F1117] text-[#e4e1ed] font-inter flex flex-col overflow-hidden">
      <header className="h-14 bg-[#151824] border-b border-[#2D3149] flex justify-between items-center px-6 sticky top-0 z-40 select-none">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/problems')}
            className="p-1 rounded hover:bg-[#22263A] text-[#908fa0] hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4.5 w-4.5" />
          </button>
          <h1 className="text-sm font-bold text-white tracking-tight">
            {problem.problemNumber}. {problem.title}
          </h1>
          <DifficultyBadge difficulty={problem.difficulty} />
          {problem.solved && (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/30 px-2 py-0.5 rounded">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Solved
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3.5 text-[#908fa0]">
            <Bell className="h-4.5 w-4.5 cursor-pointer hover:text-white transition-colors" />
            <HelpCircle className="h-4.5 w-4.5 cursor-pointer hover:text-white transition-colors" />
          </div>
          <div className="h-5 w-px bg-[#2D3149]" />
          <Button onClick={() => setModalOpen(true)} className="h-8.5 px-4 text-xs font-bold">
            Start Interview
          </Button>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-12 overflow-hidden bg-[#0F1117]">
        <section className="col-span-8 overflow-y-auto custom-scrollbar p-8 border-r border-[#2D3149]">
          <div className="max-w-3xl mx-auto space-y-8 text-left">
            <div className="rounded-lg overflow-hidden border border-[#2D3149] h-52 relative bg-[#151824] select-none">
              <img
                className="w-full h-full object-cover opacity-95"
                alt={`${problem.title} illustration`}
                src={heroImage}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117] via-transparent to-transparent" />
            </div>

            <div className="flex flex-wrap gap-3 select-none">
              {problem.recommendedMinutes && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1A1D27] rounded-full border border-[#2D3149] text-[10px] text-[#908fa0] font-mono">
                  <Clock className="h-3.5 w-3.5 text-[#6366F1]" />
                  <span>{problem.recommendedMinutes} mins recommended</span>
                </div>
              )}
              {problem.badges?.map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-1.5 px-3 py-1 bg-[#1A1D27] rounded-full border border-[#2D3149] text-[10px] text-[#908fa0] font-mono"
                >
                  <Users className="h-3.5 w-3.5 text-[#10B981]" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h2 className="text-base font-bold text-white tracking-tight">Description</h2>
              <div className="text-xs text-[#908fa0] leading-relaxed whitespace-pre-wrap">
                {problem.description}
              </div>
            </div>

            {problem.examples.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white tracking-tight">Examples</h3>
                {problem.examples.map((example, index) => (
                  <div key={index} className="space-y-2">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6366F1]">
                      Example {index + 1}
                    </p>
                    <div className="bg-[#151824] border border-[#2D3149] p-4 rounded-lg font-mono text-xs space-y-1">
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
              <div className="border-t border-[#2D3149]/40 pt-4">
                <button
                  onClick={() => setConstraintsExpanded(!constraintsExpanded)}
                  className="w-full flex justify-between items-center py-2 text-white hover:text-[#6366F1] transition-colors"
                >
                  <span className="text-sm font-bold tracking-tight">Constraints</span>
                  {constraintsExpanded ? (
                    <ChevronUp className="h-4.5 w-4.5" />
                  ) : (
                    <ChevronDown className="h-4.5 w-4.5" />
                  )}
                </button>
                {constraintsExpanded && (
                  <ul className="list-disc list-inside space-y-1.5 text-xs text-[#908fa0] font-mono pl-2 pt-2">
                    {problem.constraints.map((constraint, index) => (
                      <li key={index}>{constraint}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {problem.hints.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-[#2D3149]/40">
                <h3 className="text-sm font-bold text-white tracking-tight">Hints</h3>
                <div className="space-y-3">
                  {problem.hints.map((hint, index) => (
                    <div
                      key={index}
                      className="bg-[#151824] border border-[#2D3149] rounded-lg p-4 flex gap-4"
                    >
                      <Lightbulb className="h-5 w-5 text-[#d97721] flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-[#908fa0] leading-relaxed">{hint}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-4 py-6 border-t border-[#2D3149]/40">
              <Button
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto h-11 px-6 text-xs font-bold gap-2 shadow-[0px_0px_15px_rgba(99,102,241,0.3)]"
              >
                <Rocket className="h-4 w-4" />
                <span>Start Interview Session</span>
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate(`/practice/${problem.slug}`)}
                className="w-full sm:w-auto h-11 px-6 text-xs font-bold border-[#2D3149] hover:bg-[#22263A]"
              >
                {problem.solved ? 'Practice Again' : 'Practice Solo'}
              </Button>
            </div>
          </div>
        </section>

        <aside className="col-span-4 overflow-y-auto custom-scrollbar bg-[#151824]/60 p-6 flex flex-col gap-6 text-left select-none">
          <div className="bg-[#1A1D27] border border-[#2D3149] rounded-lg p-5 shadow-lg">
            <h4 className="text-[10px] font-mono font-bold text-[#908fa0] uppercase tracking-wider mb-4">
              Community Stats
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[#908fa0] text-[10px] mb-1 font-semibold uppercase tracking-wider font-mono">
                  Acceptance
                </p>
                <p className="text-lg font-bold text-white">
                  {formatAcceptanceDisplay(problem.stats.acceptanceRate)}
                </p>
              </div>
              <div>
                <p className="text-[#908fa0] text-[10px] mb-1 font-semibold uppercase tracking-wider font-mono">
                  Submissions
                </p>
                <p className="text-lg font-bold text-white">
                  {formatSubmissionCount(problem.stats.totalSubmissions)}
                </p>
              </div>
            </div>
            {problem.stats.popularLanguages.length > 0 && (
              <div className="mt-4 pt-4 border-t border-[#2D3149]/40">
                <p className="text-[#908fa0] text-[10px] mb-2 font-semibold uppercase tracking-wider font-mono">
                  Popular Languages
                </p>
                <div className="flex flex-wrap gap-1.5 font-mono text-[9px] font-bold text-[#7bd0ff]">
                  {problem.stats.popularLanguages.map((lang) => (
                    <span
                      key={lang}
                      className="bg-[#7bd0ff]/10 border border-[#7bd0ff]/20 px-2 py-0.5 rounded-[4px]"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {problem.relatedProblems.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-[10px] font-mono font-bold text-[#908fa0] uppercase tracking-wider px-1">
                Related Problems
              </h4>
              <div className="space-y-2">
                {problem.relatedProblems.map((related) => (
                  <div
                    key={related.id}
                    onClick={() => navigate(`/problems/${related.slug}`)}
                    className="group block p-4 bg-[#1A1D27] border border-[#2D3149]/60 hover:border-[#6366F1]/50 hover:bg-[#1C2030] rounded-lg transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <span className="text-xs font-bold text-white group-hover:text-[#6366F1] transition-colors leading-tight">
                        {related.problemNumber}. {related.title}
                      </span>
                      <span
                        className={`text-[8px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border flex-shrink-0 ${
                          related.difficulty === 'Easy'
                            ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#10B981]'
                            : related.difficulty === 'Medium'
                              ? 'bg-[#22263A] border-[#2D3149] text-[#e4e1ed]'
                              : 'bg-[#d97721]/10 border-[#d97721]/30 text-[#d97721]'
                        }`}
                      >
                        {related.difficulty}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#908fa0] line-clamp-1">{related.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {problem.lastAttempt && (
            <div className="mt-auto bg-[#6366F1]/5 border border-[#6366F1]/20 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <History className="h-4 w-4 text-[#6366F1]" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Last Attempt</h4>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[9px] text-[#908fa0] uppercase tracking-wider font-mono">Time Taken</p>
                  <p className="text-base font-bold text-[#6366F1] font-mono">
                    {Math.floor(problem.lastAttempt.timeTakenSeconds / 60)}:
                    {String(problem.lastAttempt.timeTakenSeconds % 60).padStart(2, '0')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-[#908fa0] uppercase tracking-wider font-mono">Success</p>
                  <p
                    className={`text-base font-bold uppercase tracking-wider font-mono ${
                      problem.lastAttempt.status === 'passed' ? 'text-[#10B981]' : 'text-[#EF4444]'
                    }`}
                  >
                    {problem.lastAttempt.status === 'passed' ? 'Passed' : 'Failed'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </aside>
      </main>

      <CreateRoomModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default ProblemDetailPage;
