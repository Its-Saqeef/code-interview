import { matchPath } from 'react-router-dom';

/** Most specific paths first so dynamic segments match correctly. */
export const ROUTE_TITLES: ReadonlyArray<{ path: string; title: string }> = [
  { path: '/admin/problems/edit/:problemId', title: 'Edit Problem' },
  { path: '/admin/problems/new', title: 'Add Problem' },
  { path: '/admin/dashboard', title: 'Admin Dashboard' },
  { path: '/admin', title: 'Admin Dashboard' },
  { path: '/problems/:problemId', title: 'Problem' },
  { path: '/recap/:recapId', title: 'Session Recap' },
  { path: '/practice/:slug', title: 'Solo Practice' },
  { path: '/room/:roomId', title: 'Interview Room' },
  { path: '/dashboard', title: 'Dashboard' },
  { path: '/problems', title: 'Problems' },
  { path: '/leaderboard', title: 'Leaderboard' },
  { path: '/history', title: 'Session History' },
  { path: '/profile', title: 'Profile' },
  { path: '/settings', title: 'Settings' },
  { path: '/pricing', title: 'Pricing' },
  { path: '/styling', title: 'Design System' },
  { path: '/login', title: 'Log In' },
  { path: '/signup', title: 'Sign Up' },
  { path: '/', title: 'Home' },
];

export function getTitleForPathname(pathname: string) {
  for (const route of ROUTE_TITLES) {
    if (matchPath(route.path, pathname)) {
      return route.title;
    }
  }

  return 'Page Not Found';
}
