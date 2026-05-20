import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { 
  X, 
  Search, 
  Copy, 
  Check, 
  PlusSquare, 
  UserPlus, 
  Info, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateRoomModal = ({ isOpen, onClose }: CreateRoomModalProps) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [timeLimit, setTimeLimit] = useState<45 | 60 | 90>(45);
  const [problemSearch, setProblemSearch] = useState('');
  const [roomIdInput, setRoomIdInput] = useState('');
  const [mockRoomId] = useState('v2-x9k2-p0l');

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`codepair.io/r/${mockRoomId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateRoom = () => {
    // Navigate to room
    navigate(`/room/${mockRoomId}`);
    onClose();
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomIdInput.trim()) {
      navigate(`/room/${roomIdInput.trim()}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 select-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0F1117]/85 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <Card className="relative z-10 w-full max-w-[840px] bg-[#22263A] border-[#2D3149] rounded-lg overflow-hidden shadow-2xl animate-fade-in flex flex-col">
        {/* Header */}
        <div className="px-8 py-5 border-b border-[#2D3149] flex justify-between items-center bg-[#282C44]">
          <div className="text-left">
            <h2 className="text-lg font-bold text-white tracking-tight">Session Setup</h2>
            <p className="text-xs text-[#908fa0] mt-0.5">Create a new interview room or join an existing one.</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-[#908fa0] hover:text-white hover:bg-[#1A1D27]/80 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Columns Grid */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {/* Create Room Column */}
          <div className="space-y-6 flex flex-col justify-between text-left">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[4px] bg-[#6366F1]/10 flex items-center justify-center text-[#6366F1]">
                  <PlusSquare className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Create Room</h3>
              </div>

              {/* Problem Selection */}
              <div className="space-y-1.5">
                <Label className="text-[10px] font-mono tracking-wider text-[#908fa0] uppercase">
                  Select Problem
                </Label>
                <div className="relative">
                  <Search className="absolute left-3.5 top-3 h-4.5 w-4.5 text-[#908fa0]/60" />
                  <Input
                    value={problemSearch}
                    onChange={(e) => setProblemSearch(e.target.value)}
                    placeholder="Search problems (e.g. Two Sum)"
                    className="pl-10.5 h-11 bg-[#1A1D27] border-[#2D3149] focus:border-[#6366F1] placeholder:text-[#908fa0]/30"
                  />
                </div>
              </div>

              {/* Time Limits */}
              <div className="space-y-1.5">
                <Label className="text-[10px] font-mono tracking-wider text-[#908fa0] uppercase">
                  Time Limit
                </Label>
                <div className="flex gap-2">
                  {([45, 60, 90] as const).map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setTimeLimit(mins)}
                      className={`flex-1 h-9 rounded-[4px] text-xs font-mono font-semibold transition-all border ${
                        timeLimit === mins
                          ? 'bg-[#6366F1]/10 text-[#6366F1] border-[#6366F1]/30'
                          : 'bg-[#1A1D27] text-[#908fa0] border-[#2D3149] hover:border-[#908fa0]/30'
                      }`}
                    >
                      {mins} MIN
                    </button>
                  ))}
                </div>
              </div>

              {/* Invite Link */}
              <div className="space-y-1.5">
                <Label className="text-[10px] font-mono tracking-wider text-[#908fa0] uppercase">
                  Invite Link
                </Label>
                <div className="flex gap-1.5">
                  <div className="flex-1 h-11 px-3.5 bg-[#1A1D27] border border-[#2D3149] rounded-[4px] font-mono text-xs text-[#908fa0] flex items-center justify-between select-all overflow-hidden truncate">
                    codepair.io/r/{mockRoomId}
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="w-11 h-11 bg-[#1A1D27] border border-[#2D3149] hover:bg-[#22263A] rounded-[4px] flex items-center justify-center text-[#908fa0] hover:text-white transition-colors active:scale-95"
                  >
                    {copied ? <Check className="h-4.5 w-4.5 text-[#10B981]" /> : <Copy className="h-4.5 w-4.5" />}
                  </button>
                </div>
              </div>
            </div>

            <Button
              onClick={handleCreateRoom}
              className="w-full h-11 text-xs font-semibold uppercase tracking-wider mt-4"
            >
              Initialize Room
            </Button>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[1px] bg-[#2D3149]/40 -translate-x-1/2" />

          {/* Join Room Column */}
          <div className="space-y-6 flex flex-col justify-between text-left">
            <form onSubmit={handleJoinRoom} className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[4px] bg-[#10B981]/10 flex items-center justify-center text-[#10B981]">
                  <UserPlus className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Join Room</h3>
              </div>

              <p className="text-xs text-[#908fa0] leading-relaxed">
                Enter the unique ID shared by your session host to participate in a live coding interview.
              </p>

              {/* Room Identifier Input */}
              <div className="space-y-1.5 pt-3">
                <Label className="text-[10px] font-mono tracking-wider text-[#908fa0] uppercase">
                  Room Identifier
                </Label>
                <Input
                  required
                  value={roomIdInput}
                  onChange={(e) => setRoomIdInput(e.target.value)}
                  placeholder="e.g. v2-x9k2-p0l"
                  className="h-11 bg-[#1A1D27] border-[#2D3149] focus:border-[#10B981] placeholder:text-[#908fa0]/30 font-mono tracking-wider text-xs uppercase"
                />
              </div>

              {/* Info System Box */}
              <div className="bg-[#1A1D27] p-3.5 rounded-[4px] border border-[#2D3149] space-y-1">
                <div className="flex items-center gap-1.5 text-[#10B981]">
                  <Info className="h-4 w-4" />
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider">System Check</span>
                </div>
                <p className="text-[11px] text-[#908fa0] leading-relaxed">
                  Your microphone and camera will be requested upon entering the room. Ensure you are in a quiet environment.
                </p>
              </div>
            </form>

            <Button
              onClick={handleJoinRoom}
              className="w-full h-11 text-xs font-semibold uppercase tracking-wider bg-[#10B981] hover:bg-[#10B981]/90 border-transparent hover:text-white mt-4"
            >
              Enter Room
            </Button>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="px-8 py-3 bg-[#151824] flex items-center justify-center gap-8 border-t border-[#2D3149]/40 select-none">
          <div className="flex items-center gap-1.5 text-[#908fa0] text-[10px] font-mono uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4 text-[#10B981]" />
            <span>End-to-end encrypted session</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#908fa0] text-[10px] font-mono uppercase tracking-wider">
            <Zap className="h-4 w-4 text-[#6366F1]" />
            <span>Low latency relay (&lt; 20ms)</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreateRoomModal;
