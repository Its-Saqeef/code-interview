import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Settings2, 
  Bell
} from 'lucide-react';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NotificationItem {
  id: string;
  type: 'invite' | 'result' | 'system' | 'update';
  title: string;
  desc: string;
  time: string;
  isUnread: boolean;
  avatarInitials?: string;
  avatarColor?: string;
}

export const NotificationsPanel = ({ isOpen, onClose }: NotificationsPanelProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { 
      id: '1', 
      type: 'invite', 
      title: 'Interview invite', 
      desc: 'Jordan Smith has invited you to a technical session for the Senior Frontend role.', 
      time: '2m ago', 
      isUnread: true,
      avatarInitials: 'JS',
      avatarColor: 'bg-[#6366F1]'
    },
    { 
      id: '2', 
      type: 'result', 
      title: 'Result ready', 
      desc: 'Final evaluation for Sarah Connor (Fullstack Engineer) is now available for review.', 
      time: '45m ago', 
      isUnread: true,
      avatarInitials: 'SC',
      avatarColor: 'bg-[#10B981]'
    },
    { 
      id: '3', 
      type: 'invite', 
      title: 'Interview reschedule', 
      desc: 'Emily Chen requested to reschedule the session for Wednesday at 10:00 AM.', 
      time: '2h ago', 
      isUnread: false,
      avatarInitials: 'EC',
      avatarColor: 'bg-[#d97721]'
    },
    { 
      id: '4', 
      type: 'system', 
      title: 'System update', 
      desc: 'CodePair IDE has been updated to v2.4.1. Check out the new pair-programming features.', 
      time: '5h ago', 
      isUnread: false,
      avatarInitials: 'CP',
      avatarColor: 'bg-[#7bd0ff]'
    },
    { 
      id: '5', 
      type: 'result', 
      title: 'Result ready', 
      desc: 'Python Algorithm test results for Marcus Aurelius are ready for download.', 
      time: 'Yesterday', 
      isUnread: false,
      avatarInitials: 'MA',
      avatarColor: 'bg-[#908fa0]'
    }
  ]);

  if (!isOpen) return null;

  const filtered = notifications.filter(n => activeTab === 'all' || n.isUnread);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
  };

  const toggleReadStatus = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isUnread: !n.isUnread } : n));
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end font-inter select-none">
      {/* Background Scrim */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity" 
        onClick={onClose}
      />

      {/* Drawer Container */}
      <aside className="relative w-full max-w-[380px] bg-[#151824] border-l border-[#2D3149] h-full flex flex-col shadow-2xl z-10 text-left">
        {/* Header */}
        <div className="p-5 border-b border-[#2D3149] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Bell className="h-4 w-4 text-[#6366F1]" />
              <span>Notifications</span>
            </h2>
            <button 
              onClick={onClose}
              className="p-1 rounded hover:bg-[#1A1D27] text-[#908fa0] hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center justify-between text-xs mt-1">
            {/* Tabs */}
            <div className="flex items-center gap-4 border-b border-[#2D3149]/30 pb-1">
              <button 
                onClick={() => setActiveTab('all')}
                className={`pb-1 px-1 font-bold transition-colors relative ${
                  activeTab === 'all' ? 'text-white' : 'text-[#908fa0] hover:text-white'
                }`}
              >
                All
                {activeTab === 'all' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6366F1]" />}
              </button>
              <button 
                onClick={() => setActiveTab('unread')}
                className={`pb-1 px-1 font-bold transition-colors relative ${
                  activeTab === 'unread' ? 'text-white' : 'text-[#908fa0] hover:text-white'
                }`}
              >
                Unread
                {activeTab === 'unread' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6366F1]" />}
              </button>
            </div>

            <button 
              onClick={markAllRead}
              className="text-[10px] font-mono font-bold text-[#6366F1] uppercase hover:underline"
            >
              Mark all read
            </button>
          </div>
        </div>

        {/* Scrollable list */}
        <div className="flex-grow overflow-y-auto p-4 space-y-2.5 custom-scrollbar">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-xs text-[#908fa0]">
              No notifications to display.
            </div>
          ) : (
            filtered.map((item) => (
              <div 
                key={item.id}
                onClick={() => toggleReadStatus(item.id)}
                className={`group relative flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  item.isUnread 
                    ? 'bg-[#1A1D27]/80 border-[#2D3149]/80 hover:bg-[#1A1D27]' 
                    : 'bg-[#151824] border-transparent hover:border-[#2D3149]/40'
                }`}
              >
                {/* Unread blue dot indicator */}
                {item.isUnread && (
                  <span className="absolute right-3 top-4 w-2 h-2 rounded-full bg-[#6366F1] shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                )}

                {/* Avatar Initials or Icons */}
                <div className={`w-8 h-8 rounded-full ${item.avatarColor || 'bg-[#2D3149]'} flex items-center justify-center text-[10px] font-mono font-bold text-white flex-shrink-0`}>
                  {item.avatarInitials || 'CP'}
                </div>

                <div className="flex-1 pr-4">
                  <div className="flex justify-between items-start">
                    <span className={`text-xs font-bold leading-tight ${item.isUnread ? 'text-white' : 'text-[#908fa0]'}`}>
                      {item.title}
                    </span>
                    <span className="text-[9px] font-mono text-[#908fa0] leading-none">{item.time}</span>
                  </div>
                  <p className="text-[11px] text-[#908fa0] mt-1 leading-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Footer Actions */}
        <div className="p-4 bg-[#1F1F27]/60 border-t border-[#2D3149] flex-shrink-0">
          <button 
            onClick={() => {
              onClose();
              navigate('/settings');
            }}
            className="w-full h-10 bg-[#6366F1] text-white rounded-[4px] font-bold text-[10px] uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Settings2 className="h-4 w-4" />
            <span>Manage Notification Settings</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default NotificationsPanel;
