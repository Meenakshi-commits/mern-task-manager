import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { getTasks, addTask, deleteTask,updateTask} from "./services/api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTask = async () => {
    if (!description.trim()) return;
    try {
      const res = await addTask({ description, completed: false });
      setTasks([...tasks, res.data]);
      setDescription("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5 font-sans">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">

        {/* Left Box - Task List */}
        <div className="flex-1 bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Task Manager</h2>

          {/* TaskForm Component */}
          <TaskForm
            description={description}
            setDescription={setDescription}
            handleAddTask={handleAddTask}
          />

          <TaskList tasks={tasks} onDelete={handleDeleteTask} />
        </div>

        {/* Right Box - Summary */}
        <div className="w-64 bg-gradient-to-b from-gray-200 to-gray-300 p-6 rounded-xl shadow-lg flex flex-col justify-center items-center">
          <h3 className="text-xl font-semibold mb-4">Summary</h3>
          <p className="text-gray-700 mb-2">Total: {tasks.length}</p>
          <p className="text-gray-700 mb-2">Pending: {pendingCount}</p>
          <p className="text-gray-700">Completed: {completedCount}</p>
        </div>

      </div>
    </div>
  );
}
