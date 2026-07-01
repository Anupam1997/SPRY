import { TaskListView } from "../components/TaskList/TaskListView";

export function CompletedTasksPage() {
  return (
    <TaskListView
      completedOnly
      emptyTitle="No completed tasks"
      emptyDescription="Tasks marked as completed will appear here. Finish a task to see it in this view."
    />
  );
}
