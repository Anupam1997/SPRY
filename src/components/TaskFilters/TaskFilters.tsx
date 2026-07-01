import type { SortOrder, StatusFilter } from "../../types/task";
import styles from "./TaskFilters.module.css";

type TaskFiltersProps = {
  statusFilter: StatusFilter;
  sortOrder: SortOrder;
  onStatusFilterChange: (filter: StatusFilter) => void;
  onSortOrderChange: (order: SortOrder) => void;
  showStatusFilter?: boolean;
  onAddTask: () => void;
};

const STATUS_OPTIONS: StatusFilter[] = [
  "All",
  "Pending",
  "In Progress",
  "Completed",
];

export function TaskFilters({
  statusFilter,
  sortOrder,
  onStatusFilterChange,
  onSortOrderChange,
  showStatusFilter = true,
  onAddTask,
}: TaskFiltersProps) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.controls}>
        {showStatusFilter && (
          <div className={styles.control}>
            <label htmlFor="status-filter">Filter by status</label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) =>
                onStatusFilterChange(e.target.value as StatusFilter)
              }
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={styles.control}>
          <label htmlFor="sort-order">Sort by due date</label>
          <select
            id="sort-order"
            value={sortOrder}
            onChange={(e) => onSortOrderChange(e.target.value as SortOrder)}
          >
            <option value="asc">Earliest first</option>
            <option value="desc">Latest first</option>
          </select>
        </div>
      </div>

      <button type="button" className={styles.addButton} onClick={onAddTask}>
        + Add Task
      </button>
    </div>
  );
}
