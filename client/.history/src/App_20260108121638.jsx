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
  <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 p-6">
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* LEFT SIDE - TASKS */}
      <div className="md:col-span-2 bg-white/40 backdrop-blur-lg p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Task Manager
        </h1>

        <TaskForm fetchTasks={fetchTasks} />
        <TaskList tasks={tasks} fetchTasks={fetchTasks} />
      </div>

      {/* RIGHT SIDE - STATUS PANEL */}
      <div className="bg-white/40 backdrop-blur-lg p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Task Summary
        </h2>

        <div className="space-y-4">
          <div className="p-3 bg-white rounded-lg shadow">
            <p className="text-gray-600">Total Tasks</p>
            <p className="text-2xl font-bold text-gray-800">
              {tasks.length}
            </p>
          </div>

          <div className="p-3 bg-white rounded-lg shadow">
            <p className="text-gray-600">Completed</p>
            <p className="text-2xl font-bold text-green-600">
              {completed}
            </p>
          </div>

          <div className="p-3 bg-white rounded-lg shadow">
            <p className="text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-red-600">
              {pending}
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
);

}
