import type { Task } from "../types/task";

const STORAGE_KEY = "spry-task-dashboard-tasks";

export function loadTasks(): Task[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return null;
    return parsed as Task[];
  } catch {
    return null;
  }
}

export function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Silently fail when storage is unavailable or quota exceeded
  }
}

export function getSeedTasks(): Task[] {
  const now = new Date().toISOString();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);

  return [
    {
      id: crypto.randomUUID(),
      title: "Review candidate applications",
      description: "Screen frontend engineer applicants for the SPRY team.",
      status: "Pending",
      dueDate: tomorrow.toISOString().split("T")[0],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: crypto.randomUUID(),
      title: "Prepare technical interview questions",
      description: "Draft React and TypeScript questions for the next round.",
      status: "In Progress",
      dueDate: nextWeek.toISOString().split("T")[0],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: crypto.randomUUID(),
      title: "Set up development environment",
      description: "Install dependencies and verify the task dashboard runs locally.",
      status: "Completed",
      dueDate: new Date().toISOString().split("T")[0],
      createdAt: now,
      updatedAt: now,
    },
  ];
}
