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
        className="w-full mb-2 p-2 rounded text-black bg-white"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Task description"
        className="w-full mb-2 p-2 rounded text-black bg-white"
        rows="3"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

     <div className="flex justify-end">
  <button
    type="submit"
    className="
      px-4 py-2
      bg-gray-800
      text-white
      text-sm
      rounded-lg
      hover:bg-gray-900
      transition
      duration-200
      shadow
    "
  >
    + Add Task
  </button>
</div>

    </form>
  );
}
