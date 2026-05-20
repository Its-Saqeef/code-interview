import { useState } from 'react';
import { 
  ChevronDown, 
  Lightbulb, 
  RotateCcw, 
  Play, 
  Send 
} from 'lucide-react';
import { Button } from '../ui/Button';

interface CodeLine {
  num: number;
  text: string;
  indent: number;
  type?: 'keyword' | 'comment' | 'type' | 'normal' | 'active';
}

const initialCodeLines: CodeLine[] = [
  { num: 1, text: 'def find_median_sorted_arrays(nums1: List[int], nums2: List[int]) -> float:', indent: 0 },
  { num: 2, text: '# Implement O(log(m+n)) solution here', indent: 4, type: 'comment' },
  { num: 3, text: 'm, n = len(nums1), len(nums2)', indent: 4 },
  { num: 4, text: 'if m > n:', indent: 4 },
  { num: 5, text: 'nums1, nums2, m, n = nums2, nums1, n, m', indent: 8 },
  { num: 6, text: '', indent: 4 },
  { num: 7, text: 'imin, imax, half_len = 0, m, (m + n + 1) // 2', indent: 4 },
  { num: 8, text: 'while imin <= imax:', indent: 4, type: 'active' },
  { num: 9, text: 'i = (imin + imax) // 2', indent: 8 },
  { num: 10, text: 'j = half_len - i', indent: 8 },
  { num: 11, text: 'if i < m and nums2[j-1] > nums1[i]:', indent: 8 },
  { num: 12, text: 'imin = i + 1', indent: 12 },
  { num: 13, text: 'elif i > 0 and nums1[i-1] > nums2[j]:', indent: 8 },
  { num: 14, text: 'imax = i - 1', indent: 12 },
  { num: 15, text: 'else:', indent: 8 },
  { num: 16, text: '# Boundary reached or perfect i found', indent: 12, type: 'comment' },
  { num: 17, text: 'pass', indent: 12 },
];

export const CodeEditor = () => {
  const [hintsActive, setHintsActive] = useState(false);

  const renderSyntax = (line: CodeLine) => {
    if (line.type === 'comment') {
      return <span className="text-[#908fa0] italic">{line.text}</span>;
    }
    
    // Highlight Python keywords
    let content = line.text;
    const parts = content.split(/(\bdef\b|\bif\b|\belif\b|\belse\b|\bwhile\b|\band\b|\bpass\b|\blen\b|\bList\b|\bint\b|\bfloat\b)/g);
    
    return (
      <span>
        {parts.map((part, idx) => {
          if (['def', 'if', 'elif', 'else', 'while', 'and', 'pass'].includes(part)) {
            return <span key={idx} className="text-[#6366F1] font-semibold">{part}</span>;
          }
          if (['len'].includes(part)) {
            return <span key={idx} className="text-[#00a6e0]">{part}</span>;
          }
          if (['List', 'int', 'float'].includes(part)) {
            return <span key={idx} className="text-[#d97721]">{part}</span>;
          }
          return <span key={idx} className="text-[#e4e1ed]">{part}</span>;
        })}
      </span>
    );
  };

  return (
    <section className="flex-1 flex flex-col border-r border-[#2D3149] bg-[#0F1117]">
      {/* Editor Header Toolbar */}
      <div className="h-10 border-b border-[#2D3149] flex items-center justify-between px-4 bg-[#151824] select-none">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 cursor-pointer text-[#e4e1ed] hover:text-[#6366F1] transition-colors">
            <span className="font-mono text-xs font-semibold">main.py</span>
            <ChevronDown className="h-3 w-3" />
          </div>
          <div className="h-4 w-px bg-[#2D3149]" />
          <span className="text-[#908fa0] font-mono text-[10px] uppercase tracking-wider">Python 3.10</span>
        </div>
        <div className="flex items-center gap-4 text-[#908fa0] font-mono text-[10px] uppercase tracking-wider">
          <span>Spaces: 4</span>
          <span>UTF-8</span>
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 overflow-auto font-mono text-xs p-4 space-y-1.5 selection:bg-[#6366F1]/30 selection:text-white">
        {initialCodeLines.map((line) => (
          <div 
            key={line.num} 
            className={`flex items-center min-h-[22px] transition-colors ${
              line.type === 'active' 
                ? 'bg-[#1E2235] border-l-2 border-[#6366F1]' 
                : 'border-l-2 border-transparent'
            }`}
          >
            {/* Gutter Line Number */}
            <span className="w-10 text-right pr-4 text-[#908fa0]/40 select-none">
              {line.num}
            </span>
            {/* Line Text */}
            <span style={{ paddingLeft: `${line.indent * 4}px` }}>
              {renderSyntax(line)}
            </span>
          </div>
        ))}
      </div>

      {/* Editor Footer Toolbar */}
      <div className="h-14 border-t border-[#2D3149] flex items-center justify-between px-4 bg-[#151824] select-none">
        <div className="flex items-center gap-4">
          {/* Hints Toggle */}
          <button 
            type="button"
            onClick={() => setHintsActive(!hintsActive)}
            className="flex items-center gap-2 text-[#908fa0] hover:text-white transition-colors text-[11px] font-semibold uppercase tracking-wider"
          >
            <Lightbulb className="h-4 w-4 text-[#d97721]" />
            <span>Hints</span>
            <div className={`w-8 h-4.5 rounded-full p-0.5 transition-colors ${hintsActive ? 'bg-[#6366F1]' : 'bg-[#2D3149]'}`}>
              <div className={`w-3.5 h-3.5 bg-white rounded-full transition-transform duration-200 ${hintsActive ? 'translate-x-3.5' : 'translate-x-0'}`} />
            </div>
          </button>
          
          <button 
            type="button"
            className="flex items-center gap-1.5 text-[#908fa0] hover:text-white transition-colors text-[11px] font-semibold uppercase tracking-wider ml-4"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="secondary"
            className="h-9 px-4 text-xs border-[#2D3149] hover:bg-[#22263A] gap-1.5"
          >
            <Play className="h-3.5 w-3.5" />
            <span>Run Code</span>
          </Button>
          <Button 
            className="h-9 px-4 text-xs gap-1.5 font-bold shadow-[0px_0px_12px_rgba(99,102,241,0.25)]"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Submit</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CodeEditor;
