// src/App.jsx
import React, { useState, useEffect } from "react";
import axios from "./services/api"; // make sure your axios instance is in /services/api.js
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [description, setDescription] = useState("");

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await axios.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      await axios.post("/tasks", { title: newTask, description, completed: false });
      setNewTask("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Update task completion
  const toggleComplete = async (task) => {
    try {
      await axios.put(`/tasks/${task._id}`, { ...task, completed: !task.completed });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Task counts
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 font-sans">
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full max-w-6xl px-4">
        {/* Left Box - Task List */}
        <div className="flex-1 bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">My Tasks</h2>

          {/* Add Task */}
          <div className="flex flex-col gap-2 mb-4">
            <input
              type="text"
              placeholder="Task Title"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <textarea
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              rows={2}
            ></textarea>
            <button
              onClick={addTask}
              className="self-start bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1 rounded transition-all duration-300"
            >
              Add Task
            </button>
          </div>

          {/* Task List */}
          <TaskList
            tasks={tasks}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
          />
        </div>

        {/* Right Box - Summary Card */}
        <div className="flex-1 max-w-sm w-full bg-gradient-to-r from-indigo-400 to-purple-500 p-6 rounded-xl shadow-lg text-white flex flex-col justify-center items-center">
          <h2 className="text-xl font-semibold mb-4">Task Summary</h2>
          <p className="text-lg">Total: {totalTasks}</p>
          <p className="text-lg">Completed: {completedTasks}</p>
          <p className="text-lg">Pending: {pendingTasks}</p>
        </div>
      </div>
    </div>
  );
}
