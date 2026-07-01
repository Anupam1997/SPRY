import type { TaskSummary } from "../../types/task";
import styles from "./SummaryCards.module.css";

type SummaryCardsProps = {
  summary: TaskSummary;
};

const cards = [
  { key: "total" as const, label: "Total Tasks", accent: "total" },
  { key: "pending" as const, label: "Pending", accent: "pending" },
  { key: "inProgress" as const, label: "In Progress", accent: "inProgress" },
  { key: "completed" as const, label: "Completed", accent: "completed" },
];

export function SummaryCards({ summary }: SummaryCardsProps) {
  return (
    <section className={styles.grid} aria-label="Task summary">
      {cards.map((card) => (
        <article
          key={card.key}
          className={`${styles.card} ${styles[card.accent]}`}
        >
          <p className={styles.label}>{card.label}</p>
          <p className={styles.value}>{summary[card.key]}</p>
        </article>
      ))}
    </section>
  );
}
