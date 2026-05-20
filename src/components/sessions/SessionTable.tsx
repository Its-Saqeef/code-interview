import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

interface Session {
  id: string;
  date: string;
  problem: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  role: 'Candidate' | 'Interviewer';
  result: 'Accepted' | 'Completed' | 'Failed';
  duration: string;
}

const mockSessions: Session[] = [
  {
    id: '1',
    date: 'Oct 24, 2023',
    problem: 'LRU Cache Design',
    difficulty: 'Hard',
    category: 'System Design',
    role: 'Candidate',
    result: 'Accepted',
    duration: '42:15',
  },
  {
    id: '2',
    date: 'Oct 22, 2023',
    problem: 'Merge K Sorted Lists',
    difficulty: 'Medium',
    category: 'Algorithms',
    role: 'Interviewer',
    result: 'Completed',
    duration: '60:00',
  },
  {
    id: '3',
    date: 'Oct 19, 2023',
    problem: 'Binary Tree Max Path',
    difficulty: 'Hard',
    category: 'Data Structures',
    role: 'Candidate',
    result: 'Failed',
    duration: '38:02',
  },
];

export const SessionTable = () => {
  return (
    <Card className="bg-[#1A1D27] border-[#2D3149] rounded-lg overflow-hidden shadow-xl">
      <div className="p-4 border-b border-[#2D3149] flex justify-between items-center bg-[#1E2235]/40">
        <h4 className="text-sm font-bold text-white tracking-tight">Recent Sessions</h4>
        <button className="text-xs font-mono font-semibold tracking-wider text-[#6366F1] hover:underline uppercase">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#151824] text-[#908fa0] text-[10px] font-mono tracking-wider border-b border-[#2D3149] uppercase">
              <th className="px-4 py-3 font-semibold select-none">Date</th>
              <th className="px-4 py-3 font-semibold select-none">Problem</th>
              <th className="px-4 py-3 font-semibold select-none">Role</th>
              <th className="px-4 py-3 font-semibold select-none">Result</th>
              <th className="px-4 py-3 font-semibold select-none">Duration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2D3149]/40 text-xs">
            {mockSessions.map((session) => (
              <tr key={session.id} className="hover:bg-[#22263A]/40 transition-colors">
                <td className="px-4 py-4 font-mono text-[#e4e1ed] whitespace-nowrap">
                  {session.date}
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="text-[#e4e1ed] font-medium leading-relaxed">
                      {session.problem}
                    </span>
                    <span className="text-[10px] font-mono text-[#908fa0] mt-0.5">
                      {session.difficulty} • {session.category}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-[4px] text-[10px] font-mono font-semibold tracking-wider uppercase ${
                    session.role === 'Candidate' 
                      ? 'bg-[#00a6e0]/10 text-[#00a6e0] border border-[#00a6e0]/20' 
                      : 'bg-[#d97721]/10 text-[#d97721] border border-[#d97721]/20'
                  }`}>
                    {session.role}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <Badge 
                    variant={
                      session.result === 'Accepted' 
                        ? 'success' 
                        : session.result === 'Completed' 
                        ? 'neutral' 
                        : 'error'
                    }
                    label={session.result}
                  />
                </td>
                <td className="px-4 py-4 font-mono text-[#908fa0] whitespace-nowrap">
                  {session.duration}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default SessionTable;
