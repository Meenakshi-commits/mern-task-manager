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
      <div className="max-w-6xl mx-auto text-white">
        <div className="flex justify-between items-start gap-8 mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-8">
              Task Manager
            </h1>
            <div className="max-w-xl">
              <TaskForm fetchTasks={fetchTasks} />
              <TaskList tasks={tasks} fetchTasks={fetchTasks} />
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-lg w-64">
            <h2 className="text-lg font-semibold mb-4 text-center">Statistics</h2>
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg">
                <p className="text-sm opacity-90">Total Tasks</p>
                <p className="text-3xl font-bold">{tasks.length}</p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg">
                <p className="text-sm opacity-90">Completed</p>
                <p className="text-3xl font-bold">{completed}</p>
              </div>
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-lg">
                <p className="text-sm opacity-90">Pending</p>
                <p className="text-3xl font-bold">{pending}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
