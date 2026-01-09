import api from "../services/api";

export default function TaskItem({ task, fetchTasks }) {
  const toggleStatus = async () => {
    await api.put(`/tasks/${task._id}`, {
      completed: !task.completed,
    });
    fetchTasks();
  };

  const deleteTask = async () => {
    await api.delete(`/tasks/${task._id}`);
    fetchTasks();
  };

  return (
    <div className="flex justify-between items-center bg-white/30 p-3 rounded-lg mb-2">
      <div>
        <h3
          className={`font-semibold ${
            task.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {task.title}
        </h3>
        <p className="text-sm">{task.description}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={toggleStatus}
          className="px-2 py-1 bg-green-500 text-white rounded"
        >
          ✓
        </button>
        <button
          onClick={deleteTask}
          className="px-2 py-1 bg-red-500 text-white rounded"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
