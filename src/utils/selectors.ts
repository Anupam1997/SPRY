import type { SortOrder, StatusFilter, Task, TaskSummary } from "../types/task";
import { compareDueDates } from "./date";

export function filterTasksByStatus(
  tasks: Task[],
  statusFilter: StatusFilter
): Task[] {
  if (statusFilter === "All") return tasks;
  return tasks.filter((task) => task.status === statusFilter);
}

export function sortTasksByDueDate(tasks: Task[], sortOrder: SortOrder): Task[] {
  return [...tasks].sort((a, b) => {
    const comparison = compareDueDates(a.dueDate, b.dueDate);
    return sortOrder === "asc" ? comparison : -comparison;
  });
}

export function getTaskSummary(tasks: Task[]): TaskSummary {
  return tasks.reduce<TaskSummary>(
    (summary, task) => {
      summary.total += 1;
      if (task.status === "Pending") summary.pending += 1;
      if (task.status === "In Progress") summary.inProgress += 1;
      if (task.status === "Completed") summary.completed += 1;
      return summary;
    },
    { total: 0, pending: 0, inProgress: 0, completed: 0 }
  );
}

export function getDisplayTasks(
  tasks: Task[],
  statusFilter: StatusFilter,
  sortOrder: SortOrder,
  completedOnly = false
): Task[] {
  const base = completedOnly
    ? tasks.filter((task) => task.status === "Completed")
    : filterTasksByStatus(tasks, statusFilter);

  return sortTasksByDueDate(base, sortOrder);
}
