import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Bell, Search, Settings, User, LogOut, ChevronRight } from 'lucide-react';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '../ui/Dropdown';
import { NotificationsPanel } from './NotificationsPanel';

export const Topbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Create breadcrumbs based on active path
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <header className="h-16 bg-[#1A1D27] border-b border-[#2D3149] flex items-center justify-between px-6 select-none z-10">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        <Link to="/" className="text-[#908fa0] hover:text-white transition-colors">
          Home
        </Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const formattedValue = value.charAt(0).toUpperCase() + value.slice(1);

          return (
            <div key={to} className="flex items-center gap-2">
              <ChevronRight className="h-3 w-3 text-[#2D3149]" />
              {isLast ? (
                <span className="font-medium text-white">{formattedValue}</span>
              ) : (
                <Link to={to} className="text-[#908fa0] hover:text-white transition-colors">
                  {formattedValue}
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative w-64 hidden sm:block">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#908fa0]" />
          <Input 
            placeholder="Search problems..." 
            className="pl-9 h-9 bg-[#0F1117] border-[#2D3149] focus:border-[#6366F1]"
          />
        </div>

        {/* Notifications Trigger */}
        <button 
          onClick={() => setIsNotificationsOpen(true)}
          className="relative p-2 rounded-[6px] hover:bg-[#22263A] text-[#908fa0] hover:text-white transition-colors"
        >
          <Bell className="h-5 w-5" />
          <Badge 
            variant="error" 
            label="" 
            className="absolute top-1.5 right-1.5 h-2 w-2 p-0 rounded-full bg-[#EF4444] border border-[#1A1D27]" 
          />
        </button>

        {/* Custom Notifications Drawer */}
        <NotificationsPanel 
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
        />

        {/* User Dropdown */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 p-1.5 rounded-[6px] hover:bg-[#22263A] transition-colors focus:outline-none">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="h-7 w-7 rounded-full object-cover border border-[#2D3149]" />
                ) : (
                  <div className="h-7 w-7 rounded-full bg-[#6366F1] text-white flex items-center justify-center font-mono font-bold text-xs">
                    {user.name.substring(0, 1).toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-medium text-[#e4e1ed] hidden md:block">{user.name}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem className="gap-2">
                <User className="h-4 w-4 opacity-70" />
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Settings className="h-4 w-4 opacity-70" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={logout}
                className="gap-2 text-[#EF4444] focus:bg-[#EF4444]/10 focus:text-[#EF4444]"
              >
                <LogOut className="h-4 w-4 opacity-70" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};
export default Topbar;
