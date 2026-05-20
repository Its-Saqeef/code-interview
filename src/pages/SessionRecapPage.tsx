import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Play, 
  Pause,
  Copy,
  CheckCircle2,
  Terminal,
  Settings,
  Maximize2,
  Download,
  Share2,
  ArrowLeft,
  Video,
  Mic,
  MessageSquareCode
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export const SessionRecapPage = () => {
  const navigate = useNavigate();
  const { recapId } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.5 | 2>(1.5);
  const [progress] = useState(85); // 85% progress

  const codeSnippet = `import collections

def shortest_path(grid, start, end):
    # BFS Implementation for grid search
    rows, cols = len(grid), len(grid[0])
    queue = collections.deque([(start, 0)])
    visited = set([start])
    
    while queue:
        (r, c), dist = queue.popleft()
        if (r, c) == end:
            return dist
            
        for dr, dc in [(0,1), (0,-1), (1,0), (-1,0)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 0:
                if (nr, nc) not in visited:
                    visited.add((nr, nc))
                    queue.append(((nr, nc), dist + 1))`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] bg-[#13131B] text-[#e4e1ed] font-inter overflow-hidden select-none">
      {/* Top Header */}
      <header className="h-14 bg-[#1F1F27] border-b border-[#2D3149] flex justify-between items-center px-6 sticky top-0 z-40 select-none flex-shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/history')}
            className="p-1 rounded hover:bg-[#2D3149] text-[#908fa0] hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4.5 w-4.5" />
          </button>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-white leading-tight">Optimal Path Search</span>
            <span className="text-[9px] font-mono font-bold text-[#908fa0] uppercase tracking-wider">
              Oct 24, 2023 • 45:00 Duration • Session {recapId || 's1'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] text-[10px] font-mono font-bold uppercase rounded-full">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Accepted</span>
          </div>
          <div className="h-4 w-px bg-[#2D3149]" />
          <div className="flex items-center gap-3 text-[#908fa0]">
            <Video className="h-4.5 w-4.5 cursor-pointer hover:text-white transition-colors" />
            <Mic className="h-4.5 w-4.5 cursor-pointer hover:text-white transition-colors" />
          </div>
          <Button 
            onClick={() => navigate('/history')}
            className="h-8.5 px-3.5 text-[10px] font-bold uppercase tracking-wider"
          >
            Exit Review
          </Button>
        </div>
      </header>

      {/* Main split viewport */}
      <main className="flex-grow flex overflow-hidden">
        {/* Left editor box */}
        <section className="flex-1 flex flex-col bg-[#0F1117] overflow-hidden border-r border-[#2D3149]">
          {/* File Tab header */}
          <div className="h-10 bg-[#1A1D27] border-b border-[#2D3149]/60 px-5 flex items-center justify-between select-none">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <Terminal className="h-4 w-4 text-[#d97721]" />
              <span>solution.py</span>
            </div>
            <button 
              onClick={handleCopyCode}
              className="text-[#908fa0] hover:text-white flex items-center gap-1.5 text-[10px] font-mono uppercase font-bold"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Syntax display */}
          <div className="flex-grow overflow-y-auto p-5 custom-scrollbar font-mono text-xs text-left leading-relaxed flex gap-4">
            <div className="text-right text-[#464554] select-none pr-3 border-r border-[#2D3149]/30 font-medium">
              {Array.from({ length: 18 }, (_, i) => i + 1).map(num => (
                <div key={num}>{num}</div>
              ))}
            </div>
            <div className="text-[#e4e1ed] overflow-x-auto w-full select-text">
              <span className="text-[#d97721]">import</span> collections<br />
              <br />
              <span className="text-[#d97721]">def</span> <span className="text-[#7bd0ff]">shortest_path</span>(grid, start, end):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#464554]"># BFS Implementation for grid search</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;rows, cols = len(grid), len(grid[0])<br />
              &nbsp;&nbsp;&nbsp;&nbsp;queue = collections.deque([(start, 0)])<br />
              &nbsp;&nbsp;&nbsp;&nbsp;visited = set([start])<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#d97721]">while</span> queue:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(r, c), dist = queue.popleft()<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#d97721]">if</span> (r, c) == end:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#d97721]">return</span> dist<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#d97721]">for</span> dr, dc <span className="text-[#d97721]">in</span> [(0,1), (0,-1), (1,0), (-1,0)]:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nr, nc = r + dr, c + dc<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#d97721]">if</span> 0 &lt;= nr &lt; rows <span className="text-[#d97721]">and</span> 0 &lt;= nc &lt; cols <span className="text-[#d97721]">and</span> grid[nr][nc] == 0:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#d97721]">if</span> (nr, nc) <span className="text-[#d97721]">not in</span> visited:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;visited.add((nr, nc))<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;queue.append(((nr, nc), dist + 1))
            </div>
          </div>
        </section>

        {/* Right stats/feedback column */}
        <aside className="w-[440px] bg-[#151824] flex flex-col overflow-hidden select-none text-left">
          {/* Top Performance Stats */}
          <div className="p-5 border-b border-[#2D3149] grid grid-cols-2 gap-4">
            <div className="bg-[#1A1D27] p-3 rounded-lg border border-[#2D3149]/60 text-left">
              <p className="text-[9px] font-mono font-bold text-[#908fa0] uppercase tracking-wider mb-1">Runtime</p>
              <p className="text-lg font-bold text-[#6366F1]">24ms</p>
              <p className="text-[10px] text-[#908fa0] mt-0.5">Beats 94.2% of Python3</p>
            </div>
            <div className="bg-[#1A1D27] p-3 rounded-lg border border-[#2D3149]/60 text-left">
              <p className="text-[9px] font-mono font-bold text-[#908fa0] uppercase tracking-wider mb-1">Memory</p>
              <p className="text-lg font-bold text-[#7bd0ff]">16.4MB</p>
              <p className="text-[10px] text-[#908fa0] mt-0.5">Beats 82.1% of Python3</p>
            </div>
          </div>

          {/* Scrollable detailed tabs content */}
          <div className="flex-grow overflow-y-auto p-5 space-y-6 custom-scrollbar">
            {/* Test Case Results */}
            <div className="space-y-3.5">
              <h3 className="text-[10px] font-mono font-bold text-[#908fa0] uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#7bd0ff]" />
                <span>Test Case Results</span>
              </h3>
              <div className="space-y-2">
                {[
                  { name: 'Test Case 1: Minimal Grid', duration: '0.4ms' },
                  { name: 'Test Case 2: Large Maze', duration: '12.1ms' },
                  { name: 'Test Case 3: No Path', duration: '1.2ms' },
                ].map((tc, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between p-3 bg-[#1A1D27] border border-[#2D3149]/40 rounded-lg text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4.5 w-4.5 text-[#10B981]" />
                      <span className="font-medium text-white">{tc.name}</span>
                    </div>
                    <span className="font-mono text-[#908fa0] text-[10px]">{tc.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interviewer Notes */}
            <div className="space-y-3.5 pt-5 border-t border-[#2D3149]/40">
              <h3 className="text-[10px] font-mono font-bold text-[#908fa0] uppercase tracking-wider flex items-center gap-2">
                <MessageSquareCode className="h-4 w-4 text-[#6366F1]" />
                <span>Interviewer Notes</span>
              </h3>
              <div className="bg-[#1A1D27]/80 p-4 border border-[#2D3149]/40 rounded-lg space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#6366F1]/10 border border-[#6366F1]/30 flex items-center justify-center font-bold text-[10px] text-[#6366F1]">
                    DC
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">David Chen</p>
                    <p className="text-[10px] text-[#908fa0] font-mono">Lead Engineer • Interviewer</p>
                  </div>
                </div>
                <p className="text-xs text-[#908fa0] leading-relaxed italic">
                  "Solid understanding of BFS. The candidate was able to explain the space complexity trade-offs when using a set for visited nodes versus in-place modification. Clean code structure, although could have used more descriptive variable names for directions."
                </p>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-4 bg-[#1F1F27] border-t border-[#2D3149] flex gap-3 flex-shrink-0">
            <Button
              variant="secondary"
              className="flex-1 h-10 text-[10px] font-bold uppercase tracking-wider border-[#2D3149] hover:bg-[#22263A] gap-2"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download Report</span>
            </Button>
            <Button
              variant="secondary"
              className="flex-1 h-10 text-[10px] font-bold uppercase tracking-wider border-[#2D3149] hover:bg-[#22263A] gap-2"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Share</span>
            </Button>
          </div>
        </aside>
      </main>

      {/* Playback Progress Timeline bar */}
      <footer className="h-18 bg-[#1F1F27] border-t border-[#2D3149] px-6 flex items-center gap-4 flex-shrink-0 select-none">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#6366F1] text-white hover:brightness-110 active:scale-95 transition-all flex-shrink-0 shadow-md"
        >
          {isPlaying ? <Pause className="h-5 w-5 fill-white" /> : <Play className="h-5 w-5 fill-white pl-0.5" />}
        </button>

        <div className="flex-grow flex flex-col gap-1.5 text-left">
          {/* Progress bar container */}
          <div className="relative w-full h-1.5 bg-[#2D3149] rounded-full overflow-hidden cursor-pointer">
            <div 
              style={{ width: `${progress}%` }}
              className="absolute left-0 top-0 h-full bg-[#6366F1] transition-all duration-300"
            />
            {/* Event Markers */}
            <div className="absolute left-[15%] top-0 h-full w-1 bg-white/40" title="Started coding" />
            <div className="absolute left-[45%] top-0 h-full w-1 bg-white/40" title="First run" />
            <div className="absolute left-[70%] top-0 h-full w-1 bg-white/40" title="Refactored constraints" />
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono font-bold text-[#908fa0] uppercase tracking-wider">
            <span>00:00</span>
            <div className="flex items-center gap-4">
              <span className="text-white">38:15 / 45:00</span>
              <div className="h-3.5 w-px bg-[#2D3149]" />
              <button 
                onClick={() => setPlaybackSpeed((prev) => prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1)}
                className="hover:text-white transition-colors"
              >
                Speed: {playbackSpeed}x
              </button>
            </div>
            <span>45:00</span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 pl-4 border-l border-[#2D3149] text-[#908fa0] flex-shrink-0">
          <Settings className="h-4.5 w-4.5 cursor-pointer hover:text-white transition-colors" />
          <Maximize2 className="h-4.5 w-4.5 cursor-pointer hover:text-white transition-colors" />
        </div>
      </footer>
    </div>
  );
};

export default SessionRecapPage;
