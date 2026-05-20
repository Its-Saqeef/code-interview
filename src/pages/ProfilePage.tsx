import { useState, useMemo } from 'react';
import { 
  Bell, 
  HelpCircle, 
  Calendar, 
  Globe, 
  Link as LinkIcon, 
  Award, 
  Flame, 
  Lock, 
  Trophy, 
  Rocket, 
  ChevronRight,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Submission {
  id: string;
  status: 'Accepted' | 'Wrong Answer' | 'TLE' | 'Runtime Error';
  problem: string;
  language: string;
  runtime: string;
  time: string;
}

const mockSubmissions: Submission[] = [
  { id: '1', status: 'Accepted', problem: 'Valid Sudoku', language: 'TypeScript', runtime: '72 ms', time: '2h ago' },
  { id: '2', status: 'Accepted', problem: 'LRU Cache', language: 'Python', runtime: '154 ms', time: 'Yesterday' },
  { id: '3', status: 'Wrong Answer', problem: 'Merge K Sorted Lists', language: 'Rust', runtime: '—', time: 'Oct 24, 2023' },
  { id: '4', status: 'Accepted', problem: 'Trap Rain Water', language: 'TypeScript', runtime: '88 ms', time: 'Oct 23, 2023' },
];

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [showAllAchievements, setShowAllAchievements] = useState(false);

  // Generate mock heatmap cells: 35 columns, 7 rows
  const heatmapData = useMemo(() => {
    const cols = [];
    for (let c = 0; c < 35; c++) {
      const row = [];
      for (let r = 0; r < 7; r++) {
        // Random selection with higher probability of lower density
        const rand = Math.random();
        const density = rand < 0.4 ? 0 : rand < 0.7 ? 1 : rand < 0.9 ? 2 : 3;
        row.push(density);
      }
      cols.push(row);
    }
    return cols;
  }, []);

  return (
    <div className="flex flex-col min-h-[calc(100vh-56px)] bg-[#0F1117] text-[#e4e1ed] font-inter select-none">
      {/* Top Header */}
      <header className="h-14 bg-[#151824] border-b border-[#2D3149] flex justify-between items-center px-6 sticky top-0 z-40 select-none flex-shrink-0">
        <h1 className="text-sm font-bold text-white tracking-tight">Profile</h1>
        <div className="flex items-center gap-3">
          <button className="p-1.5 rounded hover:bg-[#22263A] text-[#908fa0] hover:text-white transition-colors">
            <Bell className="h-4.5 w-4.5" />
          </button>
          <button className="p-1.5 rounded hover:bg-[#22263A] text-[#908fa0] hover:text-white transition-colors">
            <HelpCircle className="h-4.5 w-4.5" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-grow p-6 space-y-6 max-w-[1140px] mx-auto w-full text-left">
        {/* Profile Header Bento section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Identity card */}
          <div className="md:col-span-2 bg-[#151824] border border-[#2D3149] rounded-lg p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-28 h-28 rounded-lg bg-[#6366F1]/10 border border-[#2D3149] flex items-center justify-center text-3xl font-black text-[#6366F1] flex-shrink-0 select-none">
              AC
            </div>
            <div className="flex-grow space-y-4 text-center sm:text-left">
              <div>
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <h2 className="text-xl font-bold text-white tracking-tight">Alex Chen</h2>
                  <span className="bg-[#6366F1]/20 text-[#6366F1] border border-[#6366F1]/30 px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider">
                    Pro Member
                  </span>
                </div>
                <p className="text-xs font-mono text-[#908fa0] mt-0.5">@alechen_dev</p>
              </div>

              <p className="text-xs text-[#908fa0] leading-relaxed max-w-lg">
                Full-stack engineer passionate about distributed systems and competitive programming.
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-y-2 gap-x-4 text-[10px] font-mono text-[#908fa0]">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Joined Oct 2022</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" />
                  <span>United States 🇺🇸</span>
                </div>
                <a 
                  href="https://github.com/alex-chen" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-[#6366F1] hover:underline"
                >
                  <LinkIcon className="h-3.5 w-3.5" />
                  <span>github.com/alex-chen</span>
                </a>
              </div>
            </div>
          </div>

          {/* Badges Achievements card */}
          <div className="bg-[#151824] border border-[#2D3149] rounded-lg p-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold text-white tracking-tight uppercase">Achievements</h3>
                <Award className="h-4.5 w-4.5 text-[#6366F1]" />
              </div>
              <div className="grid grid-cols-4 gap-2.5">
                <div 
                  title="Elite Solver"
                  className="aspect-square bg-[#1A1D27] rounded-lg flex items-center justify-center border border-[#2D3149] hover:border-[#6366F1] transition-all cursor-pointer group"
                >
                  <Trophy className="h-6 w-6 text-[#d97721] fill-[#d97721]/15 group-hover:scale-110 transition-transform" />
                </div>
                <div 
                  title="Fast Runner"
                  className="aspect-square bg-[#1A1D27] rounded-lg flex items-center justify-center border border-[#2D3149] hover:border-[#7bd0ff] transition-all cursor-pointer group"
                >
                  <Rocket className="h-6 w-6 text-[#7bd0ff] fill-[#7bd0ff]/15 group-hover:scale-110 transition-transform" />
                </div>
                <div 
                  title="Daily Streak Master"
                  className="aspect-square bg-[#1A1D27] rounded-lg flex items-center justify-center border border-[#2D3149] hover:border-[#EF4444] transition-all cursor-pointer group"
                >
                  <Flame className="h-6 w-6 text-[#EF4444] fill-[#EF4444]/15 group-hover:scale-110 transition-transform" />
                </div>
                <div 
                  title="Locked achievement"
                  className="aspect-square bg-[#1A1D27] rounded-lg flex items-center justify-center border border-[#2D3149]/40 opacity-30 select-none"
                >
                  <Lock className="h-5 w-5 text-[#908fa0]" />
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowAllAchievements(!showAllAchievements)}
              className="w-full mt-4 py-2 border border-[#2D3149] hover:bg-[#1A1D27] rounded text-[9px] font-mono font-bold uppercase tracking-wider text-[#908fa0] hover:text-white transition-all"
            >
              {showAllAchievements ? 'Collapse list' : 'View All Badges'}
            </button>
          </div>
        </section>

        {/* Stats Row Cards */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#151824] border border-[#2D3149] p-5 rounded-lg text-left shadow-lg">
            <p className="text-[9px] font-mono font-bold text-[#908fa0] uppercase tracking-wider mb-2">Solved</p>
            <p className="text-xl font-bold text-[#6366F1]">1,248</p>
          </div>
          <div className="bg-[#151824] border border-[#2D3149] p-5 rounded-lg text-left shadow-lg">
            <p className="text-[9px] font-mono font-bold text-[#908fa0] uppercase tracking-wider mb-2">Sessions</p>
            <p className="text-xl font-bold text-white">312</p>
          </div>
          <div className="bg-[#151824] border border-[#2D3149] p-5 rounded-lg text-left shadow-lg">
            <p className="text-[9px] font-mono font-bold text-[#908fa0] uppercase tracking-wider mb-2">Win Rate</p>
            <p className="text-xl font-bold text-[#7bd0ff]">68.4%</p>
          </div>
          <div className="bg-[#151824] border border-[#2D3149] p-5 rounded-lg text-left shadow-lg">
            <p className="text-[9px] font-mono font-bold text-[#908fa0] uppercase tracking-wider mb-2">Streak</p>
            <div className="flex items-center gap-1.5">
              <p className="text-xl font-bold text-[#EF4444]">14</p>
              <Flame className="h-5 w-5 text-[#EF4444] fill-[#EF4444]/20" />
            </div>
          </div>
        </section>

        {/* Activity & Preferred languages */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Heatmap block */}
          <div className="lg:col-span-2 bg-[#151824] border border-[#2D3149] rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white tracking-tight uppercase">Activity Map</h3>
              <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-[#908fa0] uppercase">
                <span>Less</span>
                <div className="w-2.5 h-2.5 bg-[#1A1D27] rounded-[2px]" />
                <div className="w-2.5 h-2.5 bg-[#6366F1]/30 rounded-[2px]" />
                <div className="w-2.5 h-2.5 bg-[#6366F1]/60 rounded-[2px]" />
                <div className="w-2.5 h-2.5 bg-[#6366F1] rounded-[2px]" />
                <span>More</span>
              </div>
            </div>

            {/* Grid */}
            <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin select-none">
              <div className="flex flex-col justify-between text-[9px] font-mono text-[#908fa0] h-24 pr-1">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>
              <div className="flex gap-1">
                {heatmapData.map((col, cIdx) => (
                  <div key={cIdx} className="flex flex-col gap-1">
                    {col.map((density, rIdx) => (
                      <div 
                        key={rIdx} 
                        className={`w-2.5 h-2.5 rounded-[2px] ${
                          density === 3 
                            ? 'bg-[#6366F1]' 
                            : density === 2 
                            ? 'bg-[#6366F1]/70' 
                            : density === 1 
                            ? 'bg-[#6366F1]/30' 
                            : 'bg-[#1A1D27]'
                        }`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preferred Languages Bar Chart */}
          <div className="bg-[#151824] border border-[#2D3149] rounded-lg p-5 space-y-4 flex flex-col justify-between">
            <h3 className="text-xs font-bold text-white tracking-tight uppercase">Preferred Languages</h3>
            <div className="space-y-3.5">
              {[
                { name: 'TypeScript', pct: 42, color: 'bg-[#6366F1]' },
                { name: 'Python', pct: 28, color: 'bg-[#7bd0ff]' },
                { name: 'Go', pct: 18, color: 'bg-[#d97721]' },
                { name: 'Rust', pct: 12, color: 'bg-[#10B981]' },
              ].map((lang) => (
                <div key={lang.name} className="space-y-1 text-left">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="font-semibold text-white">{lang.name}</span>
                    <span className="text-[#908fa0]">{lang.pct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#1A1D27] rounded-full overflow-hidden">
                    <div className={`h-full ${lang.color} rounded-full`} style={{ width: `${lang.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Submissions */}
        <section className="bg-[#151824] border border-[#2D3149] rounded-lg overflow-hidden">
          <div className="p-5 border-b border-[#2D3149]/60 flex justify-between items-center">
            <h3 className="text-xs font-bold text-white tracking-tight uppercase">Recent Submissions</h3>
            <button 
              onClick={() => navigate('/history')}
              className="text-[#6366F1] hover:text-white text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-[#1A1D27]/30 text-[#908fa0] text-[9px] font-mono font-bold uppercase tracking-wider">
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Problem</th>
                  <th className="px-6 py-3.5">Language</th>
                  <th className="px-6 py-3.5">Runtime</th>
                  <th className="px-6 py-3.5">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2D3149]/30 text-xs">
                {mockSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-[#1A1D27]/25 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        {sub.status === 'Accepted' ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                            <span className="text-[#10B981] font-semibold">Accepted</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 text-[#EF4444]" />
                            <span className="text-[#EF4444] font-semibold">{sub.status}</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-white font-medium">
                      {sub.problem}
                    </td>
                    <td className="px-6 py-3.5 font-mono text-[#7bd0ff]">
                      {sub.language}
                    </td>
                    <td className="px-6 py-3.5 font-mono text-[#908fa0]">
                      {sub.runtime}
                    </td>
                    <td className="px-6 py-3.5 text-[#908fa0]">
                      {sub.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
