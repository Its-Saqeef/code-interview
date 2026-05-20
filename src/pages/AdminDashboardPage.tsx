import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Zap, 
  MessageSquare, 
  TrendingUp, 
  UserPlus, 
  CheckCircle2, 
  Bell, 
  HelpCircle,
  Plus,
  Sliders,
  Database,
  AlertTriangle,
  Play
} from 'lucide-react';
import { Button } from '../components/ui/Button';

interface ActivityItem {
  id: string;
  type: 'user' | 'system' | 'session' | 'db';
  title: string;
  desc: string;
  time: string;
  status: 'info' | 'warning' | 'success';
}

export const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [activities] = useState<ActivityItem[]>([
    {
      id: '1',
      type: 'user',
      title: 'New candidate registered',
      desc: 'Alex Rivera joined the platform via Referral.',
      time: '2 minutes ago',
      status: 'info'
    },
    {
      id: '2',
      type: 'system',
      title: 'System Alert',
      desc: 'High latency detected in Europe-West region (API Node 04).',
      time: '15 minutes ago',
      status: 'warning'
    },
    {
      id: '3',
      type: 'session',
      title: 'Session Completed',
      desc: 'Google Interview #4492 finished. Feedback submitted by Sarah Kong.',
      time: '42 minutes ago',
      status: 'success'
    },
    {
      id: '4',
      type: 'db',
      title: 'Database Backup',
      desc: 'Nightly snapshot successfully stored in S3 bucket.',
      time: '2 hours ago',
      status: 'success'
    }
  ]);

  return (
    <div className="flex flex-col min-h-[calc(100vh-56px)] bg-[#0F1117] text-[#e4e1ed] font-inter select-none">
      {/* Top Header */}
      <header className="h-14 bg-[#151824] border-b border-[#2D3149] flex justify-between items-center px-6 sticky top-0 z-40 select-none flex-shrink-0">
        <h1 className="text-sm font-bold text-white tracking-tight">Admin Dashboard</h1>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => navigate('/admin/problems/new')}
            className="h-8 px-3 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#6366F1] text-white hover:brightness-110 flex items-center gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Problem</span>
          </Button>
          <div className="h-4 w-px bg-[#2D3149] mx-1" />
          <button className="p-1.5 rounded hover:bg-[#22263A] text-[#908fa0] hover:text-white transition-colors">
            <Bell className="h-4.5 w-4.5" />
          </button>
          <button className="p-1.5 rounded hover:bg-[#22263A] text-[#908fa0] hover:text-white transition-colors">
            <HelpCircle className="h-4.5 w-4.5" />
          </button>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="flex-grow p-6 space-y-6 max-w-[1140px] mx-auto w-full text-left">
        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Users */}
          <div className="bg-[#151824] border border-[#2D3149] p-5 rounded-lg hover:border-[#6366F1]/30 transition-all flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-mono font-bold text-[#908fa0] uppercase tracking-wider">Total Users</span>
              <Users className="h-4.5 w-4.5 text-[#6366F1]" />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-black text-white">12,482</span>
              <span className="text-green-400 text-[10px] font-mono font-bold flex items-center gap-0.5">
                <TrendingUp className="h-3 w-3" /> +12%
              </span>
            </div>
            <p className="text-[10px] text-[#908fa0] mt-2 font-mono">Growth from previous month</p>
          </div>

          {/* Active Today */}
          <div className="bg-[#151824] border border-[#2D3149] p-5 rounded-lg hover:border-[#6366F1]/30 transition-all flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-mono font-bold text-[#908fa0] uppercase tracking-wider">Active Today</span>
              <Zap className="h-4.5 w-4.5 text-[#7bd0ff]" />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-black text-white">1,240</span>
              <span className="text-green-400 text-[10px] font-mono font-bold flex items-center gap-0.5">
                <TrendingUp className="h-3 w-3" /> +5.4%
              </span>
            </div>
            <p className="text-[10px] text-[#908fa0] mt-2 font-mono">Concurrent peak: 421 sessions</p>
          </div>

          {/* Total Sessions */}
          <div className="bg-[#151824] border border-[#2D3149] p-5 rounded-lg hover:border-[#6366F1]/30 transition-all flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-mono font-bold text-[#908fa0] uppercase tracking-wider">Total Sessions</span>
              <MessageSquare className="h-4.5 w-4.5 text-[#d97721]" />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-black text-white">45,921</span>
              <span className="text-[#908fa0] text-[10px] font-mono">892 ongoing</span>
            </div>
            <p className="text-[10px] text-[#908fa0] mt-2 font-mono">Avg. duration: 45 min</p>
          </div>
        </div>

        {/* Charts & Language Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Active Users Chart */}
          <div className="bg-[#151824] border border-[#2D3149] p-5 rounded-lg flex flex-col h-[340px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Daily Active Users</h3>
              <div className="flex gap-1.5">
                <button className="px-2.5 py-1 bg-[#2D3149] text-white text-[9px] font-mono font-bold rounded">7D</button>
                <button className="px-2.5 py-1 text-[#908fa0] hover:bg-[#2D3149]/40 text-[9px] font-mono font-bold rounded">30D</button>
              </div>
            </div>

            {/* SVG Graph */}
            <div className="flex-grow relative mt-2 border-l border-b border-[#2D3149]/80 ml-6 mb-6">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200">
                <path 
                  d="M0,180 L40,150 L80,160 L120,110 L160,130 L200,90 L240,100 L280,60 L320,70 L360,40 L400,20" 
                  fill="none" 
                  stroke="#6366F1" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2.5"
                />
                <path 
                  d="M0,180 L40,150 L80,160 L120,110 L160,130 L200,90 L240,100 L280,60 L320,70 L360,40 L400,20 L400,200 L0,200 Z" 
                  fill="url(#lineGradient)"
                />
                <defs>
                  <linearGradient id="lineGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Y-axis Labels */}
              <div className="absolute -left-7 top-0 h-full flex flex-col justify-between text-[8px] font-mono text-[#908fa0]/60">
                <span>2k</span><span>1.5k</span><span>1k</span><span>500</span><span>0</span>
              </div>
              {/* X-axis Labels */}
              <div className="absolute -bottom-5 left-0 w-full flex justify-between text-[8px] font-mono text-[#908fa0]/60">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
          </div>

          {/* Submissions by Language */}
          <div className="bg-[#151824] border border-[#2D3149] p-5 rounded-lg flex flex-col justify-between h-[340px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Submissions by Language</h3>
              <Sliders className="h-4 w-4 text-[#908fa0] cursor-pointer hover:text-white transition-colors" />
            </div>

            <div className="space-y-4 flex-grow flex flex-col justify-center">
              {[
                { lang: 'Python', pct: 42, color: 'bg-[#7bd0ff]' },
                { lang: 'JavaScript', pct: 28, color: 'bg-[#6366F1]' },
                { lang: 'Java', pct: 15, color: 'bg-[#d97721]' },
                { lang: 'C++', pct: 10, color: 'bg-[#EF4444]' },
                { lang: 'Others', pct: 5, color: 'bg-[#908fa0]' },
              ].map((item) => (
                <div key={item.lang} className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-[#908fa0] font-bold uppercase">
                    <span>{item.lang}</span>
                    <span>{item.pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#1A1D27] rounded-full overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Feed Section */}
        <section className="bg-[#151824] border border-[#2D3149] rounded-lg overflow-hidden">
          <div className="p-5 border-b border-[#2D3149] flex justify-between items-center">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Recent Activity Feed</h3>
            <button className="text-[#6366F1] font-mono text-[10px] font-bold uppercase hover:underline">
              View All
            </button>
          </div>

          <div className="divide-y divide-[#2D3149]/40">
            {activities.map((act) => (
              <div 
                key={act.id} 
                className="p-5 flex gap-4 items-start hover:bg-[#1A1D27]/40 transition-colors"
              >
                <div className="h-9 w-9 rounded bg-[#1A1D27] border border-[#2D3149] flex items-center justify-center flex-shrink-0">
                  {act.type === 'user' && <UserPlus className="h-4.5 w-4.5 text-[#7bd0ff]" />}
                  {act.type === 'system' && <AlertTriangle className="h-4.5 w-4.5 text-[#EF4444]" />}
                  {act.type === 'session' && <CheckCircle2 className="h-4.5 w-4.5 text-[#10B981]" />}
                  {act.type === 'db' && <Database className="h-4.5 w-4.5 text-[#d97721]" />}
                </div>

                <div className="flex-grow">
                  <p className="text-xs text-white">
                    <span className="font-bold">{act.title}:</span> {act.desc}
                  </p>
                  <span className="text-[9px] font-mono text-[#908fa0] mt-1 inline-block">
                    {act.time}
                  </span>
                </div>

                <button className="p-1 rounded hover:bg-[#2D3149]/60 text-[#908fa0] hover:text-white transition-colors">
                  <Play className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating System Status Widget */}
      <div className="fixed bottom-6 right-6 bg-[#1A1D27] border border-[#2D3149] px-4 py-2 rounded-full shadow-2xl flex items-center gap-3 z-50">
        <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
        <span className="text-[10px] font-mono font-bold text-white uppercase">System Operational</span>
        <div className="h-3 w-px bg-[#2D3149]" />
        <span className="text-[9px] font-mono text-[#908fa0]">API v2.4.1</span>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
