import { EDITOR_LANGUAGES } from '../constants/editorLanguages';
import type { EditorLanguage } from '../types/practice.types';
import type { StarterCode } from '../types/problem.types';

const DEFAULT_STARTER_TEMPLATES: Record<EditorLanguage, string> = {
  JavaScript: `/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
  // Write your solution here
};
`,
  Python: `def solution(input):
    # Write your solution here
    pass
`,
  Java: `class Solution {
    public Object solution(Object input) {
        // Write your solution here
        return null;
    }
}
`,
  'C++': `class Solution {
public:
    auto solution(auto input) {
        // Write your solution here
    }
};
`,
};

export function getDefaultLanguage(starterCode: StarterCode | null): EditorLanguage {
  if (starterCode?.JavaScript?.trim()) {
    return 'JavaScript';
  }

  if (!starterCode) {
    return 'JavaScript';
  }

  for (const language of EDITOR_LANGUAGES) {
    if (starterCode[language]?.trim()) {
      return language;
    }
  }

  return 'JavaScript';
}

export function getStarterCodeForLanguage(
  starterCode: StarterCode | null,
  language: EditorLanguage,
): string {
  const fromProblem = starterCode?.[language]?.trim();
  if (fromProblem) {
    return fromProblem;
  }

  return DEFAULT_STARTER_TEMPLATES[language];
}
