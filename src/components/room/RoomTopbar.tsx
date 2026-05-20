import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Copy, 
  Check, 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Timer, 
  PhoneOff 
} from 'lucide-react';
import { Button } from '../ui/Button';

export const RoomTopbar = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [videoActive, setVideoActive] = useState(true);
  const [micActive, setMicActive] = useState(true);
  const [seconds, setSeconds] = useState(2535); // 42 minutes 15 seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(roomId || 'CP-9821-X');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEndSession = () => {
    if (window.confirm('Are you sure you want to end this interview session?')) {
      navigate('/dashboard');
    }
  };

  return (
    <header className="flex justify-between items-center px-4 w-full bg-[#1F2231] border-b border-[#2D3149] h-14 select-none">
      {/* Left branding and roomId */}
      <div className="flex items-center gap-4">
        <span className="font-bold text-[#6366F1] text-sm uppercase tracking-wider font-mono">
          Interview Room
        </span>
        <div className="flex items-center gap-2 bg-[#151824] px-2.5 py-1 rounded border border-[#2D3149] text-xs">
          <span className="font-mono text-[#908fa0]">ID: {roomId || 'CP-9821-X'}</span>
          <button 
            onClick={handleCopyId}
            className="text-[#6366F1] hover:text-[#c0c1ff] transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-[#10B981]" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
        <div className="flex items-center gap-2 px-1">
          <div className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#EF4444] uppercase">Live</span>
        </div>
      </div>

      {/* Center Timer */}
      <div className="flex items-center gap-1.5 font-mono text-sm font-semibold text-[#00a6e0]">
        <Timer className="h-4 w-4" />
        <span>{formatTime(seconds)}</span>
      </div>

      {/* Right controls and Presence */}
      <div className="flex items-center gap-4">
        {/* Presence Avatars */}
        <div className="flex items-center -space-x-1.5">
          <div className="relative group">
            <img 
              alt="Interviewer Avatar" 
              className="w-7 h-7 rounded-full border-2 border-[#1F2231] bg-[#151824]" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEii5FVgMI__bofP-EW3KIixttGKsy8pbvW_rU2DQOWKRi37nBXy_KsbBs3dxXtQoqaTuX9HbbVTBuQJrXz2F9t3Bj5SuAaQ8jLcCN82NVMBNUmosJkKW4HbrtNnVySvi_u_nLFTrBlJtpMXfRPCZKWtq0smFwsDXqzzadWgRKNVe0Ac33gOYqriSMxF6tHPg267xTut-kYHWfprqxHQFjbEcw-i_f4qQ8Ad3rFQ8akOdHAL2rfdPu2a3vomBk9WT7zCIcIXgivCM"
            />
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#10B981] border border-[#1F2231] rounded-full" />
          </div>
          <div className="relative group">
            <img 
              alt="Collaborator Avatar" 
              className="w-7 h-7 rounded-full border-2 border-[#1F2231] bg-[#151824]" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDItc-_6BsvLDpHaTM4k8lUb9u3BhIElEZN0p1IYA4ANJS5D4H97hFvzJtWMR3eGD__h6EDCko8f1A8NKqIZpCMSpHhwWq9n78UaU4PahcitsJUuS9d9PfEiFENVB_FjG0BrZTGfotVSY2XqwOfmnuZKWz1lIL1n1k0Xvs8FVov5pgPBnAYz3kGS7OplmoNZHBayMOzuvD1eBhuvpw4T_bSOXKZmPBhMZ3_mFwJGm92LnzC9UQigCegAvrpUTG-Jo-ixFX3QZCRc50"
            />
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#10B981] border border-[#1F2231] rounded-full" />
          </div>
        </div>

        {/* Media Controls */}
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setVideoActive(!videoActive)}
            className={`p-2 rounded-full transition-colors ${
              videoActive ? 'text-[#908fa0] hover:bg-[#22263A] hover:text-white' : 'bg-[#EF4444]/15 text-[#EF4444] hover:bg-[#EF4444]/25'
            }`}
          >
            {videoActive ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
          </button>
          <button 
            onClick={() => setMicActive(!micActive)}
            className={`p-2 rounded-full transition-colors ${
              micActive ? 'text-[#908fa0] hover:bg-[#22263A] hover:text-white' : 'bg-[#EF4444]/15 text-[#EF4444] hover:bg-[#EF4444]/25'
            }`}
          >
            {micActive ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
          </button>
        </div>

        {/* End Session Button */}
        <Button 
          onClick={handleEndSession}
          variant="secondary"
          className="h-8 px-3 text-[10px] font-bold uppercase tracking-wider bg-[#EF4444]/10 text-[#EF4444] border-transparent hover:bg-[#EF4444]/20 hover:text-[#EF4444]"
        >
          <PhoneOff className="h-3.5 w-3.5 mr-1.5" />
          <span>End Session</span>
        </Button>
      </div>
    </header>
  );
};

export default RoomTopbar;
