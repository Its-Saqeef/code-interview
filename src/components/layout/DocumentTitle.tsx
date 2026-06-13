import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { formatDocumentTitle } from '../../constants/site';
import { getTitleForPathname } from '../../constants/routeTitles';

export function DocumentTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = formatDocumentTitle(getTitleForPathname(pathname));
  }, [pathname]);

  return null;
}

export default DocumentTitle;
