import { useState } from "react";
import api from "../services/api";

export default function TaskItem({ task, fetchTasks }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

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

  const updateTask = async () => {
    await api.put(`/tasks/${task._id}`, {
      title: editTitle,
      description: editDescription,
    });
    setIsEditing(false);
    fetchTasks();
  };

  if (isEditing) {
    return (
      <div className="bg-white/30 p-3 rounded-lg mb-2">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full mb-2 p-2 rounded text-gray-900"
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="w-full mb-2 p-2 rounded text-gray-900"
        />
        <div className="flex gap-2">
          <button
            onClick={updateTask}
            className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            ✓ Save
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setEditTitle(task.title);
              setEditDescription(task.description);
            }}
            className="flex items-center gap-1 px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            ✕ Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center bg-white/30 p-3 rounded-lg mb-2">
      <div className="flex-1">
        <h3
          className={`font-semibold ${
            task.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {task.title}
        </h3>
        <p className="text-sm">{task.description}</p>
      </div>

      <div className="flex gap-2 ml-4">
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          ✎ Edit
        </button>
        <button
          onClick={toggleStatus}
          className="flex items-center gap-1 px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
        >
          ✓ Completed
        </button>
        <button
          onClick={deleteTask}
          className="flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
        >
          ✕ Delete
        </button>
      </div>
    </div>
  );
}
