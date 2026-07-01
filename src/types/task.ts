export type TaskStatus = "Pending" | "In Progress" | "Completed";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
};

export type StatusFilter = "All" | TaskStatus;

export type SortOrder = "asc" | "desc";

export type TaskFormData = {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
};

export type TaskFormErrors = Partial<Record<keyof TaskFormData, string>>;

export type TaskSummary = {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
};
