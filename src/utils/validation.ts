import type { TaskFormData, TaskFormErrors } from "../types/task";
import { isValidDueDate } from "./date";

export function validateTaskForm(data: TaskFormData): TaskFormErrors {
  const errors: TaskFormErrors = {};

  if (!data.title.trim()) {
    errors.title = "Title is required";
  }

  if (!data.dueDate) {
    errors.dueDate = "Due date is required";
  } else if (!isValidDueDate(data.dueDate)) {
    errors.dueDate = "Due date is invalid";
  }

  return errors;
}

export function hasFormErrors(errors: TaskFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
