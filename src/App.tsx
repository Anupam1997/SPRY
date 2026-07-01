import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { TaskProvider } from "./context/TaskContext";
import { AllTasksPage } from "./pages/AllTasksPage";
import { CompletedTasksPage } from "./pages/CompletedTasksPage";

export default function App() {
  return (
    <TaskProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/tasks" replace />} />
          <Route path="tasks" element={<AllTasksPage />} />
          <Route path="completed" element={<CompletedTasksPage />} />
        </Route>
      </Routes>
    </TaskProvider>
  );
}
