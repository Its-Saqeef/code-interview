

export interface ToggleProps {
    isOn: boolean;
    onToggle: () => void;
    className?: string;
}

export const Toggle = ({ isOn, onToggle, className = '' }: ToggleProps) => {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={isOn}
            onClick={onToggle}
            className={`
                relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center 
                rounded-[6px] transition-colors duration-200 ease-in-out 
                focus:outline-none focus:ring-offset-2 focus:ring-offset-[#0F1117]
                ${className}
            `.trim()}
        >
            <span 
                className={`
                    absolute inset-0 rounded-[6px] border transition-colors duration-200 ease-in-out
                    ${isOn ? 'bg-[#6366F1] border-[#6366F1]' : 'bg-[#1A1D27] border-[#2D3149]'}
                `} 
                aria-hidden="true" 
            />
            <span
                aria-hidden="true"
                className={`
                    pointer-events-none relative inline-block h-3.5 w-3.5 transform rounded-[4px] bg-white shadow
                    transition duration-200 ease-in-out
                    ${isOn ? 'translate-x-2.5 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : '-translate-x-2.5'}
                `}
            />
        </button>
    );
};

export default Toggle;