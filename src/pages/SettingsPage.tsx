import { useState } from 'react';
import { 
  Bell, 
  HelpCircle, 
  User, 
  Shield, 
  BellRing, 
  Terminal, 
  CreditCard,
  Lock,
  Smartphone,
  Palette,
  Keyboard
} from 'lucide-react';
import { ProfileSettingsPanel } from '../components/settings/ProfileSettingsPanel';

export const SettingsPage = () => {
  const [activeSubMenu, setActiveSubMenu] = useState<'profile' | 'security' | 'notifications' | 'editor' | 'billing'>('profile');

  // Editor Preferences State (local only for now)
  const [theme, setTheme] = useState<'vs-dark' | 'monokai'>('vs-dark');
  const [keybinding, setKeybinding] = useState<'standard' | 'vim' | 'emacs'>('standard');
  const [fontSize, setFontSize] = useState(14);
  const [tabSize, setTabSize] = useState<2 | 4>(2);
  const [lineWrapping, setLineWrapping] = useState(true);

  return (
    <div className="flex flex-col min-h-[calc(100vh-56px)] bg-[#0F1117] text-[#e4e1ed] font-inter select-none">
      {/* Top Header */}
      <header className="h-14 bg-[#151824] border-b border-[#2D3149] flex justify-between items-center px-6 sticky top-0 z-40 select-none flex-shrink-0">
        <h1 className="text-sm font-bold text-white tracking-tight">Settings</h1>
        <div className="flex items-center gap-3">
          <button className="p-1.5 rounded hover:bg-[#22263A] text-[#908fa0] hover:text-white transition-colors">
            <Bell className="h-4.5 w-4.5" />
          </button>
          <button className="p-1.5 rounded hover:bg-[#22263A] text-[#908fa0] hover:text-white transition-colors">
            <HelpCircle className="h-4.5 w-4.5" />
          </button>
        </div>
      </header>

      {/* Settings Grid Layout */}
      <div className="flex-grow p-6 max-w-[1080px] mx-auto w-full grid grid-cols-12 gap-6 text-left">
        {/* Left Sub-navigation */}
        <nav className="col-span-12 lg:col-span-3 space-y-1">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'notifications', label: 'Notifications', icon: BellRing },
            { id: 'editor', label: 'Editor Preferences', icon: Terminal },
            { id: 'billing', label: 'Billing', icon: CreditCard },
          ].map((item) => {
            const IconComponent = item.icon;
            const isActive = activeSubMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSubMenu(item.id as any)}
                className={`w-full text-left px-4 py-2.5 rounded-lg font-bold flex items-center gap-3 text-xs tracking-wide transition-all ${
                  isActive 
                    ? 'bg-[#6366F1] text-white' 
                    : 'text-[#908fa0] hover:bg-[#1A1D27] hover:text-white'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Settings panel details */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
          {activeSubMenu === 'profile' && (
            <>
              <ProfileSettingsPanel />

              {/* Editor Preferences Section */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#151824] border border-[#2D3149] rounded-lg p-5 space-y-4">
                  <h4 className="text-xs font-bold text-white tracking-tight flex items-center gap-2">
                    <Palette className="h-4.5 w-4.5 text-[#6366F1]" />
                    <span>Theme & Appearance</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setTheme('vs-dark')}
                      className={`flex flex-col items-center gap-2 p-3 rounded border transition-all ${
                        theme === 'vs-dark' 
                          ? 'border-[#6366F1] bg-[#1A1D27]' 
                          : 'border-[#2D3149] bg-transparent hover:border-[#908fa0]/30'
                      }`}
                    >
                      <div className="w-full aspect-video bg-[#1e1e1e] rounded border border-[#2D3149] overflow-hidden flex flex-col p-1 gap-1">
                        <div className="h-1 w-2/3 bg-blue-400 rounded-full"></div>
                        <div className="h-1 w-full bg-gray-600 rounded-full"></div>
                        <div className="h-1 w-1/2 bg-purple-400 rounded-full"></div>
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#908fa0]">VS Dark</span>
                    </button>
                    <button
                      onClick={() => setTheme('monokai')}
                      className={`flex flex-col items-center gap-2 p-3 rounded border transition-all ${
                        theme === 'monokai' 
                          ? 'border-[#6366F1] bg-[#1A1D27]' 
                          : 'border-[#2D3149] bg-transparent hover:border-[#908fa0]/30'
                      }`}
                    >
                      <div className="w-full aspect-video bg-[#272822] rounded border border-[#2D3149] overflow-hidden flex flex-col p-1 gap-1">
                        <div className="h-1 w-2/3 bg-green-400 rounded-full"></div>
                        <div className="h-1 w-full bg-gray-500 rounded-full"></div>
                        <div className="h-1 w-1/2 bg-pink-400 rounded-full"></div>
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#908fa0]">Monokai</span>
                    </button>
                  </div>
                </div>

                <div className="bg-[#151824] border border-[#2D3149] rounded-lg p-5 space-y-4">
                  <h4 className="text-xs font-bold text-white tracking-tight flex items-center gap-2">
                    <Keyboard className="h-4.5 w-4.5 text-[#7bd0ff]" />
                    <span>Keybindings</span>
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center px-4 py-2.5 bg-[#1A1D27] rounded-lg border border-[#2D3149]">
                      <span className="text-xs text-white">Layout Engine</span>
                      <span className="text-xs font-mono font-bold text-[#6366F1] uppercase">{keybinding}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {(['standard', 'vim', 'emacs'] as const).map((k) => (
                        <button
                          key={k}
                          onClick={() => setKeybinding(k)}
                          className={`py-2 text-center rounded border text-[10px] font-mono font-bold uppercase tracking-wider transition-all ${
                            keybinding === k
                              ? 'bg-[#1A1D27] border-[#6366F1] text-[#6366F1]'
                              : 'bg-transparent border-[#2D3149] text-[#908fa0] hover:bg-[#1A1D27]'
                          }`}
                        >
                          {k}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Editor Mechanics */}
                <div className="bg-[#151824] border border-[#2D3149] rounded-lg p-5 md:col-span-2 space-y-4">
                  <h4 className="text-xs font-bold text-white tracking-tight flex items-center gap-2">
                    <Terminal className="h-4.5 w-4.5 text-[#d97721]" />
                    <span>Editor Mechanics</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-mono font-bold uppercase tracking-wider text-[#908fa0]">
                        <span>Font Size</span>
                        <span className="text-[#6366F1]">{fontSize}px</span>
                      </div>
                      <input 
                        type="range" 
                        min="10" 
                        max="24" 
                        value={fontSize} 
                        onChange={(e) => setFontSize(Number(e.target.value))}
                        className="w-full accent-[#6366F1] cursor-pointer"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#908fa0]">Tab Size</label>
                      <div className="flex gap-2">
                        {[2, 4].map((size) => (
                          <button
                            key={size}
                            onClick={() => setTabSize(size as any)}
                            className={`flex-1 py-1.5 rounded border text-[10px] font-mono font-bold uppercase tracking-wider transition-all ${
                              tabSize === size
                                ? 'bg-[#6366F1]/10 border-[#6366F1]/40 text-[#6366F1]'
                                : 'bg-transparent border-[#2D3149] text-[#908fa0] hover:border-[#908fa0]/30'
                            }`}
                          >
                            {size} Spaces
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#908fa0]">Line Wrapping</label>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setLineWrapping(!lineWrapping)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            lineWrapping ? 'bg-[#6366F1]' : 'bg-[#2D3149]'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform bg-white rounded-full transition-transform ${
                            lineWrapping ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                        <span className="text-xs font-semibold text-white">{lineWrapping ? 'Enabled' : 'Disabled'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Security Card Section */}
              <section className="bg-[#151824] border border-[#2D3149] rounded-lg p-6 space-y-4">
                <h3 className="text-sm font-bold text-white tracking-tight">Security & Privacy</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-[#2D3149]/60 rounded-lg bg-[#1A1D27]/40 text-xs">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/20 flex items-center justify-center text-[#EF4444]">
                        <Lock className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-bold text-white">Change Password</p>
                        <p className="text-[10px] text-[#908fa0] font-mono mt-0.5">Last changed 4 months ago</p>
                      </div>
                    </div>
                    <button className="px-4 py-1.5 border border-[#2D3149] rounded-[4px] hover:bg-[#1A1D27] text-[10px] font-mono font-bold uppercase tracking-wider hover:text-white transition-colors">
                      Update
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-[#2D3149]/60 rounded-lg bg-[#1A1D27]/40 text-xs">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#7bd0ff]/10 border border-[#7bd0ff]/20 flex items-center justify-center text-[#7bd0ff]">
                        <Smartphone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-bold text-white">Active Sessions</p>
                        <p className="text-[10px] text-[#908fa0] font-mono mt-0.5">You are logged in on 3 devices</p>
                      </div>
                    </div>
                    <button className="px-4 py-1.5 border border-[#2D3149] rounded-[4px] hover:bg-[#1A1D27] text-[10px] font-mono font-bold uppercase tracking-wider hover:text-white transition-colors">
                      Manage
                    </button>
                  </div>
                </div>
              </section>
            </>
          )}

          {activeSubMenu !== 'profile' && (
            <div className="bg-[#151824] border border-[#2D3149] rounded-lg p-12 text-center text-[#908fa0] text-xs">
              This settings panel section is currently under development.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
