export function formatAcceptanceDisplay(rate: number | null | undefined): string {
  if (rate === null || rate === undefined) return '—';
  return `${rate}%`;
}

export function formatSubmissionCount(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1)}K`;
  }
  return String(count);
}
