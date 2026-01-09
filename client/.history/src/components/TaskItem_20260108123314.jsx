import { useState } from "react";
import api from "../services/api";

export default function TaskItem({ task, fetchTasks }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const toggleStatus = async () => {
    setLoadingStatus(true);
    try {
      await api.put(`/tasks/${task._id}`, { completed: !task.completed });
      fetchTasks();
    } finally {
      setLoadingStatus(false);
    }
  };

  const deleteTask = async () => {
    setLoadingDelete(true);
    try {
      await api.delete(`/tasks/${task._id}`);
      fetchTasks();
    } finally {
      setLoadingDelete(false);
    }
  };

  const updateTask = async () => {
    setLoadingUpdate(true);
    try {
      await api.put(`/tasks/${task._id}`, { title, description });
      setIsEditing(false);
      fetchTasks();
    } finally {
      setLoadingUpdate(false);
    }
  };

  return (
    <div
      className={`
        p-4 rounded-lg shadow-md mb-3 transition-all duration-300
        border-2
        ${
          task.completed
            ? "border-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-white/30 backdrop-blur-sm"
            : "border-gray-300 bg-white/20 backdrop-blur-sm"
        }
        hover:scale-105
      `}
    >
      {isEditing ? (
        <>
          <input
            className="w-full mb-2 p-2 border rounded text-gray-800"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full mb-2 p-2 border rounded text-gray-800"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex gap-2">
            <button
              onClick={updateTask}
              className="bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-2"
              disabled={loadingUpdate}
            >
              {loadingUpdate && (
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              )}
              {loadingUpdate ? "Updating..." : "Save"}
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3
            className={`font-semibold text-lg ${
              task.completed ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {task.title}
          </h3>
          <p className="text-sm text-gray-700">{task.description}</p>

          <div className="mt-3 flex gap-2 flex-wrap">
            <button
              onClick={toggleStatus}
              className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-2"
              disabled={loadingStatus}
            >
              {loadingStatus && (
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              )}
              {loadingStatus
                ? "Updating..."
                : task.completed
                ? "Mark Pending"
                : "Mark Completed"}
            </button>

            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>

            <button
              onClick={deleteTask}
              className="bg-red-600 text-white px-3 py-1 rounded flex items-center gap-2"
              disabled={loadingDelete}
            >
              {loadingDelete && (
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              )}
              {loadingDelete ? "Deleting..." : "Delete"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
