import { lazy, Suspense } from 'react';
import { ChevronDown, Lightbulb, Loader2, Play, RotateCcw, Send } from 'lucide-react';
import clsx from 'clsx';
import { usePracticeSession } from '../../context/PracticeSessionContext';
import { EDITOR_LANGUAGES, LANGUAGE_LABELS } from '../../constants/editorLanguages';
import { EDITOR_FILE_NAMES } from '../../lib/monaco';
import { Button } from '../ui/Button';

const MonacoEditorPanel = lazy(() =>
  import('./MonacoEditorPanel').then((module) => ({ default: module.MonacoEditorPanel })),
);

export function PracticeCodeEditor() {
  const {
    language,
    code,
    hintsVisible,
    isRunning,
    isSubmitting,
    setLanguage,
    setCode,
    setHintsVisible,
    resetCode,
    runCode,
    submitCode,
  } = usePracticeSession();

  return (
    <section className="flex-1 flex flex-col border-r border-[#2D3149] bg-[#0F1117] min-h-0">
      <div className="h-10 border-b border-[#2D3149] flex items-center justify-between px-4 bg-[#151824] select-none">
        <div className="flex items-center gap-4">
          <div className="relative flex items-center gap-1.5 text-[#e4e1ed]">
            <span className="font-mono text-xs font-semibold">{EDITOR_FILE_NAMES[language]}</span>
            <ChevronDown className="h-3 w-3 text-[#908fa0]" />
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value as typeof language)}
              className="absolute inset-0 opacity-0 cursor-pointer"
              aria-label="Select language"
            >
              {EDITOR_LANGUAGES.map((option) => (
                <option key={option} value={option}>
                  {LANGUAGE_LABELS[option]}
                </option>
              ))}
            </select>
          </div>
          <div className="h-4 w-px bg-[#2D3149]" />
          <span className="text-[#908fa0] font-mono text-[10px] uppercase tracking-wider">
            {LANGUAGE_LABELS[language]}
          </span>
          {language !== 'JavaScript' && (
            <span className="text-[10px] font-mono text-[#d97721] uppercase tracking-wider">
              Run requires JavaScript
            </span>
          )}
        </div>
        <div className="flex items-center gap-4 text-[#908fa0] font-mono text-[10px] uppercase tracking-wider">
          <span>Spaces: 2</span>
          <span>UTF-8</span>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        <Suspense
          fallback={
            <div className="flex h-full items-center justify-center bg-[#0F1117] text-[#908fa0]">
              <Loader2 className="h-5 w-5 animate-spin text-[#6366F1]" />
            </div>
          }
        >
          <MonacoEditorPanel
            language={language}
            value={code}
            onChange={setCode}
            readOnly={isRunning || isSubmitting}
          />
        </Suspense>
      </div>

      <div className="h-14 border-t border-[#2D3149] flex items-center justify-between px-4 bg-[#151824] select-none">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setHintsVisible(!hintsVisible)}
            className="flex items-center gap-2 text-[#908fa0] hover:text-white transition-colors text-[11px] font-semibold uppercase tracking-wider"
          >
            <Lightbulb className="h-4 w-4 text-[#d97721]" />
            <span>Hints</span>
            <div
              className={clsx(
                'w-8 h-4.5 rounded-full p-0.5 transition-colors',
                hintsVisible ? 'bg-[#6366F1]' : 'bg-[#2D3149]',
              )}
            >
              <div
                className={clsx(
                  'w-3.5 h-3.5 bg-white rounded-full transition-transform duration-200',
                  hintsVisible ? 'translate-x-3.5' : 'translate-x-0',
                )}
              />
            </div>
          </button>

          <button
            type="button"
            onClick={resetCode}
            className="flex items-center gap-1.5 text-[#908fa0] hover:text-white transition-colors text-[11px] font-semibold uppercase tracking-wider ml-4"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={runCode}
            disabled={isRunning || isSubmitting}
            className="h-9 px-4 text-xs border-[#2D3149] hover:bg-[#22263A] gap-1.5"
          >
            {isRunning ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Play className="h-3.5 w-3.5" />
            )}
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </Button>
          <Button
            onClick={submitCode}
            disabled={isRunning || isSubmitting}
            className="h-9 px-4 text-xs gap-1.5 font-bold shadow-[0px_0px_12px_rgba(99,102,241,0.25)]"
          >
            {isSubmitting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Send className="h-3.5 w-3.5" />
            )}
            <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default PracticeCodeEditor;
