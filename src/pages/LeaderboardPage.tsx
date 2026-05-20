import { useState, useMemo } from 'react';
import { 
  Bell, 
  HelpCircle, 
  Flame, 
  ArrowUp, 
  Award,
  Crown,
  Search
} from 'lucide-react';
import { Input } from '../components/ui/Input';

interface LeaderboardEntry {
  rank: number;
  name: string;
  username: string;
  problemsSolved: number;
  avgRuntime: string;
  sessionsWon: number;
  streak: number | null;
  isCurrentUser: boolean;
  avatarColor: string;
}

const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    name: 'Jordan Vance',
    username: '@vance_codes',
    problemsSolved: 1284,
    avgRuntime: '42ms',
    sessionsWon: 312,
    streak: 45,
    isCurrentUser: false,
    avatarColor: 'bg-[#FFD700]/25 text-[#FFD700] border-[#FFD700]',
  },
  {
    rank: 2,
    name: 'Sarah Kim',
    username: '@skim_stack',
    problemsSolved: 1156,
    avgRuntime: '58ms',
    sessionsWon: 289,
    streak: 12,
    isCurrentUser: false,
    avatarColor: 'bg-[#C0C0C0]/25 text-[#C0C0C0] border-[#C0C0C0]',
  },
  {
    rank: 3,
    name: 'Marcus Park',
    username: '@park_io',
    problemsSolved: 1092,
    avgRuntime: '61ms',
    sessionsWon: 245,
    streak: 8,
    isCurrentUser: false,
    avatarColor: 'bg-[#CD7F32]/25 text-[#CD7F32] border-[#CD7F32]',
  },
  {
    rank: 4,
    name: 'Elena Lopez',
    username: '@elena_dev',
    problemsSolved: 945,
    avgRuntime: '74ms',
    sessionsWon: 198,
    streak: null,
    isCurrentUser: false,
    avatarColor: 'bg-[#6366F1]/10 text-[#908fa0] border-[#2D3149]',
  },
  {
    rank: 12,
    name: 'Alex Chen',
    username: '@alex_pro',
    problemsSolved: 752,
    avgRuntime: '88ms',
    sessionsWon: 112,
    streak: 21,
    isCurrentUser: true,
    avatarColor: 'bg-[#6366F1]/20 text-[#6366F1] border-[#6366F1]',
  },
  {
    rank: 13,
    name: 'David Wu',
    username: '@dwu_codes',
    problemsSolved: 748,
    avgRuntime: '92ms',
    sessionsWon: 109,
    streak: 4,
    isCurrentUser: false,
    avatarColor: 'bg-[#10B981]/10 text-[#10B981] border-[#2D3149]',
  },
];

export const LeaderboardPage = () => {
  const [tab, setTab] = useState<'global' | 'friends'>('global');
  const [period, setPeriod] = useState<'week' | 'month' | 'all'>('all');
  const [search, setSearch] = useState('');

  // Filter list
  const filteredLeaderboard = useMemo(() => {
    let list = [...mockLeaderboard];
    
    // Friends list filter (mocked - just excludes top 2)
    if (tab === 'friends') {
      list = list.filter(entry => entry.rank > 2 || entry.isCurrentUser);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        entry => 
          entry.name.toLowerCase().includes(q) || 
          entry.username.toLowerCase().includes(q)
      );
    }

    return list;
  }, [tab, search]);

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Crown className="h-4 w-4 text-[#FFD700] fill-[#FFD700]/20" />;
    if (rank === 2) return <Award className="h-4 w-4 text-[#C0C0C0]" />;
    if (rank === 3) return <Award className="h-4 w-4 text-[#CD7F32]" />;
    return null;
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-56px)] bg-[#0F1117] text-[#e4e1ed] font-inter select-none">
      {/* Top Header */}
      <header className="h-14 bg-[#151824] border-b border-[#2D3149] flex justify-between items-center px-6 sticky top-0 z-40 select-none">
        <h1 className="text-sm font-bold text-white tracking-tight">Leaderboard</h1>
        <div className="flex items-center gap-3">
          <button className="p-1.5 rounded hover:bg-[#22263A] text-[#908fa0] hover:text-white transition-colors">
            <Bell className="h-4.5 w-4.5" />
          </button>
          <button className="p-1.5 rounded hover:bg-[#22263A] text-[#908fa0] hover:text-white transition-colors">
            <HelpCircle className="h-4.5 w-4.5" />
          </button>
        </div>
      </header>

      {/* Main Column */}
      <div className="flex-grow p-6 space-y-6 max-w-[1140px] mx-auto w-full">
        
        {/* Controls & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex p-0.5 bg-[#151824] rounded-lg border border-[#2D3149] w-full sm:w-auto">
            <button 
              onClick={() => setTab('global')}
              className={`flex-1 sm:flex-initial px-4 py-1.5 rounded text-xs font-semibold tracking-wide transition-all ${
                tab === 'global' 
                  ? 'bg-[#22263A] text-white' 
                  : 'text-[#908fa0] hover:text-white'
              }`}
            >
              Global
            </button>
            <button 
              onClick={() => setTab('friends')}
              className={`flex-1 sm:flex-initial px-4 py-1.5 rounded text-xs font-semibold tracking-wide transition-all ${
                tab === 'friends' 
                  ? 'bg-[#22263A] text-white' 
                  : 'text-[#908fa0] hover:text-white'
              }`}
            >
              Friends
            </button>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:max-w-xs text-left">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#908fa0]/60" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by developer name..."
              className="pl-9 h-9 bg-[#151824] border-[#2D3149] focus:border-[#6366F1] placeholder:text-[#908fa0]/30 text-xs"
            />
          </div>

          {/* Period selector tabs */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-[10px] font-mono font-bold tracking-wider text-[#908fa0] uppercase mr-1">Period:</span>
            {(['week', 'month', 'all'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 border rounded-full text-[10px] font-mono font-bold uppercase tracking-wider transition-all ${
                  period === p
                    ? 'bg-[#6366F1]/10 border-[#6366F1]/40 text-[#6366F1]'
                    : 'bg-[#151824] border-[#2D3149] text-[#908fa0] hover:text-white hover:border-[#908fa0]/30'
                }`}
              >
                {p === 'all' ? 'All Time' : p === 'month' ? 'This Month' : 'This Week'}
              </button>
            ))}
          </div>
        </div>

        {/* Leaderboard Table Container */}
        <div className="bg-[#151824] border border-[#2D3149] rounded-lg overflow-hidden shadow-lg">
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead>
                <tr className="bg-[#1C2030]/30 border-b border-[#2D3149]/50 text-[#908fa0] text-[10px] font-mono font-bold uppercase tracking-wider">
                  <th className="px-6 py-4 text-center w-20">Rank</th>
                  <th className="px-6 py-4">Developer</th>
                  <th className="px-6 py-4 text-center">Problems Solved</th>
                  <th className="px-6 py-4 text-center">Avg Runtime</th>
                  <th className="px-6 py-4 text-center">Sessions Won</th>
                  <th className="px-6 py-4 text-center">Streak</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2D3149]/30 text-xs">
                {filteredLeaderboard.map((entry) => (
                  <tr 
                    key={entry.username}
                    className={`transition-colors border-l-4 ${
                      entry.isCurrentUser 
                        ? 'bg-[#6366F1]/5 border-l-[#6366F1] font-semibold' 
                        : 'hover:bg-[#1A1D27]/30 border-l-transparent'
                    }`}
                  >
                    <td className="px-6 py-4 align-middle">
                      <div className="flex items-center justify-center gap-1.5">
                        <span className={`font-bold font-mono text-sm ${
                          entry.rank === 1 ? 'text-[#FFD700]' :
                          entry.rank === 2 ? 'text-[#C0C0C0]' :
                          entry.rank === 3 ? 'text-[#CD7F32]' : 'text-[#908fa0]'
                        }`}>
                          {entry.rank}
                        </span>
                        {getRankBadge(entry.rank)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {/* Custom Avatar */}
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center border font-bold text-xs uppercase tracking-wider select-none ${entry.avatarColor}`}>
                          {entry.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm ${entry.isCurrentUser ? 'text-[#6366F1]' : 'text-white'}`}>
                              {entry.name}
                            </span>
                            {entry.isCurrentUser && (
                              <span className="text-[8px] bg-[#6366F1] text-white px-1.5 py-0.5 rounded font-bold uppercase font-mono tracking-wide">YOU</span>
                            )}
                          </div>
                          <span className="text-[#908fa0] text-[10px] font-mono">{entry.username}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center font-mono font-semibold text-[#6366F1]">
                      {entry.problemsSolved.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center font-mono text-[#908fa0]">
                      {entry.avgRuntime}
                    </td>
                    <td className="px-6 py-4 text-center font-mono text-[#7bd0ff] font-semibold">
                      {entry.sessionsWon}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {entry.streak ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#d97721]/10 border border-[#d97721]/20 text-[#d97721] rounded-full text-[10px] font-mono font-bold uppercase tracking-wider mx-auto">
                          <Flame className="h-3.5 w-3.5 fill-[#d97721]" />
                          <span>{entry.streak}d</span>
                        </span>
                      ) : (
                        <span className="text-[#908fa0]/60 italic font-mono text-[10px]">No streak</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bento Stats Summary Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#151824] border border-[#2D3149] p-5 rounded-lg text-left shadow-lg">
            <p className="text-[9px] font-mono font-bold text-[#908fa0] uppercase tracking-wider mb-2">
              Your Global Percentile
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-[#6366F1]">Top 4%</span>
              <span className="text-[#10B981] text-[10px] font-bold font-mono flex items-center gap-0.5">
                <ArrowUp className="h-3 w-3" />
                <span>0.5%</span>
              </span>
            </div>
          </div>
          <div className="bg-[#151824] border border-[#2D3149] p-5 rounded-lg text-left shadow-lg">
            <p className="text-[9px] font-mono font-bold text-[#908fa0] uppercase tracking-wider mb-2">
              Next Rank Milestone
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-[#7bd0ff]">74 pts</span>
              <span className="text-[#908fa0] text-[10px] font-mono">to Rank 11</span>
            </div>
          </div>
          <div className="bg-[#151824] border border-[#2D3149] p-5 rounded-lg text-left shadow-lg flex items-center justify-between">
            <div>
              <p className="text-[9px] font-mono font-bold text-[#908fa0] uppercase tracking-wider mb-2">
                Active Leagues
              </p>
              <span className="text-xl font-bold text-white">Diamond</span>
            </div>
            <Award className="h-8 w-8 text-[#6366F1]/40" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default LeaderboardPage;
