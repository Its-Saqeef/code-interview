import clsx from "clsx";

export interface BadgeProps {
    variant: "success" | "inprogress" | "error" | "neutral";
    label: string;
    className?: string;
}

export function Badge({ variant, label, className }: BadgeProps) {
    return (
        <div className={clsx("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] text-xs font-medium border", {
            'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20': variant === 'success',
            'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20': variant === 'error',
            'bg-[#6366F1]/10 text-[#6366F1] border-[#6366F1]/20': variant === 'inprogress',
            'bg-[#22263A] text-[#e4e1ed] border-[#2D3149]': variant === 'neutral'
        }, className)}>
            {variant !== 'neutral' && (
                <span className={clsx("w-1.5 h-1.5 rounded-full", {
                    'bg-[#10B981]': variant === 'success',
                    'bg-[#EF4444]': variant === 'error',
                    'bg-[#6366F1]': variant === 'inprogress',
                })} />
            )}
            <span>{label}</span>
        </div>
    );
}

export default Badge;