import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  LayoutDashboard, 
  Code2, 
  Trophy, 
  History, 
  Settings, 
  ShieldAlert, 
  LogOut,
  Terminal
} from 'lucide-react';
import clsx from 'clsx';

export const Sidebar = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/problems', label: 'Problems', icon: Code2 },
    { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { to: '/history', label: 'History', icon: History },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#1A1D27] border-r border-[#2D3149] flex flex-col h-screen select-none">
      {/* Brand Logo */}
      <div className="h-16 flex items-center px-6 border-b border-[#2D3149]">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-[6px] bg-[#6366F1] flex items-center justify-center text-white">
            <Terminal className="h-5 w-5" />
          </div>
          <span className="font-mono text-sm font-semibold tracking-wider text-white uppercase">
            COMPILE.IO
          </span>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-[6px] text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-[#2D3149] text-white"
                    : "text-[#908fa0] hover:bg-[#22263A] hover:text-[#e4e1ed]"
                )
              }
            >
              <Icon className="h-4.5 w-4.5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}

        {/* Admin Navigation */}
        {user?.role === 'admin' && (
          <div className="pt-4 mt-4 border-t border-[#2D3149]">
            <div className="px-3 mb-2 text-[10px] font-mono font-semibold tracking-wider text-[#908fa0] uppercase">
              Admin Portal
            </div>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-[6px] text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20"
                    : "text-[#908fa0] hover:bg-[#22263A] hover:text-[#e4e1ed]"
                )
              }
            >
              <ShieldAlert className="h-4.5 w-4.5" />
              <span>Dashboard</span>
            </NavLink>
          </div>
        )}
      </nav>

      {/* User Session Footer */}
      {user && (
        <div className="p-4 border-t border-[#2D3149] bg-[#1F2231] flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-[#6366F1]/15 text-[#6366F1] flex items-center justify-center font-mono font-semibold text-sm border border-[#6366F1]/20">
              {user.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-white truncate">{user.name}</span>
              <span className="text-[10px] text-[#908fa0] font-mono capitalize truncate">{user.role}</span>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-[#2D3149] hover:bg-[#EF4444]/15 hover:text-[#EF4444] rounded-[6px] text-xs font-medium text-[#e4e1ed] transition-colors duration-200 border border-transparent hover:border-[#EF4444]/20"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Logout Session</span>
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
