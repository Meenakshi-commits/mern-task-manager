import { useEffect, useState } from "react";
import api from "./services/api";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title.trim()) return;
    await api.post("/tasks", { title, description, completed: false });
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const isCompleted = Boolean(task.completed);
    if (filter === "completed") return isCompleted;
    if (filter === "pending") return !isCompleted;
    return true;
  });

  const total = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = total - completedCount;

  return (
    <div className="min-h-screen bg-gray-200 p-5 font-sans">
      <h1 className="text-3xl font-bold text-center mb-5">MERN Task Manager</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Box: Tasks */}
        <div className="flex-1 max-w-xl mx-auto bg-gray-100/30 backdrop-blur-lg p-6 rounded-xl shadow-lg">
          {/* Add Task */}
          <div className="flex flex-col gap-2 mb-4">
            <input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 rounded border"
            />
            <textarea
              placeholder="Task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 rounded border"
            />
            <button
              onClick={addTask}
              className="self-start bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
            >
              Add Task
            </button>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-4">
            {["all", "completed", "pending"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                  filter === f
                    ? "bg-gray-800 text-white shadow"
                    : "bg-white/30 text-gray-800 hover:bg-white/50"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Task List */}
          <TaskList tasks={filteredTasks} fetchTasks={fetchTasks} />
        </div>

        {/* Right Box: Summary */}
        <div className="w-48 bg-gray-100/30 backdrop-blur-lg p-4 rounded-xl shadow-lg flex flex-col justify-center items-center gap-3">
          <h2 className="text-lg font-bold mb-2">Task Summary</h2>
          <p>Total: {total}</p>
          <p>Completed: {completedCount}</p>
          <p>Pending: {pendingCount}</p>
        </div>
      </div>
    </div>
  );
}
