import { useState } from "react";
import api from "../services/api";

export default function TaskItem({ task, fetchTasks }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

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
      title,
      description,
    });
    setIsEditing(false);
    fetchTasks();
  };

  return (
    <div className="bg-white p-4 rounded-lg mb-3 shadow">
      {isEditing ? (
        <>
          <input
            className="w-full mb-2 p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full mb-2 p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            onClick={updateTask}
            className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
          >
            Save
          </button>

          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-400 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h3
            className={`font-semibold ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {task.title}
          </h3>
          <p className="text-sm text-gray-700">{task.description}</p>

          <div className="mt-3 flex gap-2">
            <button
              onClick={toggleStatus}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              {task.completed ? "Mark Pending" : "Mark Completed"}
            </button>

            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>

            <button
              onClick={deleteTask}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
