import type { EditorLanguage } from '../types/practice.types';
import type { editor } from 'monaco-editor';

export const COMPILE_IO_THEME = 'compile-io-dark';

export const MONACO_LANGUAGE_IDS: Record<EditorLanguage, string> = {
  JavaScript: 'javascript',
  Python: 'python',
  Java: 'java',
  'C++': 'cpp',
};

export const EDITOR_FILE_NAMES: Record<EditorLanguage, string> = {
  JavaScript: 'solution.js',
  Python: 'solution.py',
  Java: 'Solution.java',
  'C++': 'solution.cpp',
};

export const DEFAULT_MONACO_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  fontSize: 12,
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  lineHeight: 22,
  scrollBeyondLastLine: false,
  automaticLayout: true,
  tabSize: 2,
  insertSpaces: true,
  wordWrap: 'off',
  padding: { top: 16, bottom: 16 },
  renderLineHighlight: 'line',
  scrollbar: {
    verticalScrollbarSize: 8,
    horizontalScrollbarSize: 8,
  },
  overviewRulerLanes: 0,
  hideCursorInOverviewRuler: true,
  overviewRulerBorder: false,
};

let themeRegistered = false;

export function configureMonaco(monaco: typeof import('monaco-editor')) {
  if (themeRegistered) {
    return;
  }

  monaco.editor.defineTheme(COMPILE_IO_THEME, {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '908fa0', fontStyle: 'italic' },
      { token: 'keyword', foreground: '6366F1', fontStyle: 'bold' },
      { token: 'string', foreground: '10B981' },
      { token: 'number', foreground: 'd97721' },
      { token: 'type', foreground: '00a6e0' },
      { token: 'function', foreground: 'e4e1ed' },
    ],
    colors: {
      'editor.background': '#0F1117',
      'editor.foreground': '#e4e1ed',
      'editorLineNumber.foreground': '#908fa066',
      'editorLineNumber.activeForeground': '#908fa0',
      'editor.selectionBackground': '#6366F14D',
      'editor.lineHighlightBackground': '#1E223580',
      'editorCursor.foreground': '#6366F1',
      'editorIndentGuide.background': '#2D314980',
      'editorIndentGuide.activeBackground': '#2D3149',
      'editorWidget.background': '#151824',
      'editorWidget.border': '#2D3149',
      'scrollbarSlider.background': '#2D314980',
      'scrollbarSlider.hoverBackground': '#6366F140',
      'scrollbarSlider.activeBackground': '#6366F166',
    },
  });

  themeRegistered = true;
}
