import { RoomTopbar } from '../components/room/RoomTopbar';
import { CodeEditor } from '../components/room/CodeEditor';
import { ProblemPanel } from '../components/room/ProblemPanel';
import { OutputConsole } from '../components/room/OutputConsole';

export const RoomPage = () => {
  return (
    <div className="h-screen flex flex-col bg-[#0F1117] text-[#e4e1ed] font-inter overflow-hidden">
      {/* Top Session AppBar */}
      <RoomTopbar />

      {/* Main Split-Pane Workspace */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Side: Code Editor (60% width) */}
        <div className="w-[60%] flex flex-col">
          <CodeEditor />
        </div>

        {/* Right Side: Problem Info & Output Console (40% width) */}
        <div className="w-[40%] flex flex-col bg-[#1A1D27] border-l border-[#2D3149]">
          <ProblemPanel />
          <OutputConsole />
        </div>
      </main>
    </div>
  );
};

export default RoomPage;
