import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  HelpCircle, 
  Download, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  History
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { DifficultyBadge } from '../components/problems/DifficultyBadge';

interface Session {
  id: string;
  date: string;
  time: string;
  problemTitle: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  language: string;
  role: 'Candidate' | 'Interviewer';
  status: 'Accepted' | 'Wrong Answer' | 'TLE' | 'Runtime Error';
  runtime: string;
  memory: string;
}

const mockSessions: Session[] = [
  {
    id: 's1',
    date: 'Oct 24, 2023',
    time: '14:20 PM',
    problemTitle: 'Binary Tree Maximum Path Sum',
    difficulty: 'Hard',
    language: 'Python 3.11',
    role: 'Candidate',
    status: 'Accepted',
    runtime: '12 ms',
    memory: '14.2 MB',
  },
  {
    id: 's2',
    date: 'Oct 23, 2023',
    time: '09:15 AM',
    problemTitle: 'LRU Cache',
    difficulty: 'Medium',
    language: 'TypeScript',
    role: 'Interviewer',
    status: 'Wrong Answer',
    runtime: '--',
    memory: '--',
  },
  {
    id: 's3',
    date: 'Oct 21, 2023',
    time: '18:45 PM',
    problemTitle: 'Longest Valid Parentheses',
    difficulty: 'Hard',
    language: 'C++ 20',
    role: 'Candidate',
    status: 'TLE',
    runtime: '> 1000 ms',
    memory: '2.4 MB',
  },
  {
    id: 's4',
    date: 'Oct 20, 2023',
    time: '11:00 AM',
    problemTitle: 'Valid Anagram',
    difficulty: 'Easy',
    language: 'Go 1.21',
    role: 'Interviewer',
    status: 'Runtime Error',
    runtime: '--',
    memory: '--',
  },
];

export const SessionHistoryPage = () => {
  const navigate = useNavigate();
  const [dateFilter, setDateFilter] = useState('All Dates');
  const [langFilter, setLangFilter] = useState('All Languages');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [roleFilter, setRoleFilter] = useState('All Roles');

  // Filter sessions
  const filteredSessions = useMemo(() => {
    return mockSessions.filter((session) => {
      // Date filter mock match
      if (dateFilter === 'Last 7 Days') {
        const isRecent = session.date.includes('24') || session.date.includes('23');
        if (!isRecent) return false;
      }
      // Lang filter match
      if (langFilter !== 'All Languages') {
        if (!session.language.toLowerCase().includes(langFilter.toLowerCase())) {
          return false;
        }
      }
      // Status filter match
      if (statusFilter !== 'All Status') {
        if (session.status !== statusFilter) {
          return false;
        }
      }
      // Role filter match
      if (roleFilter !== 'All Roles') {
        if (session.role !== roleFilter) {
          return false;
        }
      }
      return true;
    });
  }, [dateFilter, langFilter, statusFilter, roleFilter]);

  const handleExportCSV = () => {
    alert('Exporting session history data to CSV format...');
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-56px)] bg-[#0F1117] text-[#e4e1ed] font-inter select-none">
      {/* Top Page Header */}
      <header className="h-14 bg-[#151824] border-b border-[#2D3149] flex justify-between items-center px-6 sticky top-0 z-40 select-none">
        <h1 className="text-sm font-bold text-white tracking-tight">My Sessions</h1>
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
      <div className="flex-grow p-6 space-y-6 max-w-[1440px] mx-auto w-full">
        {/* Statistics Panels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#151824] border border-[#2D3149] p-5 rounded-lg text-left shadow-lg">
            <p className="text-[9px] font-mono font-bold text-[#908fa0] uppercase tracking-wider mb-2">Total Sessions</p>
            <p className="text-xl font-bold text-white">128</p>
          </div>
          <div className="bg-[#151824] border border-[#2D3149] p-5 rounded-lg text-left shadow-lg">
            <p className="text-[9px] font-mono font-bold text-[#908fa0] uppercase tracking-wider mb-2">Success Rate</p>
            <p className="text-xl font-bold text-[#7bd0ff]">92.4%</p>
          </div>
          <div className="bg-[#151824] border border-[#2D3149] p-5 rounded-lg text-left shadow-lg">
            <p className="text-[9px] font-mono font-bold text-[#908fa0] uppercase tracking-wider mb-2">Avg. Runtime</p>
            <p className="text-xl font-bold text-white">42ms</p>
          </div>
          <div className="bg-[#151824] border border-[#2D3149] p-5 rounded-lg text-left shadow-lg">
            <p className="text-[9px] font-mono font-bold text-[#908fa0] uppercase tracking-wider mb-2">Preferred Role</p>
            <p className="text-xl font-bold text-[#6366F1]">Interviewer</p>
          </div>
        </div>

        {/* Filters and Actions toolbar */}
        <div className="bg-[#151824] border border-[#2D3149] p-4 rounded-t-lg flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Date filter dropdown */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-[#1A1D27] border border-[#2D3149] text-xs font-mono font-semibold text-[#e4e1ed] rounded-[4px] px-3 py-1.5 focus:border-[#6366F1] outline-none cursor-pointer"
            >
              <option>All Dates</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>

            {/* Language filter dropdown */}
            <select
              value={langFilter}
              onChange={(e) => setLangFilter(e.target.value)}
              className="bg-[#1A1D27] border border-[#2D3149] text-xs font-mono font-semibold text-[#e4e1ed] rounded-[4px] px-3 py-1.5 focus:border-[#6366F1] outline-none cursor-pointer"
            >
              <option>All Languages</option>
              <option value="python">Python</option>
              <option value="typescript">TypeScript</option>
              <option value="java">Java</option>
              <option value="c++">C++</option>
              <option value="go">Go</option>
            </select>

            {/* Status filter dropdown */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#1A1D27] border border-[#2D3149] text-xs font-mono font-semibold text-[#e4e1ed] rounded-[4px] px-3 py-1.5 focus:border-[#6366F1] outline-none cursor-pointer"
            >
              <option>All Status</option>
              <option>Accepted</option>
              <option>Wrong Answer</option>
              <option>TLE</option>
              <option>Runtime Error</option>
            </select>

            {/* Role filter dropdown */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-[#1A1D27] border border-[#2D3149] text-xs font-mono font-semibold text-[#e4e1ed] rounded-[4px] px-3 py-1.5 focus:border-[#6366F1] outline-none cursor-pointer"
            >
              <option>All Roles</option>
              <option>Interviewer</option>
              <option>Candidate</option>
            </select>
          </div>

          <Button
            onClick={handleExportCSV}
            variant="secondary"
            className="h-8.5 px-4 text-[10px] font-bold uppercase tracking-wider border-[#2D3149] hover:bg-[#22263A] gap-2"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export CSV</span>
          </Button>
        </div>

        {/* Sessions table */}
        <div className="overflow-x-auto bg-[#151824] border-x border-b border-[#2D3149] rounded-b-lg scrollbar-thin">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-[#2D3149]/40 text-[#908fa0] text-[10px] font-mono font-bold uppercase tracking-wider">
                <th className="px-5 py-4">Date & Time</th>
                <th className="px-5 py-4">Problem</th>
                <th className="px-5 py-4">Language</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Runtime</th>
                <th className="px-5 py-4 text-right">Memory</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2D3149]/30 text-xs">
              {filteredSessions.map((session) => (
                <tr 
                  key={session.id} 
                  className="hover:bg-[#1A1D27]/40 transition-colors group cursor-pointer"
                  onClick={() => navigate(`/recap/${session.id}`)}
                >
                  <td className="px-5 py-4">
                    <div className="flex flex-col">
                      <span className="text-white font-medium">{session.date}</span>
                      <span className="text-[#908fa0] text-[10px] font-mono mt-0.5">{session.time}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white group-hover:text-[#6366F1] transition-colors">
                        {session.problemTitle}
                      </span>
                      <DifficultyBadge difficulty={session.difficulty} />
                    </div>
                  </td>
                  <td className="px-5 py-4 font-mono text-[#7bd0ff] font-semibold">
                    {session.language}
                  </td>
                  <td className="px-5 py-4 text-[#908fa0] font-medium">
                    {session.role}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${
                      session.status === 'Accepted'
                        ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#10B981]'
                        : session.status === 'Wrong Answer'
                        ? 'bg-[#EF4444]/10 border-[#EF4444]/30 text-[#EF4444]'
                        : session.status === 'TLE'
                        ? 'bg-[#d97721]/10 border-[#d97721]/30 text-[#d97721]'
                        : 'bg-[#908fa0]/10 border-[#908fa0]/30 text-[#908fa0]'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        session.status === 'Accepted'
                          ? 'bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.8)]'
                          : session.status === 'Wrong Answer'
                          ? 'bg-[#EF4444]'
                          : session.status === 'TLE'
                          ? 'bg-[#d97721]'
                          : 'bg-[#908fa0]'
                      }`} />
                      {session.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right font-mono text-[#908fa0]">
                    {session.runtime}
                  </td>
                  <td className="px-5 py-4 text-right font-mono text-[#908fa0]">
                    {session.memory}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/recap/${session.id}`);
                      }}
                      className="text-[#908fa0] hover:text-white p-1 rounded hover:bg-[#22263A] transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredSessions.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-[#908fa0]">
                    No sessions match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer pagination */}
        <footer className="flex items-center justify-between select-none">
          <span className="text-xs font-mono font-medium text-[#908fa0]">
            Showing 1-{filteredSessions.length} of {filteredSessions.length} sessions
          </span>
          <div className="flex items-center gap-2">
            <button 
              disabled 
              className="p-1.5 border border-[#2D3149] rounded-[4px] text-[#908fa0]/40 bg-[#1A1D27] cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 text-xs font-mono font-bold bg-[#6366F1] text-white rounded-[4px]">
                1
              </button>
            </div>
            <button 
              disabled 
              className="p-1.5 border border-[#2D3149] rounded-[4px] text-[#908fa0]/40 bg-[#1A1D27] cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </footer>
      </div>

      {/* Background icon layout decoration */}
      <div className="fixed bottom-0 right-0 p-8 opacity-5 pointer-events-none select-none z-0">
        <History className="h-[200px] w-[200px] text-[#6366F1]" />
      </div>
    </div>
  );
};

export default SessionHistoryPage;
