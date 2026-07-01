import { TaskListView } from "../components/TaskList/TaskListView";

export function AllTasksPage() {
  return (
    <TaskListView
      emptyTitle="No tasks found"
      emptyDescription="Get started by adding your first task or adjust your filters to see more results."
    />
  );
}
