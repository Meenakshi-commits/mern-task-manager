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

      <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
        Add Task
      </button>
    </form>
  );
}
