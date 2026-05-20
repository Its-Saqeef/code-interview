import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { DifficultyBadge } from './DifficultyBadge';
import { TagBadge } from './TagBadge';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  acceptance: string;
  solved: boolean;
}

interface ProblemCardProps {
  problem: Problem;
}

export const ProblemCard = ({ problem }: ProblemCardProps) => {
  const navigate = useNavigate();

  const handleAction = () => {
    navigate(`/problems/${problem.id}`);
  };

  return (
    <Card className="bg-[#1A1D27] border-[#2D3149] rounded-lg p-5 flex flex-col hover:border-[#6366F1] transition-all duration-300 group shadow-lg text-left">
      <div className="flex justify-between items-start mb-4 gap-3">
        <h4 className="text-sm font-bold text-white group-hover:text-[#6366F1] transition-colors leading-snug">
          {problem.title}
        </h4>
        <DifficultyBadge difficulty={problem.difficulty} className="flex-shrink-0" />
      </div>

      <div className="flex flex-wrap gap-1.5 mb-6 select-none">
        {problem.tags.map((tag) => (
          <TagBadge key={tag} label={tag} />
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#2D3149]/40 select-none">
        <div className="flex flex-col text-left">
          <span className="text-[9px] font-mono font-semibold tracking-wider text-[#908fa0] uppercase">Acceptance</span>
          <span className="font-mono text-xs font-semibold text-[#7bd0ff]">{problem.acceptance}</span>
        </div>

        {problem.solved ? (
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-4.5 w-4.5 text-[#10B981]" />
            <Button 
              onClick={handleAction}
              variant="secondary"
              className="h-8.5 px-3.5 text-[10px] font-bold uppercase tracking-wider border-[#2D3149] hover:bg-[#22263A]"
            >
              Review
            </Button>
          </div>
        ) : (
          <Button 
            onClick={handleAction}
            className="h-8.5 px-3.5 text-[10px] font-bold uppercase tracking-wider"
          >
            Solve
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ProblemCard;
