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
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-600 to-gray-700 p-6">
      <div className="max-w-7xl mx-auto text-white">
        <h1 className="text-3xl font-bold text-center mb-8">
          Task Manager
        </h1>

        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <p className="text-sm opacity-90 mb-1">Total Tasks</p>
            <p className="text-3xl font-bold">{tasks.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <p className="text-sm opacity-90 mb-1">Completed</p>
            <p className="text-3xl font-bold">{completed}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <p className="text-sm opacity-90 mb-1">Pending</p>
            <p className="text-3xl font-bold">{pending}</p>
          </div>
        </div>

        <div className="max-w-xl mx-auto">
          <TaskForm fetchTasks={fetchTasks} />
          <TaskList tasks={tasks} fetchTasks={fetchTasks} />
        </div>
      </div>
    </div>
  );
}
