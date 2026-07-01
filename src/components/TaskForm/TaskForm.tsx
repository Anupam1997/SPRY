import { useEffect, useState, type FormEvent } from "react";
import type { Task, TaskFormData, TaskFormErrors, TaskStatus } from "../../types/task";
import { hasFormErrors, validateTaskForm } from "../../utils/validation";
import styles from "./TaskForm.module.css";

type TaskFormProps = {
  initialTask?: Task;
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
  submitLabel?: string;
};

const STATUS_OPTIONS: TaskStatus[] = ["Pending", "In Progress", "Completed"];

const emptyForm: TaskFormData = {
  title: "",
  description: "",
  status: "Pending",
  dueDate: "",
};

export function TaskForm({
  initialTask,
  onSubmit,
  onCancel,
  submitLabel = "Save Task",
}: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>(emptyForm);
  const [errors, setErrors] = useState<TaskFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof TaskFormData, boolean>>>({});

  useEffect(() => {
    if (initialTask) {
      setFormData({
        title: initialTask.title,
        description: initialTask.description,
        status: initialTask.status,
        dueDate: initialTask.dueDate,
      });
    } else {
      setFormData(emptyForm);
    }
    setErrors({});
    setTouched({});
  }, [initialTask]);

  const handleChange = (
    field: keyof TaskFormData,
    value: string
  ) => {
    const nextData = { ...formData, [field]: value };
    setFormData(nextData);
    if (touched[field]) {
      setErrors(validateTaskForm(nextData));
    }
  };

  const handleBlur = (field: keyof TaskFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validateTaskForm(formData));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const validationErrors = validateTaskForm(formData);
    setErrors(validationErrors);
    setTouched({ title: true, dueDate: true });

    if (hasFormErrors(validationErrors)) return;
    onSubmit(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="task-title">Title</label>
        <input
          id="task-title"
          type="text"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          onBlur={() => handleBlur("title")}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? "task-title-error" : undefined}
          placeholder="Enter task title"
        />
        {errors.title && (
          <span id="task-title-error" className={styles.error} role="alert">
            {errors.title}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Optional description"
          rows={3}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="task-status">Status</label>
          <select
            id="task-status"
            value={formData.status}
            onChange={(e) => handleChange("status", e.target.value)}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="task-due-date">Due Date</label>
          <input
            id="task-due-date"
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
            onBlur={() => handleBlur("dueDate")}
            aria-invalid={Boolean(errors.dueDate)}
            aria-describedby={errors.dueDate ? "task-due-date-error" : undefined}
          />
          {errors.dueDate && (
            <span id="task-due-date-error" className={styles.error} role="alert">
              {errors.dueDate}
            </span>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className={styles.submitButton}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
