import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { SessionTable } from '../components/sessions/SessionTable';
import { CreateRoomModal } from '../components/dashboard/CreateRoomModal';
import { 
  Video, 
  Terminal, 
  Timer, 
  Trophy, 
  Plus, 
  TrendingUp, 
  CheckCircle2, 
  Zap, 
  Calendar,
  Users,
  Compass
} from 'lucide-react';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [roomId, setRoomId] = useState('');

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId.trim()) {
      navigate(`/room/${roomId.trim()}`);
    }
  };

  return (
    <div className="space-y-6 text-left animate-fade-in select-none">
      {/* Welcome Banner / Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Welcome back, Alex.</h2>
          <p className="text-xs text-[#908fa0] mt-0.5">You have 2 interviews scheduled for today.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button
            variant="secondary"
            onClick={() => navigate('/problems')}
            className="flex-grow md:flex-grow-0 h-10 px-4 text-xs border-[#2D3149] hover:bg-[#22263A] gap-2"
          >
            <Compass className="h-4 w-4" />
            <span>Practice Alone</span>
          </Button>
          <Button
            onClick={() => setIsSetupOpen(true)}
            className="flex-grow md:flex-grow-0 h-10 px-4 text-xs gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>Start New Interview</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Sessions */}
        <Card className="bg-[#1A1D27] border-[#2D3149] p-5 flex flex-col justify-between shadow-lg relative group overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono font-semibold tracking-wider text-[#908fa0] uppercase">Total Sessions</span>
            <div className="w-8 h-8 rounded-[4px] bg-[#6366F1]/10 flex items-center justify-center text-[#6366F1]">
              <Video className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-white tracking-tight">128</div>
            <div className="text-[10px] font-semibold text-[#10B981] mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>+12% from last month</span>
            </div>
          </div>
        </Card>

        {/* Problems Solved */}
        <Card className="bg-[#1A1D27] border-[#2D3149] p-5 flex flex-col justify-between shadow-lg relative group overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono font-semibold tracking-wider text-[#908fa0] uppercase">Problems Solved</span>
            <div className="w-8 h-8 rounded-[4px] bg-[#00a6e0]/10 flex items-center justify-center text-[#00a6e0]">
              <Terminal className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-white tracking-tight">432</div>
            <div className="text-[10px] font-semibold text-[#00a6e0] mt-1 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              <span>85th percentile</span>
            </div>
          </div>
        </Card>

        {/* Avg Runtime */}
        <Card className="bg-[#1A1D27] border-[#2D3149] p-5 flex flex-col justify-between shadow-lg relative group overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono font-semibold tracking-wider text-[#908fa0] uppercase">Avg Runtime</span>
            <div className="w-8 h-8 rounded-[4px] bg-[#d97721]/10 flex items-center justify-center text-[#d97721]">
              <Timer className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-white tracking-tight">24ms</div>
            <div className="text-[10px] font-semibold text-[#d97721] mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 rotate-180" />
              <span>-2ms improvement</span>
            </div>
          </div>
        </Card>

        {/* Win Rate */}
        <Card className="bg-[#1A1D27] border-[#2D3149] p-5 flex flex-col justify-between shadow-lg relative group overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono font-semibold tracking-wider text-[#908fa0] uppercase">Win Rate</span>
            <div className="w-8 h-8 rounded-[4px] bg-[#10B981]/10 flex items-center justify-center text-[#10B981]">
              <Trophy className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-white tracking-tight">78.4%</div>
            <div className="text-[10px] font-semibold text-[#10B981] mt-1 flex items-center gap-1">
              <Zap className="h-3 w-3" />
              <span>Expert Level</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Grid area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Recent Sessions Table */}
        <div className="lg:col-span-8">
          <SessionTable />
        </div>

        {/* Right Column: Widgets */}
        <div className="lg:col-span-4 space-y-6">
          {/* Upcoming Interviews widget */}
          <Card className="bg-[#1A1D27] border-[#2D3149] p-5 rounded-lg shadow-lg">
            <h4 className="text-xs font-mono font-bold tracking-wider text-white uppercase flex items-center gap-2 border-b border-[#2D3149]/40 pb-3 mb-4">
              <Calendar className="h-4 w-4 text-[#6366F1]" />
              <span>Upcoming Interviews</span>
            </h4>
            <div className="space-y-4">
              {/* Event 1 */}
              <div className="flex gap-4 border-l-2 border-[#6366F1] pl-3 py-1 text-left">
                <div className="flex flex-col items-center justify-center bg-[#22263A] rounded-[4px] border border-[#2D3149] p-2 min-w-[52px] select-none">
                  <span className="font-mono text-xs font-bold text-[#6366F1]">28</span>
                  <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-[#908fa0]">Oct</span>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-xs font-bold text-white leading-tight">Google L5 Mock</p>
                  <p className="text-[10px] text-[#908fa0]">with Sarah Jenkins • 2:00 PM</p>
                  <div className="pt-1">
                    <button 
                      onClick={() => setIsSetupOpen(true)}
                      className="text-[9px] font-mono font-semibold tracking-wider text-[#6366F1] border border-[#6366F1]/30 px-2 py-0.5 rounded hover:bg-[#6366F1]/10 transition-colors uppercase"
                    >
                      Prepare
                    </button>
                  </div>
                </div>
              </div>

              {/* Event 2 */}
              <div className="flex gap-4 border-l-2 border-[#2D3149] pl-3 py-1 text-left">
                <div className="flex flex-col items-center justify-center bg-[#22263A] rounded-[4px] border border-[#2D3149] p-2 min-w-[52px] select-none">
                  <span className="font-mono text-xs font-bold text-[#908fa0]">31</span>
                  <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-[#908fa0]">Oct</span>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-xs font-bold text-white leading-tight">Meta Technical Mock</p>
                  <p className="text-[10px] text-[#908fa0]">with David Wang • 10:30 AM</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions / Join Room box */}
          <Card className="bg-[#6366F1]/5 border-[#6366F1]/20 p-5 rounded-lg shadow-lg relative overflow-hidden text-left">
            <div className="relative z-10 space-y-3">
              <h4 className="text-sm font-bold text-[#6366F1] tracking-tight">Join Room</h4>
              <p className="text-xs text-[#908fa0] leading-relaxed">
                Enter a 6-digit code to join an active session instantly.
              </p>
              <form onSubmit={handleJoin} className="flex gap-2">
                <Input
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="e.g. v2-x9k2"
                  className="bg-[#1A1D27] border-[#2D3149] focus:border-[#6366F1] h-10 text-xs font-mono uppercase placeholder:text-[#908fa0]/20"
                />
                <Button type="submit" className="h-10 px-4 text-xs font-semibold uppercase tracking-wider">
                  Join
                </Button>
              </form>
            </div>
            <div className="absolute -right-6 -bottom-6 opacity-[0.03] pointer-events-none select-none">
              <Users className="h-28 w-28 text-white" />
            </div>
          </Card>

          {/* Leaderboard Teaser */}
          <Card className="bg-[#1A1D27] border-[#2D3149] p-5 rounded-lg shadow-lg">
            <h4 className="text-xs font-mono font-bold tracking-wider text-white uppercase flex items-center gap-2 border-b border-[#2D3149]/40 pb-3 mb-4">
              <Trophy className="h-4 w-4 text-[#d97721]" />
              <span>Leaderboard</span>
            </h4>
            <div className="space-y-3 text-left">
              {/* Rank 1 */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#908fa0] w-4 text-center">1</span>
                <img 
                  alt="Rank 1" 
                  className="w-6 h-6 rounded-full border border-[#2D3149]" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBxX4Pi21MLp_gY0ytSz9LKjZx97CsIJ8AQ2_m_KNtabIkzZaBhFeV0sU-KEktZo24-EDcgEEbGvVRE0F2ziavSiV9uI8rBWD9zU8N8ryKrrLnTYAWInlDkjTq2xm--aIkJCJQUOnuq-NJX0ooEuJ82M8is-r9FUPalCKk-HB-mQir1lzas7MXZUpXHOxvcSp-W-T57gevoNjTakQHH6ZQrZNVeqC4iwAX6_BBb9wfty4_75SSp5EcCDR2rfBxFiuVuusoIS4kTMY"
                />
                <span className="flex-1 text-xs text-[#e4e1ed] font-medium truncate">binary_wizard</span>
                <span className="font-mono text-xs text-[#6366F1] font-semibold">2,840 pts</span>
              </div>

              {/* Rank 2 */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#908fa0] w-4 text-center">2</span>
                <img 
                  alt="Rank 2" 
                  className="w-6 h-6 rounded-full border border-[#2D3149]" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwQXQUFFKgMTgHroiKEypoFAEbuiMf2PhbM0k3pEmd3S57zjkrTmX5fx58CH5a_iDhED0Y8NEXtR4iKghK8re_I3ElcnXdKwwG8wQ3AaFfw9_wc-FyogNSc9hsHLL19j2fbkGZoM5YJsO8mdZrkljcg47ZaHz-sZXDJCwzKBdz205bPyxV8kj_7QorvH6JgjQfXn7DQbtue09_jC16dYn_hLEIOfXd-W3Pb9gLAz67cdTbgVtTt1KnBAJGLSKaTxTw3nYDjeLUlcg"
                />
                <span className="flex-1 text-xs text-[#e4e1ed] font-medium truncate">logic_queen</span>
                <span className="font-mono text-xs text-[#6366F1] font-semibold">2,715 pts</span>
              </div>

              {/* Your Rank */}
              <div className="bg-[#22263A]/80 p-2.5 rounded-[4px] flex items-center gap-3 border border-[#6366F1]/30">
                <span className="font-mono text-xs text-[#6366F1] w-4 text-center font-bold">42</span>
                <img 
                  alt="You" 
                  className="w-6 h-6 rounded-full border border-[#6366F1]" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvkac5ewpphN8YT6t_8ub63r8TFtMyxBG8uy5NpHp0PtQI1SNpR6K6-wzp3MezTJBSl9jy68rAwc-_CwH0Q5cLjqDKpwE6F4GfqKKigfNcA0QBPAUiZpxzrDH6uLp_eSNqB9NoP377XWbc0epJIs8ZIiN1wEi3Z1Eee5-q5sLIWTlOeebo9Wfxw1hJZrOxVuWa6is38at5saKNRSxmg4GTo7ayAbDfdWN8PU-Eq7IfcpJCqTSYnxNi6FcKLGpr5abljGJq4Ax6iVs"
                />
                <span className="flex-1 text-xs text-white font-bold truncate">You (Alex)</span>
                <span className="font-mono text-xs text-[#6366F1] font-bold">1,420 pts</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Setup Modal */}
      <CreateRoomModal isOpen={isSetupOpen} onClose={() => setIsSetupOpen(false)} />
    </div>
  );
};

export default DashboardPage;
