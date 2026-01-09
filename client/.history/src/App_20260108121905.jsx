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
  <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 p-6 flex items-center">
    <div className="w-full max-w-6xl mx-auto bg-white/40 backdrop-blur-lg rounded-2xl shadow-xl p-8">

      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Task Manager
      </h1>

      {/* INNER LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* LEFT BIG SECTION */}
        <div className="md:col-span-3">
          <TaskForm fetchTasks={fetchTasks} />
          <TaskList tasks={tasks} fetchTasks={fetchTasks} />
        </div>

        {/* RIGHT SUMMARY (VERTICALLY CENTERED) */}
        <div className="flex items-center">
          <div className="w-full space-y-4">

            <div className="bg-white rounded-xl p-4 shadow text-center">
              <p className="text-gray-500">Total Tasks</p>
              <p className="text-3xl font-bold text-gray-800">
                {tasks.length}
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow text-center">
              <p className="text-gray-500">Completed</p>
              <p className="text-3xl font-bold text-green-600">
                {completed}
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow text-center">
              <p className="text-gray-500">Pending</p>
              <p className="text-3xl font-bold text-red-600">
                {pending}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
);

}
