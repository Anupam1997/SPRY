# SPRY Therapeutics — Task Management Dashboard

A production-quality recruitment assignment demonstrating modern React patterns for managing tasks with filtering, sorting, persistence, and routing.

## Project Overview

This dashboard lets users view, create, edit, delete, filter, and sort tasks. Data persists in the browser via `localStorage`, and the UI is fully responsive across mobile, tablet, and desktop.

## Features

- **Task CRUD** — Add, edit, and delete tasks with inline validation
- **Task display** — Reusable `TaskCard` components with status badges and due dates
- **Filtering** — Filter by All, Pending, In Progress, or Completed
- **Sorting** — Sort by due date (earliest or latest first)
- **Summary cards** — Total, pending, in-progress, and completed counts
- **Routing** — `/tasks` (all tasks), `/completed` (completed only), `/` redirects to `/tasks`
- **Persistence** — Tasks saved to `localStorage` with seed data on first visit
- **Modals** — Add/edit via modal form; delete with confirmation dialog
- **Empty states** — Graceful messaging when no tasks match filters

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 + TypeScript | UI and type safety |
| Vite | Build tooling and dev server |
| Context API + `useReducer` | Global state management |
| React Router DOM | Client-side routing |
| CSS Modules | Scoped, maintainable styles |
| localStorage | Client-side persistence |

## Setup

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

### Other Commands

```bash
npm run build    # Production build
npm run preview  # Preview production build
```

## Project Structure

```
src/
├── main.tsx                 # App entry with router
├── App.tsx                  # Route definitions
├── types/task.ts            # Shared TypeScript types
├── context/TaskContext.tsx  # State management (reducer + provider)
├── hooks/useTasks.ts        # Context consumer hook
├── utils/
│   ├── storage.ts           # localStorage helpers + seed data
│   ├── date.ts              # Date formatting and validation
│   ├── selectors.ts         # Derived filter/sort/summary logic
│   └── validation.ts        # Form validation
├── components/
│   ├── Layout/              # Header and navigation
│   ├── SummaryCards/        # Dashboard metrics
│   ├── TaskCard/            # Individual task display
│   ├── TaskForm/            # Reusable add/edit form
│   ├── TaskModal/           # Modal wrapper
│   ├── TaskFilters/         # Filter, sort, and add controls
│   ├── TaskList/            # Composed task list view
│   ├── EmptyState/          # No-results placeholder
│   └── ConfirmDialog/       # Delete confirmation
├── pages/
│   ├── AllTasksPage.tsx
│   └── CompletedTasksPage.tsx
└── styles/global.css
```

## Architectural Decisions

1. **Context + useReducer over Redux** — Sufficient for this app's scope without extra dependencies. Actions are explicit and the reducer keeps state transitions predictable.

2. **Derived selectors in `utils/selectors.ts`** — Filtering, sorting, and summary counts are computed from state rather than stored separately, avoiding sync bugs.

3. **Business logic outside UI** — Validation, date handling, storage, and selectors live in `utils/`, keeping components focused on rendering and user interaction.

4. **Shared `TaskListView` component** — Both pages reuse the same list logic (modals, delete flow, empty states) with a `completedOnly` flag to reduce duplication.

5. **CSS Modules** — Scoped styles without a CSS-in-JS runtime. Class names are co-located with components for maintainability.

6. **Loading-safe storage** — `loadTasks` and `saveTasks` wrap `localStorage` in try/catch to handle private browsing and quota errors gracefully.

## Trade-offs

| Decision | Benefit | Cost |
|---|---|---|
| No backend | Simple setup, no API layer | No multi-device sync or auth |
| Client-only persistence | Instant saves, works offline | Data lost if storage is cleared |
| Single shared list view | Less code duplication | Pages are thin wrappers |
| CSS Modules over a UI library | Full design control, no bundle bloat | More custom styling work |

## Possible Improvements

- Unit and integration tests (Vitest + React Testing Library)
- Drag-and-drop task reordering
- Search by title/description
- Due date reminders and overdue highlighting
- Dark mode theme toggle
- Export/import tasks as JSON
- Optimistic UI updates with error rollback
- Backend API with user authentication for team collaboration

---

