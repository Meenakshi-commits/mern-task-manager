import { useState } from "react";
import api from "../services/api";

export default function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;

    await api.post("/tasks", {
      title,
      description,
    });

    setTitle("");
    setDescription("");
    fetchTasks();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/20 backdrop-blur-lg p-4 rounded-xl shadow-md"
    >
      <input
        type="text"
        placeholder="Task title"
        className="w-full mb-2 p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Task description"
        className="w-full mb-2 p-2 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold py-3 rounded-lg hover:from-gray-800 hover:to-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95">
        Add Task
      </button>
    </form>
  );
}

