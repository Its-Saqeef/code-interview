import { useEffect } from 'react';
import { formatDocumentTitle } from '../constants/site';

/** Sets document.title when `title` is provided. Route-level titles apply otherwise. */
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    if (title === undefined) return;
    document.title = formatDocumentTitle(title);
  }, [title]);
}
