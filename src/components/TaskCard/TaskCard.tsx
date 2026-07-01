import type { Task } from "../../types/task";
import { formatDueDate } from "../../utils/date";
import styles from "./TaskCard.module.css";

type TaskCardProps = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

const statusClassMap = {
  Pending: styles.statusPending,
  "In Progress": styles.statusInProgress,
  Completed: styles.statusCompleted,
} as const;

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const isCompleted = task.status === "Completed";

  return (
    <article
      className={`${styles.card} ${isCompleted ? styles.completed : ""}`}
      aria-label={`Task: ${task.title}`}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>{task.title}</h3>
        <span className={`${styles.badge} ${statusClassMap[task.status]}`}>
          {task.status}
        </span>
      </div>

      {task.description && (
        <p className={styles.description}>{task.description}</p>
      )}

      <p className={styles.dueDate}>
        <span className={styles.dueLabel}>Due:</span>{" "}
        {formatDueDate(task.dueDate)}
      </p>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.editButton}
          onClick={() => onEdit(task)}
        >
          Edit
        </button>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={() => onDelete(task)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
