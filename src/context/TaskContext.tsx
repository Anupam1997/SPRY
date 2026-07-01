import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { SortOrder, StatusFilter, Task, TaskFormData } from "../types/task";
import { getDisplayTasks, getTaskSummary } from "../utils/selectors";
import { getSeedTasks, loadTasks, saveTasks } from "../utils/storage";

type TaskState = {
  tasks: Task[];
  statusFilter: StatusFilter;
  sortOrder: SortOrder;
  isHydrated: boolean;
};

type TaskAction =
  | { type: "HYDRATE"; payload: Task[] }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "UPDATE_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "SET_STATUS_FILTER"; payload: StatusFilter }
  | { type: "SET_SORT_ORDER"; payload: SortOrder };

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, tasks: action.payload, isHydrated: true };
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "SET_STATUS_FILTER":
      return { ...state, statusFilter: action.payload };
    case "SET_SORT_ORDER":
      return { ...state, sortOrder: action.payload };
    default:
      return state;
  }
}

function createTaskFromForm(data: TaskFormData): Task {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    title: data.title.trim(),
    description: data.description.trim(),
    status: data.status,
    dueDate: data.dueDate,
    createdAt: now,
    updatedAt: now,
  };
}

function updateTaskFromForm(task: Task, data: TaskFormData): Task {
  return {
    ...task,
    title: data.title.trim(),
    description: data.description.trim(),
    status: data.status,
    dueDate: data.dueDate,
    updatedAt: new Date().toISOString(),
  };
}

const initialState: TaskState = {
  tasks: [],
  statusFilter: "All",
  sortOrder: "asc",
  isHydrated: false,
};

export type TaskContextValue = {
  tasks: Task[];
  statusFilter: StatusFilter;
  sortOrder: SortOrder;
  isHydrated: boolean;
  summary: ReturnType<typeof getTaskSummary>;
  getFilteredSortedTasks: (completedOnly?: boolean) => Task[];
  addTask: (data: TaskFormData) => void;
  updateTask: (id: string, data: TaskFormData) => void;
  deleteTask: (id: string) => void;
  setStatusFilter: (filter: StatusFilter) => void;
  setSortOrder: (order: SortOrder) => void;
};

export const TaskContext = createContext<TaskContextValue | null>(null);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    const stored = loadTasks();
    const tasks = stored ?? getSeedTasks();
    dispatch({ type: "HYDRATE", payload: tasks });
  }, []);

  useEffect(() => {
    if (!state.isHydrated) return;
    saveTasks(state.tasks);
  }, [state.tasks, state.isHydrated]);

  const addTask = useCallback((data: TaskFormData) => {
    dispatch({ type: "ADD_TASK", payload: createTaskFromForm(data) });
  }, []);

  const updateTask = useCallback((id: string, data: TaskFormData) => {
    const existing = state.tasks.find((task) => task.id === id);
    if (!existing) return;
    dispatch({
      type: "UPDATE_TASK",
      payload: updateTaskFromForm(existing, data),
    });
  }, [state.tasks]);

  const deleteTask = useCallback((id: string) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  }, []);

  const setStatusFilter = useCallback((filter: StatusFilter) => {
    dispatch({ type: "SET_STATUS_FILTER", payload: filter });
  }, []);

  const setSortOrder = useCallback((order: SortOrder) => {
    dispatch({ type: "SET_SORT_ORDER", payload: order });
  }, []);

  const summary = useMemo(
    () => getTaskSummary(state.tasks),
    [state.tasks]
  );

  const getFilteredSortedTasks = useCallback(
    (completedOnly = false) =>
      getDisplayTasks(
        state.tasks,
        state.statusFilter,
        state.sortOrder,
        completedOnly
      ),
    [state.tasks, state.statusFilter, state.sortOrder]
  );

  const value = useMemo<TaskContextValue>(
    () => ({
      tasks: state.tasks,
      statusFilter: state.statusFilter,
      sortOrder: state.sortOrder,
      isHydrated: state.isHydrated,
      summary,
      getFilteredSortedTasks,
      addTask,
      updateTask,
      deleteTask,
      setStatusFilter,
      setSortOrder,
    }),
    [
      state.tasks,
      state.statusFilter,
      state.sortOrder,
      state.isHydrated,
      summary,
      getFilteredSortedTasks,
      addTask,
      updateTask,
      deleteTask,
      setStatusFilter,
      setSortOrder,
    ]
  );

  return (
    <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
  );
}
