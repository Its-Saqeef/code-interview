import Editor, { type OnMount } from '@monaco-editor/react';
import { Loader2 } from 'lucide-react';
import {
  COMPILE_IO_THEME,
  configureMonaco,
  DEFAULT_MONACO_OPTIONS,
  MONACO_LANGUAGE_IDS,
} from '../../lib/monaco';
import type { EditorLanguage } from '../../types/practice.types';

interface MonacoEditorPanelProps {
  language: EditorLanguage;
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

export function MonacoEditorPanel({
  language,
  value,
  onChange,
  readOnly = false,
}: MonacoEditorPanelProps) {
  const handleMount: OnMount = (_editor, monaco) => {
    configureMonaco(monaco);
    monaco.editor.setTheme(COMPILE_IO_THEME);
  };

  return (
    <Editor
      height="100%"
      language={MONACO_LANGUAGE_IDS[language]}
      value={value}
      onChange={(nextValue) => onChange(nextValue ?? '')}
      theme={COMPILE_IO_THEME}
      options={{ ...DEFAULT_MONACO_OPTIONS, readOnly }}
      onMount={handleMount}
      loading={
        <div className="flex h-full items-center justify-center bg-[#0F1117] text-[#908fa0]">
          <Loader2 className="h-5 w-5 animate-spin text-[#6366F1]" />
        </div>
      }
    />
  );
}

export default MonacoEditorPanel;
