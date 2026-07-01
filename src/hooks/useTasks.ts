import { useContext } from "react";
import { TaskContext, type TaskContextValue } from "../context/TaskContext";

export function useTasks(): TaskContextValue {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}
