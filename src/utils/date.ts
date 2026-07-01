export function formatDueDate(dateString: string): string {
  const date = parseDate(dateString);
  if (!date) return dateString;

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function parseDate(dateString: string): Date | null {
  if (!dateString) return null;
  const date = new Date(dateString + "T00:00:00");
  return Number.isNaN(date.getTime()) ? null : date;
}

export function isValidDueDate(dateString: string): boolean {
  return parseDate(dateString) !== null;
}

export function compareDueDates(a: string, b: string): number {
  const dateA = parseDate(a);
  const dateB = parseDate(b);
  if (!dateA || !dateB) return 0;
  return dateA.getTime() - dateB.getTime();
}
