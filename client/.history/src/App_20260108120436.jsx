import { useEffect, useState } from "react";
import api from "./services/api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.length - completed;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="max-w-xl mx-auto text-white">
        <h1 className="text-3xl font-bold text-center mb-4">
          Task Manager
        </h1>

        <div className="flex justify-between mb-4">
          <span>Total: {tasks.length}</span>
          <span>Completed: {completed}</span>
          <span>Pending: {pending}</span>
        </div>

        <TaskForm fetchTasks={fetchTasks} />
        <TaskList tasks={tasks} fetchTasks={fetchTasks} />
      </div>
    </div>
  );
}
