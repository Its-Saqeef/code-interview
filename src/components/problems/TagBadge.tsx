interface TagBadgeProps {
  label: string;
}

export const TagBadge = ({ label }: TagBadgeProps) => {
  return (
    <span className="text-[10px] font-mono font-medium text-[#7bd0ff] bg-[#7bd0ff]/10 border border-[#7bd0ff]/20 px-2 py-0.5 rounded-[4px] select-none">
      {label}
    </span>
  );
};

export default TagBadge;
