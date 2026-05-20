import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  History
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { DifficultyBadge } from '../components/problems/DifficultyBadge';
import { CreateRoomModal } from '../components/dashboard/CreateRoomModal';
import rainWaterImg from '../assets/rain_water.png';

interface RelatedProblem {
  id: string;
  num: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
}

const relatedProblemsList: RelatedProblem[] = [
  {
    id: 'container-with-most-water',
    num: 11,
    title: 'Container With Most Water',
    difficulty: 'Medium',
    description: 'Find two lines that together with the x-axis form a container...',
  },
  {
    id: 'largest-rectangle-in-histogram',
    num: 84,
    title: 'Largest Rectangle in Histogram',
    difficulty: 'Hard',
    description: "Given an array of integers heights representing the histogram's bar height...",
  },
  {
    id: 'trapping-rain-water-ii',
    num: 407,
    title: 'Trapping Rain Water II',
    difficulty: 'Hard',
    description: 'Given an m x n integer matrix heightMap representing the height of each unit cell...',
  },
];

export const ProblemDetailPage = () => {
  const navigate = useNavigate();
  const [constraintsExpanded, setConstraintsExpanded] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F1117] text-[#e4e1ed] font-inter flex flex-col overflow-hidden">
      {/* Top Header Bar */}
      <header className="h-14 bg-[#151824] border-b border-[#2D3149] flex justify-between items-center px-6 sticky top-0 z-40 select-none">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/problems')}
            className="p-1 rounded hover:bg-[#22263A] text-[#908fa0] hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4.5 w-4.5" />
          </button>
          <h1 className="text-sm font-bold text-white tracking-tight">
            42. Trapping Rain Water
          </h1>
          <DifficultyBadge difficulty="Hard" />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3.5 text-[#908fa0]">
            <Bell className="h-4.5 w-4.5 cursor-pointer hover:text-white transition-colors" />
            <HelpCircle className="h-4.5 w-4.5 cursor-pointer hover:text-white transition-colors" />
          </div>
          <div className="h-5 w-px bg-[#2D3149]" />
          <Button 
            onClick={() => setModalOpen(true)}
            className="h-8.5 px-4 text-xs font-bold"
          >
            Start Interview
          </Button>
        </div>
      </header>

      {/* Main content split panel */}
      <main className="flex-1 grid grid-cols-12 overflow-hidden bg-[#0F1117]">
        {/* Left Side Details Panel */}
        <section className="col-span-8 overflow-y-auto custom-scrollbar p-8 border-r border-[#2D3149]">
          <div className="max-w-3xl mx-auto space-y-8 text-left">
            {/* Hero Image */}
            <div className="rounded-lg overflow-hidden border border-[#2D3149] h-52 relative bg-[#151824] select-none">
              <img 
                className="w-full h-full object-cover opacity-95" 
                alt="Trapping Rain Water Illustration" 
                src={rainWaterImg} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117] via-transparent to-transparent" />
            </div>

            {/* Quick Metadata Info */}
            <div className="flex gap-3 select-none">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1A1D27] rounded-full border border-[#2D3149] text-[10px] text-[#908fa0] font-mono">
                <Clock className="h-3.5 w-3.5 text-[#6366F1]" />
                <span>45 mins recommended</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1A1D27] rounded-full border border-[#2D3149] text-[10px] text-[#908fa0] font-mono">
                <Users className="h-3.5 w-3.5 text-[#10B981]" />
                <span>Top FAANG question</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-white tracking-tight">Description</h2>
              <div className="text-xs text-[#908fa0] leading-relaxed space-y-3">
                <p>
                  Given <code>n</code> non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.
                </p>
                <p>
                  This problem tests your ability to handle <strong>two-pointer</strong> approaches or <strong>monotonic stacks</strong>. Efficient solutions typically achieve O(n) time complexity and O(1) space complexity.
                </p>
              </div>
            </div>

            {/* Examples */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white tracking-tight">Examples</h3>
              
              {/* Example 1 */}
              <div className="space-y-2">
                <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6366F1]">Example 1</p>
                <div className="bg-[#151824] border border-[#2D3149] p-4 rounded-lg font-mono text-xs space-y-1">
                  <div className="text-[#e4e1ed]">
                    <span className="text-[#908fa0]">Input:</span> height = [0,1,0,2,1,0,1,3,2,1,2,1]
                  </div>
                  <div className="text-[#e4e1ed]">
                    <span className="text-[#908fa0]">Output:</span> 6
                  </div>
                  <div className="text-[#908fa0] italic mt-2">
                    <span className="text-[#908fa0] not-italic font-semibold">Explanation:</span> The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
                  </div>
                </div>
              </div>

              {/* Example 2 */}
              <div className="space-y-2">
                <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6366F1]">Example 2</p>
                <div className="bg-[#151824] border border-[#2D3149] p-4 rounded-lg font-mono text-xs space-y-1">
                  <div className="text-[#e4e1ed]">
                    <span className="text-[#908fa0]">Input:</span> height = [4,2,0,3,2,5]
                  </div>
                  <div className="text-[#e4e1ed]">
                    <span className="text-[#908fa0]">Output:</span> 9
                  </div>
                </div>
              </div>
            </div>

            {/* Constraints accordion */}
            <div className="border-t border-[#2D3149]/40 pt-4">
              <button 
                onClick={() => setConstraintsExpanded(!constraintsExpanded)}
                className="w-full flex justify-between items-center py-2 text-white hover:text-[#6366F1] transition-colors"
              >
                <span className="text-sm font-bold tracking-tight">Constraints</span>
                {constraintsExpanded ? <ChevronUp className="h-4.5 w-4.5" /> : <ChevronDown className="h-4.5 w-4.5" />}
              </button>
              {constraintsExpanded && (
                <ul className="list-disc list-inside space-y-1.5 text-xs text-[#908fa0] font-mono pl-2 pt-2">
                  <li>n == height.length</li>
                  <li>1 &lt;= n &lt;= 2 * 10<sup>4</sup></li>
                  <li>0 &lt;= height[i] &lt;= 10<sup>5</sup></li>
                </ul>
              )}
            </div>

            {/* Hints Section */}
            <div className="space-y-4 pt-4 border-t border-[#2D3149]/40">
              <h3 className="text-sm font-bold text-white tracking-tight">Hints</h3>
              <div className="space-y-3">
                <div className="bg-[#151824] border border-[#2D3149] rounded-lg p-4 flex gap-4">
                  <Lightbulb className="h-5 w-5 text-[#d97721] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-[#908fa0] leading-relaxed">
                    Think about what determines the amount of water trapped at a specific bar. It depends on the maximum height to its left and its right.
                  </p>
                </div>
                <div className="bg-[#151824] border border-[#2D3149] rounded-lg p-4 flex gap-4">
                  <Lightbulb className="h-5 w-5 text-[#d97721] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-[#908fa0] leading-relaxed">
                    Can you solve it in a single pass using two pointers moving towards each other?
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
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
                onClick={() => navigate('/room/trapping-rain-water')}
                className="w-full sm:w-auto h-11 px-6 text-xs font-bold border-[#2D3149] hover:bg-[#22263A]"
              >
                Practice Solo
              </Button>
            </div>
          </div>
        </section>

        {/* Right Side Stats Panel */}
        <aside className="col-span-4 overflow-y-auto custom-scrollbar bg-[#151824]/60 p-6 flex flex-col gap-6 text-left select-none">
          {/* Community Stats */}
          <div className="bg-[#1A1D27] border border-[#2D3149] rounded-lg p-5 shadow-lg">
            <h4 className="text-[10px] font-mono font-bold text-[#908fa0] uppercase tracking-wider mb-4">
              Community Stats
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[#908fa0] text-[10px] mb-1 font-semibold uppercase tracking-wider font-mono">Acceptance</p>
                <p className="text-lg font-bold text-white">59.4%</p>
              </div>
              <div>
                <p className="text-[#908fa0] text-[10px] mb-1 font-semibold uppercase tracking-wider font-mono">Submissions</p>
                <p className="text-lg font-bold text-white">2.1M</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[#2D3149]/40">
              <p className="text-[#908fa0] text-[10px] mb-2 font-semibold uppercase tracking-wider font-mono">Popular Languages</p>
              <div className="flex flex-wrap gap-1.5 font-mono text-[9px] font-bold text-[#7bd0ff]">
                {['Python 3', 'C++', 'Java', 'Go'].map((lang) => (
                  <span key={lang} className="bg-[#7bd0ff]/10 border border-[#7bd0ff]/20 px-2 py-0.5 rounded-[4px]">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Related Problems */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-mono font-bold text-[#908fa0] uppercase tracking-wider px-1">
              Related Problems
            </h4>
            <div className="space-y-2">
              {relatedProblemsList.map((prob) => (
                <div 
                  key={prob.id}
                  onClick={() => navigate(`/problems/${prob.id}`)}
                  className="group block p-4 bg-[#1A1D27] border border-[#2D3149]/60 hover:border-[#6366F1]/50 hover:bg-[#1C2030] rounded-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-1 gap-2">
                    <span className="text-xs font-bold text-white group-hover:text-[#6366F1] transition-colors leading-tight">
                      {prob.num}. {prob.title}
                    </span>
                    <span className={`text-[8px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border flex-shrink-0 ${
                      prob.difficulty === 'Medium' 
                        ? 'bg-[#22263A] border-[#2D3149] text-[#e4e1ed]' 
                        : 'bg-[#d97721]/10 border-[#d97721]/30 text-[#d97721]'
                    }`}>
                      {prob.difficulty}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#908fa0] line-clamp-1">
                    {prob.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Last Attempt Card */}
          <div className="mt-auto bg-[#6366F1]/5 border border-[#6366F1]/20 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <History className="h-4 w-4 text-[#6366F1]" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Last Attempt</h4>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[9px] text-[#908fa0] uppercase tracking-wider font-mono">Time Taken</p>
                <p className="text-base font-bold text-[#6366F1] font-mono">32:14</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-[#908fa0] uppercase tracking-wider font-mono">Success</p>
                <p className="text-base font-bold text-[#10B981] uppercase tracking-wider font-mono">Passed</p>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Modal Trigger setup */}
      <CreateRoomModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default ProblemDetailPage;
