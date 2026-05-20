import clsx from 'clsx';

interface DifficultyBadgeProps {
  difficulty: 'Easy' | 'Medium' | 'Hard';
  className?: string;
}

export const DifficultyBadge = ({ difficulty, className }: DifficultyBadgeProps) => {
  return (
    <span 
      className={clsx(
        "px-2 py-0.5 font-mono text-[9px] font-bold tracking-wider rounded uppercase border",
        {
          'bg-[#00a6e0]/10 border-[#00a6e0]/30 text-[#00a6e0]': difficulty === 'Easy',
          'bg-[#22263A] border-[#2D3149] text-[#e4e1ed]': difficulty === 'Medium',
          'bg-[#d97721]/10 border-[#d97721]/30 text-[#d97721]': difficulty === 'Hard',
        },
        className
      )}
    >
      {difficulty}
    </span>
  );
};

export default DifficultyBadge;
