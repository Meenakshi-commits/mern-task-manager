import { useState } from "react";
import api from "../services/api";

export default function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false); // ← NEW

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;

    setLoading(true); // start loading

    try {
      await api.post("/tasks", { title, description });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.error("Error adding task:", err);
    } finally {
      setLoading(false); // end loading
    }
  };

  return (
    <form className="mb-6" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        className="w-full mb-2 p-2 rounded-lg border text-gray-800 bg-white"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Task description"
        rows="3"
        className="w-full mb-2 p-2 rounded-lg border text-gray-800 bg-white"
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
            flex items-center gap-2
          "
          disabled={loading} // disables button while loading
        >
          {loading ? (
            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
          ) : null}
          {loading ? "Adding..." : "+ Add Task"}
        </button>
      </div>
    </form>
  );
}
