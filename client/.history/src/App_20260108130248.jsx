// src/App.jsx
import React, { useState, useEffect } from "react";
import axios from "./services/api"; // your axios instance
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const { data } = await axios.get("/tasks");
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async () => {
    if (!title.trim()) return;
    try {
      await axios.post("/tasks", { title, description });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // Toggle completed
  const toggleCompleted = async (id) => {
    const task = tasks.find((t) => t._id === id);
    try {
      await axios.put(`/tasks/${id}`, { completed: !task.completed });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // Task summary
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  return (
    <div className="min-h-screen bg-gray-200 flex p-10 gap-8">
      {/* Left - Task Box */}
      <div className="flex-1 max-w-2xl space-y-6">
        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">My Tasks</h1>
          <div className="flex flex-col space-y-3 mb-4">
            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80"
            />
            <textarea
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 resize-none"
              rows={3}
            />
            <button
              onClick={addTask}
              className="self-end px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            >
              Add Task
            </button>
          </div>

          {/* Task List */}
          <TaskList
            tasks={tasks}
            onDelete={deleteTask}
            onToggleCompleted={toggleCompleted}
          />
        </div>
      </div>

      {/* Right - Summary Box */}
      <div className="w-60 flex items-center justify-center bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-lg">
        <div className="flex flex-col items-center space-y-3 text-gray-700 font-medium text-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Task Summary</h2>
          <div>Total: {total}</div>
          <div>Completed: {completed}</div>
          <div>Pending: {pending}</div>
        </div>
      </div>
    </div>
  );
}
