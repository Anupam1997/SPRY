import { useEffect, useRef, type ReactNode } from "react";
import styles from "./TaskModal.module.css";

type TaskModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export function TaskModal({ isOpen, title, onClose, children }: TaskModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      role="presentation"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 id="task-modal-title" className={styles.title}>
            {title}
          </h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
