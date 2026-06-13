import { Loader2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { PracticeSessionProvider, usePracticeSession } from '../context/PracticeSessionContext';
import { PracticeTopbar } from '../components/practice/PracticeTopbar';
import { PracticeCodeEditor } from '../components/practice/PracticeCodeEditor';
import { PracticeRightPanel } from '../components/practice/PracticeRightPanel';
import { Button } from '../components/ui/Button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

function PracticeWorkspace() {
  const { problem, isLoading, error } = usePracticeSession();

  useDocumentTitle(
    problem ? `Practice: ${problem.problemNumber}. ${problem.title}` : 'Solo Practice',
  );

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0F1117]">
        <div className="flex flex-col items-center gap-3 text-[#908fa0]">
          <Loader2 className="h-8 w-8 animate-spin text-[#6366F1]" />
          <p className="text-sm font-mono uppercase tracking-wider">Loading workspace...</p>
        </div>
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 bg-[#0F1117] px-6 text-center">
        <p className="text-sm font-semibold text-[#EF4444]">{error ?? 'Problem not found'}</p>
        <Button onClick={() => window.history.back()} className="text-xs font-bold">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <>
      <PracticeTopbar />
      <main className="flex-1 flex overflow-hidden min-h-0">
        <div className="w-[60%] flex flex-col min-h-0">
          <PracticeCodeEditor />
        </div>
        <PracticeRightPanel />
      </main>
    </>
  );
}

export function PracticePage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0F1117] text-[#EF4444] text-sm">
        Invalid practice session
      </div>
    );
  }

  return (
    <PracticeSessionProvider slug={slug}>
      <div className="h-screen flex flex-col bg-[#0F1117] text-[#e4e1ed] font-inter overflow-hidden">
        <PracticeWorkspace />
      </div>
    </PracticeSessionProvider>
  );
}

export default PracticePage;
