import { PracticeProblemPanel } from './PracticeProblemPanel';
import { PracticeOutputConsole } from './PracticeOutputConsole';

export function PracticeRightPanel() {
  return (
    <div className="w-[40%] flex flex-col bg-[#1A1D27] border-l border-[#2D3149] min-h-0">
      <div className="flex-1 min-h-0 flex flex-col border-b border-[#2D3149] overflow-hidden">
        <PracticeProblemPanel />
      </div>
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
        <PracticeOutputConsole />
      </div>
    </div>
  );
}

export default PracticeRightPanel;
