import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import api from "./services/api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);
  const [filter, setFilter] = useState("all"); // all, completed, pending

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);

      const completedCount = res.data.filter((t) => t.completed).length;
      setCompleted(completedCount);
      setPending(res.data.length - completedCount);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter tasks based on filter state
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; // all
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 p-6 flex items-center font-sans">
      <div className="w-full max-w-6xl mx-auto bg-white/40 backdrop-blur-lg rounded-2xl shadow-xl p-8">

        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center tracking-wide">
          Task Manager
        </h1>

        {/* INNER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* LEFT BIG SECTION */}
          <div className="md:col-span-3">
            
            {/* Filter Buttons */}
            <div className="flex gap-2 mb-4 justify-start">
              {["all", "completed", "pending"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`
                    px-3 py-1 rounded-lg font-semibold text-sm
                    transition duration-200
                    ${
                      filter === f
                        ? "bg-gray-800 text-white shadow"
                        : "bg-white/30 text-gray-800 hover:bg-white/50"
                    }
                  `}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            {/* Task Form */}
            <TaskForm fetchTasks={fetchTasks} />

            {/* Task List */}
            {filteredTasks.length > 0 ? (
              <div className="space-y-3 transition-all duration-300">
                <TaskList tasks={filteredTasks} fetchTasks={fetchTasks} />
              </div>
            ) : (
              <p className="text-center text-gray-500 text-lg mt-6">
                No tasks found for this filter 😅
              </p>
            )}

          </div>

          {/* RIGHT SUMMARY (VERTICALLY CENTERED) */}
          <div className="flex items-center">
            <div className="w-full space-y-4">
              <div className="bg-white rounded-xl p-4 shadow text-center">
                <p className="text-gray-500 uppercase tracking-wide">Total Tasks</p>
                <p className="text-3xl font-bold text-gray-800">{tasks.length}</p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow text-center">
                <p className="text-gray-500 uppercase tracking-wide">Completed</p>
                <p className="text-3xl font-bold text-green-600">{completed}</p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow text-center">
                <p className="text-gray-500 uppercase tracking-wide">Pending</p>
                <p className="text-3xl font-bold text-red-600">{pending}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
