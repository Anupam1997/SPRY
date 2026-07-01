import { useState } from "react";
import type { Task, TaskFormData } from "../../types/task";
import { useTasks } from "../../hooks/useTasks";
import { ConfirmDialog } from "../ConfirmDialog/ConfirmDialog";
import { EmptyState } from "../EmptyState/EmptyState";
import { SummaryCards } from "../SummaryCards/SummaryCards";
import { TaskCard } from "../TaskCard/TaskCard";
import { TaskFilters } from "../TaskFilters/TaskFilters";
import { TaskForm } from "../TaskForm/TaskForm";
import { TaskModal } from "../TaskModal/TaskModal";
import styles from "./TaskList.module.css";

type TaskListViewProps = {
  completedOnly?: boolean;
  emptyTitle: string;
  emptyDescription: string;
};

export function TaskListView({
  completedOnly = false,
  emptyTitle,
  emptyDescription,
}: TaskListViewProps) {
  const {
    summary,
    statusFilter,
    sortOrder,
    isHydrated,
    getFilteredSortedTasks,
    addTask,
    updateTask,
    deleteTask,
    setStatusFilter,
    setSortOrder,
  } = useTasks();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  const tasks = getFilteredSortedTasks(completedOnly);

  const openAddModal = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const closeFormModal = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleFormSubmit = (data: TaskFormData) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
    } else {
      addTask(data);
    }
    closeFormModal();
  };

  const handleDeleteConfirm = () => {
    if (deletingTask) {
      deleteTask(deletingTask.id);
      setDeletingTask(null);
    }
  };

  if (!isHydrated) {
    return <p role="status">Loading tasks...</p>;
  }

  return (
    <>
      <SummaryCards summary={summary} />

      <TaskFilters
        statusFilter={statusFilter}
        sortOrder={sortOrder}
        onStatusFilterChange={setStatusFilter}
        onSortOrderChange={setSortOrder}
        showStatusFilter={!completedOnly}
        onAddTask={openAddModal}
      />

      {tasks.length === 0 ? (
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          actionLabel="Add Task"
          onAction={openAddModal}
        />
      ) : (
        <div className={styles.taskGrid}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={openEditModal}
              onDelete={setDeletingTask}
            />
          ))}
        </div>
      )}

      <TaskModal
        isOpen={isFormOpen}
        title={editingTask ? "Edit Task" : "Add Task"}
        onClose={closeFormModal}
      >
        <TaskForm
          initialTask={editingTask ?? undefined}
          onSubmit={handleFormSubmit}
          onCancel={closeFormModal}
          submitLabel={editingTask ? "Update Task" : "Create Task"}
        />
      </TaskModal>

      <ConfirmDialog
        isOpen={Boolean(deletingTask)}
        title="Delete Task"
        message={`Are you sure you want to delete "${deletingTask?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingTask(null)}
      />
    </>
  );
}
