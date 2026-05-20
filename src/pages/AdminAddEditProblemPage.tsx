import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Trash2, 
  Lock, 
  Unlock, 
  RotateCcw, 
  X, 
  Bold, 
  Italic, 
  List, 
  Link as LinkIcon, 
  FileCode,
  Bell,
  HelpCircle
} from 'lucide-react';
import { Button } from '../components/ui/Button';

interface TestCase {
  id: string;
  isPublic: boolean;
  input: string;
  output: string;
}

const STARTER_CODES = {
  Python: `class LRUCache:
    def __init__(self, capacity: int):
        # Initialize your data structure here
        pass

    def get(self, key: int) -> int:
        # Return value for key
        pass

    def put(self, key: int, value: int) -> None:
        # Insert or update key
        pass`,
  Java: `class LRUCache {
    public LRUCache(int capacity) {
        // Initialize capacity
    }
    
    public int get(int key) {
        return -1;
    }
    
    public void put(int key, int value) {
        
    }
}`,
  'C++': `class LRUCache {
public:
    LRUCache(int capacity) {
        
    }
    
    int get(int key) {
        return -1;
    }
    
    void put(int key, int value) {
        
    }
};`,
  JavaScript: `class LRUCache {
    /**
     * @param {number} capacity
     */
    constructor(capacity) {
        this.capacity = capacity;
    }

    /** 
     * @param {number} key
     * @return {number}
     */
    get(key) {
        return -1;
    }

    /** 
     * @param {number} key 
     * @param {number} value
     * @return {void}
     */
    put(key, value) {

    }
}`
};

export const AdminAddEditProblemPage = () => {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('LRU Cache Implementation');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [timeLimit, setTimeLimit] = useState(1000);
  const [memoryLimit, setMemoryLimit] = useState(256);
  
  const [tags, setTags] = useState(['Data Structures', 'Design', 'LRU']);
  const [newTagInput, setNewTagInput] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);

  const [description, setDescription] = useState(
    `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.\n\nImplement the LRUCache class:\n- LRUCache(int capacity) Initialize the LRU cache with positive size capacity.\n- int get(int key) Return the value of the key if the key exists, otherwise return -1.\n- void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.`
  );

  const [activeLang, setActiveLang] = useState<'Python' | 'Java' | 'C++' | 'JavaScript'>('Python');
  const [codeSnippets, setCodeSnippets] = useState<Record<string, string>>(STARTER_CODES);

  const [testCases, setTestCases] = useState<TestCase[]>([
    {
      id: '1',
      isPublic: true,
      input: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]',
      output: '[null, null, null, 1, null, -1, null, -1, 3, 4]'
    },
    {
      id: '2',
      isPublic: false,
      input: '[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]',
      output: '[null, null, null, 1, null, -1, null, -1, 3, 4]'
    }
  ]);

  const handleAddTag = () => {
    if (newTagInput.trim() && !tags.includes(newTagInput.trim())) {
      setTags([...tags, newTagInput.trim()]);
      setNewTagInput('');
      setShowTagInput(false);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleResetCode = () => {
    if (window.confirm('Are you sure you want to reset the starter code to the default template?')) {
      setCodeSnippets(prev => ({
        ...prev,
        [activeLang]: STARTER_CODES[activeLang]
      }));
    }
  };

  const handleAddTestCase = () => {
    const newCase: TestCase = {
      id: Date.now().toString(),
      isPublic: true,
      input: '[]',
      output: '[]'
    };
    setTestCases([...testCases, newCase]);
  };

  const handleRemoveTestCase = (id: string) => {
    setTestCases(testCases.filter(tc => tc.id !== id));
  };

  const handleTogglePublic = (id: string) => {
    setTestCases(testCases.map(tc => tc.id === id ? { ...tc, isPublic: !tc.isPublic } : tc));
  };

  const handlePublish = () => {
    if (!title.trim()) {
      alert('Please provide a valid problem title.');
      return;
    }
    alert(`Problem "${title}" has been successfully published!`);
    navigate('/problems');
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-56px)] bg-[#0F1117] text-[#e4e1ed] font-inter select-none">
      {/* Top Header */}
      <header className="h-14 bg-[#151824] border-b border-[#2D3149] flex justify-between items-center px-6 sticky top-0 z-40 select-none flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-white tracking-tight">Edit Problem</span>
          <span className="text-[#2D3149] font-mono text-xs">/</span>
          <span className="text-xs text-[#908fa0] font-mono max-w-[200px] truncate">{title}</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-1.5 rounded hover:bg-[#22263A] text-[#908fa0] hover:text-white transition-colors">
            <Bell className="h-4.5 w-4.5" />
          </button>
          <button className="p-1.5 rounded hover:bg-[#22263A] text-[#908fa0] hover:text-white transition-colors">
            <HelpCircle className="h-4.5 w-4.5" />
          </button>
        </div>
      </header>

      {/* Main Form Content */}
      <main className="flex-grow p-6 space-y-6 max-w-[1140px] mx-auto w-full text-left">
        {/* Title Input Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
          <div className="flex-1 space-y-2">
            <label className="text-[10px] font-mono font-bold text-[#6366F1] uppercase tracking-wider">Problem Title</label>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#151824] border border-[#2D3149] rounded-lg px-4 py-3 text-lg font-bold text-white focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] outline-none transition-all"
              placeholder="Enter problem title..."
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => alert('Draft saved successfully!')}
              className="h-11 px-4 border-[#2D3149] hover:bg-[#1A1D27] text-xs font-bold uppercase tracking-wider"
            >
              Save Draft
            </Button>
            <Button
              onClick={handlePublish}
              className="h-11 px-4 bg-[#6366F1] text-white hover:brightness-110 text-xs font-bold uppercase tracking-wider shadow-lg"
            >
              Publish Problem
            </Button>
          </div>
        </div>

        {/* 2-Column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Metadata, Tags & Description */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Metadata Limits Bento */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-[#151824] rounded-lg border border-[#2D3149]">
              <div className="space-y-1">
                <label className="text-[9px] font-mono font-bold text-[#908fa0] uppercase tracking-wider">Difficulty</label>
                <select 
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="w-full bg-[#1A1D27] border border-[#2D3149] rounded px-3 py-1.5 text-xs text-white focus:border-[#6366F1] outline-none"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono font-bold text-[#908fa0] uppercase tracking-wider">Time Limit (ms)</label>
                <input 
                  type="number"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(Number(e.target.value))}
                  className="w-full bg-[#1A1D27] border border-[#2D3149] rounded px-3 py-1.5 text-xs text-white focus:border-[#6366F1] outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono font-bold text-[#908fa0] uppercase tracking-wider">Memory Limit (MB)</label>
                <input 
                  type="number"
                  value={memoryLimit}
                  onChange={(e) => setMemoryLimit(Number(e.target.value))}
                  className="w-full bg-[#1A1D27] border border-[#2D3149] rounded px-3 py-1.5 text-xs text-white focus:border-[#6366F1] outline-none font-mono"
                />
              </div>
            </div>

            {/* Categorization Tags TagEditor */}
            <div className="p-4 bg-[#151824] rounded-lg border border-[#2D3149] space-y-3">
              <label className="text-[9px] font-mono font-bold text-[#908fa0] uppercase tracking-wider block">Categorization &amp; Tags</label>
              <div className="flex flex-wrap gap-2 items-center">
                {tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="flex items-center gap-1.5 px-3 py-1 bg-[#1A1D27] border border-[#2D3149] rounded-full text-xs text-white"
                  >
                    <span>{tag}</span>
                    <button 
                      onClick={() => handleRemoveTag(tag)}
                      className="text-[#908fa0] hover:text-[#EF4444] transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                
                {showTagInput ? (
                  <div className="flex items-center gap-1.5">
                    <input 
                      type="text"
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                      className="bg-[#1A1D27] border border-[#2D3149] px-2 py-0.5 rounded text-xs text-white outline-none w-24 focus:border-[#6366F1]"
                      placeholder="Tag name..."
                      autoFocus
                    />
                    <button 
                      onClick={handleAddTag}
                      className="px-2 py-0.5 bg-[#6366F1] rounded text-[10px] text-white uppercase font-bold"
                    >
                      Add
                    </button>
                    <button 
                      onClick={() => {
                        setShowTagInput(false);
                        setNewTagInput('');
                      }}
                      className="text-[#908fa0]"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setShowTagInput(true)}
                    className="px-3 py-1 border border-dashed border-[#2D3149] hover:border-[#6366F1] text-xs text-[#908fa0] hover:text-[#6366F1] rounded-full flex items-center gap-1 transition-all"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Tag
                  </button>
                )}
              </div>
            </div>

            {/* Description Textarea Editor */}
            <div className="bg-[#151824] rounded-lg border border-[#2D3149] overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-4 py-2 border-b border-[#2D3149] bg-[#1F1F27]/60">
                <span className="text-[9px] font-mono font-bold text-[#908fa0] uppercase tracking-wider">Problem Description</span>
                <div className="flex gap-2">
                  <button className="p-1 hover:bg-[#2D3149] text-[#908fa0] hover:text-white rounded transition-colors"><Bold className="h-3.5 w-3.5" /></button>
                  <button className="p-1 hover:bg-[#2D3149] text-[#908fa0] hover:text-white rounded transition-colors"><Italic className="h-3.5 w-3.5" /></button>
                  <button className="p-1 hover:bg-[#2D3149] text-[#908fa0] hover:text-white rounded transition-colors"><List className="h-3.5 w-3.5" /></button>
                  <button className="p-1 hover:bg-[#2D3149] text-[#908fa0] hover:text-white rounded transition-colors"><FileCode className="h-3.5 w-3.5" /></button>
                  <button className="p-1 hover:bg-[#2D3149] text-[#908fa0] hover:text-white rounded transition-colors"><LinkIcon className="h-3.5 w-3.5" /></button>
                </div>
              </div>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={12}
                className="w-full bg-[#151824] border-0 p-4 text-xs text-[#e4e1ed] leading-relaxed focus:ring-0 outline-none resize-none font-mono"
                placeholder="Write description here in markdown..."
              />
            </div>
          </div>

          {/* Right Column: Code snippets & Test cases */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Starter Code templates */}
            <div className="bg-[#151824] border border-[#2D3149] rounded-lg flex flex-col overflow-hidden h-[360px]">
              <div className="flex items-center border-b border-[#2D3149] bg-[#1F1F27]/60">
                {(['Python', 'Java', 'C++', 'JavaScript'] as const).map((lang) => (
                  <button 
                    key={lang}
                    onClick={() => setActiveLang(lang)}
                    className={`flex-1 py-2.5 text-[10px] font-mono font-bold uppercase border-b-2 transition-colors ${
                      activeLang === lang 
                        ? 'text-[#6366F1] border-[#6366F1] bg-[#1A1D27]' 
                        : 'text-[#908fa0] border-transparent hover:text-white hover:bg-[#1A1D27]/40'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <textarea 
                value={codeSnippets[activeLang]}
                onChange={(e) => {
                  const val = e.target.value;
                  setCodeSnippets(prev => ({ ...prev, [activeLang]: val }));
                }}
                className="flex-grow w-full bg-[#0F1117] p-4 text-[11px] font-mono text-[#7bd0ff] leading-relaxed focus:ring-0 border-0 outline-none resize-none"
              />

              <div className="p-2 border-t border-[#2D3149] bg-[#1F1F27]/60 flex justify-end">
                <button 
                  onClick={handleResetCode}
                  className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#6366F1] hover:underline flex items-center gap-1.5"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset Starter Code</span>
                </button>
              </div>
            </div>

            {/* Test Cases Editor */}
            <div className="bg-[#151824] border border-[#2D3149] rounded-lg flex flex-col">
              <div className="flex justify-between items-center px-4 py-3 border-b border-[#2D3149]">
                <span className="text-[9px] font-mono font-bold text-[#908fa0] uppercase tracking-wider">Test Cases</span>
                <button 
                  onClick={handleAddTestCase}
                  className="p-1 hover:bg-[#2D3149] text-[#6366F1] rounded transition-colors"
                >
                  <Plus className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="p-4 space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar">
                {testCases.map((tc, index) => (
                  <div key={tc.id} className="p-3 bg-[#0F1117] rounded border border-[#2D3149] space-y-2 relative group">
                    <div className="flex justify-between items-center">
                      <button 
                        onClick={() => handleTogglePublic(tc.id)}
                        className={`text-[9px] font-mono font-bold uppercase flex items-center gap-1.5 ${
                          tc.isPublic ? 'text-[#7bd0ff]' : 'text-[#d97721]'
                        }`}
                      >
                        {tc.isPublic ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                        <span>Case {index + 1} ({tc.isPublic ? 'Public' : 'Hidden'})</span>
                      </button>

                      <button 
                        onClick={() => handleRemoveTestCase(tc.id)}
                        className="text-[#908fa0] hover:text-[#EF4444] opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[8px] font-mono font-bold text-[#464554] uppercase block">Input</label>
                      <input 
                        type="text" 
                        value={tc.input} 
                        onChange={(e) => {
                          const val = e.target.value;
                          setTestCases(testCases.map(x => x.id === tc.id ? { ...x, input: val } : x));
                        }}
                        className="w-full bg-[#151824] border border-[#2D3149] px-2 py-1 rounded text-[10px] font-mono text-white focus:border-[#6366F1] outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[8px] font-mono font-bold text-[#464554] uppercase block">Expected Output</label>
                      <input 
                        type="text" 
                        value={tc.output} 
                        onChange={(e) => {
                          const val = e.target.value;
                          setTestCases(testCases.map(x => x.id === tc.id ? { ...x, output: val } : x));
                        }}
                        className="w-full bg-[#151824] border border-[#2D3149] px-2 py-1 rounded text-[10px] font-mono text-white focus:border-[#6366F1] outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Footer info auto-save indicators */}
        <footer className="pt-4 border-t border-[#2D3149] flex justify-between items-center text-[#908fa0]">
          <div className="flex gap-4 items-center">
            <span className="text-[9px] font-mono">Last saved: 2 minutes ago</span>
            <button 
              onClick={() => {
                if (window.confirm('Are you sure you want to archive this problem?')) {
                  alert('Problem archived successfully!');
                  navigate('/problems');
                }
              }}
              className="text-[#EF4444] text-[9px] font-mono uppercase font-bold hover:underline flex items-center gap-1"
            >
              <Trash2 className="h-3 w-3" />
              <span>Archive Problem</span>
            </button>
          </div>
          <span className="text-[9px] font-mono uppercase font-bold text-[#10B981] flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span>Auto-save active</span>
          </span>
        </footer>
      </main>
    </div>
  );
};

export default AdminAddEditProblemPage;
