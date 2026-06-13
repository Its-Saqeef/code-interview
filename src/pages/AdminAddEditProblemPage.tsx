import { useState, type ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Plus,
  Trash2,
  Lock,
  Unlock,
  RotateCcw,
  X,
  Lightbulb,
  ListChecks,
  BookOpen,
  Image as ImageIcon,
  Clock,
  Award,
  Loader2,
  Bell,
  HelpCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Label } from '../components/ui/Label';
import { FieldLabel } from '../components/ui/FieldLabel';
import { TooltipProvider } from '../components/ui/Tooltip';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { ADMIN_PROBLEM_FIELD_HELP } from '../constants/adminProblemFieldHelp';
import { addProblem } from '../api/admin.api';
import { validateAdminProblem } from '../validation/adminProblem.schema';
import type { AdminProblemFormData } from '../validation/adminProblem.schema';
import { isAxiosError } from 'axios';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

interface TestCase {
  id: string;
  isPublic: boolean;
  input: string;
  output: string;
}

interface Example {
  id: string;
  input: string;
  output: string;
  explanation: string;
}

const STARTER_CODES: Record<string, string> = {
  Python: '',
  Java: '',
  'C++': '',
  JavaScript: '',
};

const DIFFICULTY_MAP = {
  Easy: 'easy',
  Medium: 'medium',
  Hard: 'hard',
} as const;

interface StringListEditorProps {
  label: string;
  icon: ReactNode;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
  emptyHint?: string;
  helpText: string;
  required?: boolean;
}

function StringListEditor({ label, icon, items, onChange, placeholder, emptyHint, helpText, required }: StringListEditorProps) {
  const updateItem = (index: number, value: string) => {
    onChange(items.map((item, i) => (i === index ? value : item)));
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const addItem = () => {
    onChange([...items, '']);
  };

  return (
    <Card className="p-0 overflow-hidden">
      <CardHeader className="px-4 py-3 border-b border-[#2D3149] bg-[#1F1F27]/60 flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center gap-2">
          {icon}
          <FieldLabel variant="section" helpText={helpText} required={required}>
            {label}
          </FieldLabel>
        </div>
        <button
          type="button"
          onClick={addItem}
          className="p-1 hover:bg-[#2D3149] text-[#6366F1] rounded transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        {items.length === 0 && emptyHint && (
          <p className="text-xs text-[#908fa0] italic">{emptyHint}</p>
        )}
        {items.map((item, index) => (
          <div key={index} className="flex gap-2 items-start group">
            <span className="text-[10px] font-mono font-bold text-[#6366F1] mt-2.5 w-5 shrink-0">{index + 1}.</span>
            <Input
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder={placeholder}
              className="text-xs font-mono"
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="text-[#908fa0] hover:text-[#EF4444] mt-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <Button type="button" variant="secondary" onClick={addItem} className="w-full text-xs border-dashed border-[#2D3149]">
            Add first item
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export const AdminAddEditProblemPage = () => {
  const navigate = useNavigate();
  const { problemId } = useParams<{ problemId?: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [timeLimit, setTimeLimit] = useState(1000);
  const [memoryLimit, setMemoryLimit] = useState(256);
  const [recommendedMinutes, setRecommendedMinutes] = useState<number | ''>(45);
  const [imageUrl, setImageUrl] = useState('');

  const [tags, setTags] = useState<string[]>([]);
  const [badges, setBadges] = useState<string[]>([]);
  const [constraints, setConstraints] = useState<string[]>(['']);
  const [hints, setHints] = useState<string[]>(['']);
  const [newTagInput, setNewTagInput] = useState('');
  const [newBadgeInput, setNewBadgeInput] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const [showBadgeInput, setShowBadgeInput] = useState(false);

  const [description, setDescription] = useState('');
  const [examples, setExamples] = useState<Example[]>([
    { id: '1', input: '', output: '', explanation: '' },
  ]);

  const [activeLang, setActiveLang] = useState<'Python' | 'Java' | 'C++' | 'JavaScript'>('Python');
  const [codeSnippets, setCodeSnippets] = useState<Record<string, string>>(STARTER_CODES);

  const [testCases, setTestCases] = useState<TestCase[]>([
    { id: '1', isPublic: true, input: '', output: '' },
  ]);

  useDocumentTitle(problemId && title.trim() ? `Edit: ${title.trim()}` : undefined);

  const handleAddTag = () => {
    const value = newTagInput.trim();
    if (value && !tags.includes(value)) {
      setTags([...tags, value]);
      setNewTagInput('');
      setShowTagInput(false);
    }
  };

  const handleAddBadge = () => {
    const value = newBadgeInput.trim();
    if (value && !badges.includes(value)) {
      setBadges([...badges, value]);
      setNewBadgeInput('');
      setShowBadgeInput(false);
    }
  };

  const handleRemoveTag = (tag: string) => setTags(tags.filter((t) => t !== tag));
  const handleRemoveBadge = (badge: string) => setBadges(badges.filter((b) => b !== badge));

  const handleAddExample = () => {
    setExamples([...examples, { id: Date.now().toString(), input: '', output: '', explanation: '' }]);
  };

  const handleRemoveExample = (id: string) => {
    if (examples.length <= 1) {
      toast.error('At least one example is required');
      return;
    }
    setExamples(examples.filter((ex) => ex.id !== id));
  };

  const handleAddTestCase = () => {
    setTestCases([
      ...testCases,
      { id: Date.now().toString(), isPublic: true, input: '', output: '' },
    ]);
  };

  const handleRemoveTestCase = (id: string) => {
    if (testCases.length <= 1) {
      toast.error('At least one test case is required');
      return;
    }
    setTestCases(testCases.filter((tc) => tc.id !== id));
  };

  const handleTogglePublic = (id: string) => {
    setTestCases(testCases.map((tc) => (tc.id === id ? { ...tc, isPublic: !tc.isPublic } : tc)));
  };

  const buildPayload = (status: 'draft' | 'published'): AdminProblemFormData => ({
    title,
    description,
    difficulty: DIFFICULTY_MAP[difficulty],
    timeLimit,
    memoryLimit,
    tags,
    constraints: constraints.map((c) => c.trim()).filter(Boolean),
    hints: hints.map((h) => h.trim()).filter(Boolean),
    examples: examples.map(({ input, output, explanation }) => ({
      input: input.trim(),
      output: output.trim(),
      explanation: explanation.trim() || undefined,
    })),
    starterCode: codeSnippets,
    badges,
    status,
    imageUrl: imageUrl.trim() || undefined,
    recommendedMinutes: recommendedMinutes === '' ? undefined : recommendedMinutes,
    testCases: testCases.map(({ input, output, isPublic }) => ({
      input: input.trim(),
      expectedOutput: output.trim(),
      isPublic,
    })),
  });

  const handleSubmit = async (status: 'draft' | 'published') => {
    const payload = buildPayload(status);
    const result = validateAdminProblem(payload);

    if (!result.success) {
      const messages = result.error.issues.map((issue) => issue.message);
      toast.error('Please fix the following:', {
        description: messages.slice(0, 5).join('\n'),
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await addProblem(result.data);
      toast.success(
        status === 'published'
          ? `Problem "${response.problem.title}" published successfully`
          : `Draft "${response.problem.title}" saved successfully`,
      );
      navigate('/problems');
    } catch (error) {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ?? error.message
        : 'Failed to save problem';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderChipEditor = (
    label: string,
    items: string[],
    onRemove: (item: string) => void,
    showInput: boolean,
    setShowInput: (v: boolean) => void,
    inputValue: string,
    setInputValue: (v: string) => void,
    onAdd: () => void,
    accentClass: string,
    helpText: string,
    required?: boolean,
  ) => (
    <div className="space-y-3">
      <FieldLabel helpText={helpText} required={required}>
        {label}
      </FieldLabel>
      <div className="flex flex-wrap gap-2 items-center">
        {items.map((item) => (
          <span
            key={item}
            className={`flex items-center gap-1.5 px-3 py-1 bg-[#1A1D27] border border-[#2D3149] rounded-full text-xs text-white ${accentClass}`}
          >
            <span>{item}</span>
            <button type="button" onClick={() => onRemove(item)} className="text-[#908fa0] hover:text-[#EF4444] transition-colors">
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        {showInput ? (
          <div className="flex items-center gap-1.5">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), onAdd())}
              className="w-32 text-xs py-1"
              placeholder="Name..."
              autoFocus
            />
            <button type="button" onClick={onAdd} className="px-2 py-1 bg-[#6366F1] rounded text-[10px] text-white uppercase font-bold">
              Add
            </button>
            <button type="button" onClick={() => { setShowInput(false); setInputValue(''); }} className="text-[#908fa0]">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowInput(true)}
            className="px-3 py-1 border border-dashed border-[#2D3149] hover:border-[#6366F1] text-xs text-[#908fa0] hover:text-[#6366F1] rounded-full flex items-center gap-1 transition-all"
          >
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        )}
      </div>
    </div>
  );

  return (
    <TooltipProvider delayDuration={200}>
    <div className="flex flex-col min-h-[calc(100vh-56px)] bg-[#0F1117] text-[#e4e1ed] font-inter">
      <header className="h-14 bg-[#151824] border-b border-[#2D3149] flex justify-between items-center px-6 sticky top-0 z-40 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-white tracking-tight">Add Problem</span>
          <span className="text-[#2D3149] font-mono text-xs">/</span>
          <span className="text-xs text-[#908fa0] font-mono max-w-[200px] truncate">{title || 'Untitled'}</span>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" className="p-1.5 rounded hover:bg-[#22263A] text-[#908fa0] hover:text-white transition-colors">
            <Bell className="h-4.5 w-4.5" />
          </button>
          <button type="button" className="p-1.5 rounded hover:bg-[#22263A] text-[#908fa0] hover:text-white transition-colors">
            <HelpCircle className="h-4.5 w-4.5" />
          </button>
        </div>
      </header>

      <main className="flex-grow p-6 space-y-6 max-w-[1140px] mx-auto w-full text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
          <div className="flex-1 space-y-2">
            <FieldLabel htmlFor="problem-title" helpText={ADMIN_PROBLEM_FIELD_HELP.title} required>
              Problem Title
            </FieldLabel>
            <Input
              id="problem-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-bold py-3"
              placeholder="Enter problem title..."
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              disabled={isSubmitting}
              onClick={() => handleSubmit('draft')}
              className="h-11 px-4 border-[#2D3149] hover:bg-[#1A1D27] text-xs font-bold uppercase tracking-wider"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save Draft'}
            </Button>
            <Button
              disabled={isSubmitting}
              onClick={() => handleSubmit('published')}
              className="h-11 px-4 bg-[#6366F1] text-white hover:brightness-110 text-xs font-bold uppercase tracking-wider shadow-lg"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Publish Problem'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <Card className="p-4 bg-[#151824]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <FieldLabel htmlFor="difficulty" helpText={ADMIN_PROBLEM_FIELD_HELP.difficulty} required>
                    Difficulty
                  </FieldLabel>
                  <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as 'Easy' | 'Medium' | 'Hard')}
                    className="w-full bg-[#1A1D27] border border-[#2D3149] rounded-[6px] px-3 py-2 text-sm text-white focus:border-[#6366F1] outline-none"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <FieldLabel htmlFor="time-limit" helpText={ADMIN_PROBLEM_FIELD_HELP.timeLimit} required>
                    Time Limit (ms)
                  </FieldLabel>
                  <Input
                    id="time-limit"
                    type="number"
                    min={1}
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(Number(e.target.value))}
                    className="font-mono text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <FieldLabel htmlFor="memory-limit" helpText={ADMIN_PROBLEM_FIELD_HELP.memoryLimit} required>
                    Memory Limit (MB)
                  </FieldLabel>
                  <Input
                    id="memory-limit"
                    type="number"
                    min={1}
                    value={memoryLimit}
                    onChange={(e) => setMemoryLimit(Number(e.target.value))}
                    className="font-mono text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recommended-minutes">Recommended (mins)</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#6366F1] pointer-events-none" />
                    <Input
                      id="recommended-minutes"
                      type="number"
                      min={1}
                      value={recommendedMinutes}
                      onChange={(e) => setRecommendedMinutes(e.target.value === '' ? '' : Number(e.target.value))}
                      className="font-mono text-xs pl-9"
                      placeholder="45"
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-[#151824] space-y-4">
              {renderChipEditor(
                'Categorization & Tags',
                tags,
                handleRemoveTag,
                showTagInput,
                setShowTagInput,
                newTagInput,
                setNewTagInput,
                handleAddTag,
                '',
                ADMIN_PROBLEM_FIELD_HELP.tags,
                true,
              )}
              {renderChipEditor(
                'Promo Badges',
                badges,
                handleRemoveBadge,
                showBadgeInput,
                setShowBadgeInput,
                newBadgeInput,
                setNewBadgeInput,
                handleAddBadge,
                'border-[#10B981]/30',
                'Optional highlight labels such as "Top FAANG question" shown on the problem page.',
              )}
            </Card>

            <Card className="p-0 overflow-hidden bg-[#151824]">
              <CardHeader className="px-4 py-3 border-b border-[#2D3149] bg-[#1F1F27]/60 pb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#6366F1]" />
                  <FieldLabel variant="section" helpText={ADMIN_PROBLEM_FIELD_HELP.description} required>
                    Problem Description
                  </FieldLabel>
                </div>
              </CardHeader>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={10}
                className="rounded-none border-0 bg-[#151824] resize-none font-mono text-xs"
                placeholder="Write the full problem statement..."
              />
            </Card>

            <Card className="p-0 overflow-hidden bg-[#151824]">
              <CardHeader className="px-4 py-3 border-b border-[#2D3149] bg-[#1F1F27]/60 flex-row items-center justify-between space-y-0 pb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#7bd0ff]" />
                  <FieldLabel variant="section" helpText={ADMIN_PROBLEM_FIELD_HELP.examples} required>
                    Examples
                  </FieldLabel>
                </div>
                <button type="button" onClick={handleAddExample} className="p-1 hover:bg-[#2D3149] text-[#6366F1] rounded transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                {examples.map((example, index) => (
                  <div key={example.id} className="p-4 bg-[#0F1117] border border-[#2D3149] rounded-lg space-y-3 relative group">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6366F1]">
                        Example {index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveExample(example.id)}
                        className="text-[#908fa0] hover:text-[#EF4444] opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <FieldLabel helpText={ADMIN_PROBLEM_FIELD_HELP.exampleInput} required>
                        Input
                      </FieldLabel>
                      <Input
                        value={example.input}
                        onChange={(e) =>
                          setExamples(examples.map((ex) => (ex.id === example.id ? { ...ex, input: e.target.value } : ex)))
                        }
                        placeholder="height = [0,1,0,2,1,0,1,3,2,1,2,1]"
                        className="font-mono text-xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <FieldLabel helpText={ADMIN_PROBLEM_FIELD_HELP.exampleOutput} required>
                        Output
                      </FieldLabel>
                      <Input
                        value={example.output}
                        onChange={(e) =>
                          setExamples(examples.map((ex) => (ex.id === example.id ? { ...ex, output: e.target.value } : ex)))
                        }
                        placeholder="6"
                        className="font-mono text-xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Explanation (optional)</Label>
                      <Textarea
                        value={example.explanation}
                        onChange={(e) =>
                          setExamples(examples.map((ex) => (ex.id === example.id ? { ...ex, explanation: e.target.value } : ex)))
                        }
                        rows={2}
                        placeholder="Explain why this output is correct..."
                        className="font-mono text-xs resize-none"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StringListEditor
                label="Constraints"
                icon={<ListChecks className="h-4 w-4 text-[#7bd0ff]" />}
                items={constraints}
                onChange={setConstraints}
                placeholder="1 <= n <= 2 * 10^4"
                emptyHint="Add input/output limits shown on the problem page."
                helpText={ADMIN_PROBLEM_FIELD_HELP.constraints}
                required
              />
              <StringListEditor
                label="Hints"
                icon={<Lightbulb className="h-4 w-4 text-[#d97721]" />}
                items={hints}
                onChange={setHints}
                placeholder="Think about the max height to the left and right..."
                emptyHint="Add progressive hints to guide candidates."
                helpText={ADMIN_PROBLEM_FIELD_HELP.hints}
                required
              />
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <Card className="p-4 bg-[#151824] space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <ImageIcon className="h-4 w-4 text-[#6366F1]" />
                <Label htmlFor="image-url">Hero Image URL</Label>
              </div>
              <Input
                id="image-url"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="text-xs"
              />
              <p className="text-[10px] text-[#908fa0]">Optional illustration shown at the top of the problem page.</p>
            </Card>

            <Card className="p-0 overflow-hidden bg-[#151824] h-[360px] flex flex-col">
              <div className="flex items-center justify-between border-b border-[#2D3149] bg-[#1F1F27]/60 px-4 py-2">
                <FieldLabel variant="section" helpText={ADMIN_PROBLEM_FIELD_HELP.starterCode}>
                  Starter Code
                </FieldLabel>
              </div>
              <div className="flex items-center border-b border-[#2D3149] bg-[#1F1F27]/60">
                {(['Python', 'Java', 'C++', 'JavaScript'] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
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
              <Textarea
                value={codeSnippets[activeLang]}
                onChange={(e) => setCodeSnippets((prev) => ({ ...prev, [activeLang]: e.target.value }))}
                className="flex-grow rounded-none border-0 bg-[#0F1117] text-[11px] font-mono text-[#7bd0ff] resize-none min-h-0"
                placeholder={`Starter code for ${activeLang}...`}
              />
              <div className="p-2 border-t border-[#2D3149] bg-[#1F1F27]/60 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCodeSnippets((prev) => ({ ...prev, [activeLang]: '' }))}
                  className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#6366F1] hover:underline flex items-center gap-1.5"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Clear</span>
                </button>
              </div>
            </Card>

            <Card className="p-0 overflow-hidden bg-[#151824]">
              <CardHeader className="px-4 py-3 border-b border-[#2D3149] flex-row items-center justify-between space-y-0 pb-3">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-[#10B981]" />
                  <FieldLabel variant="section" helpText={ADMIN_PROBLEM_FIELD_HELP.testCases} required>
                    Test Cases
                  </FieldLabel>
                </div>
                <button type="button" onClick={handleAddTestCase} className="p-1 hover:bg-[#2D3149] text-[#6366F1] rounded transition-colors">
                  <Plus className="h-4.5 w-4.5" />
                </button>
              </CardHeader>
              <CardContent className="p-4 space-y-4 max-h-[320px] overflow-y-auto custom-scrollbar">
                {testCases.map((tc, index) => (
                  <div key={tc.id} className="p-3 bg-[#0F1117] rounded border border-[#2D3149] space-y-2 relative group">
                    <div className="flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => handleTogglePublic(tc.id)}
                        className={`text-[9px] font-mono font-bold uppercase flex items-center gap-1.5 ${
                          tc.isPublic ? 'text-[#7bd0ff]' : 'text-[#d97721]'
                        }`}
                      >
                        {tc.isPublic ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                        <span>Case {index + 1} ({tc.isPublic ? 'Public' : 'Hidden'})</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveTestCase(tc.id)}
                        className="text-[#908fa0] hover:text-[#EF4444] opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="space-y-1">
                      <FieldLabel helpText={ADMIN_PROBLEM_FIELD_HELP.testCaseInput} required>
                        Input
                      </FieldLabel>
                      <Input
                        value={tc.input}
                        onChange={(e) =>
                          setTestCases(testCases.map((x) => (x.id === tc.id ? { ...x, input: e.target.value } : x)))
                        }
                        className="text-[10px] font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <FieldLabel helpText={ADMIN_PROBLEM_FIELD_HELP.testCaseOutput} required>
                        Expected Output
                      </FieldLabel>
                      <Input
                        value={tc.output}
                        onChange={(e) =>
                          setTestCases(testCases.map((x) => (x.id === tc.id ? { ...x, output: e.target.value } : x)))
                        }
                        className="text-[10px] font-mono"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
    </TooltipProvider>
  );
};

export default AdminAddEditProblemPage;
