// src/components/TaskItem.jsx
import React from "react";

export default function TaskItem({ task, onDelete, onToggleCompleted }) {
  return (
    <div
      className={`flex justify-between items-center p-4 rounded-lg shadow-md
      ${task.completed ? "bg-green-100 text-green-900" : "bg-gray-100 text-gray-900"}`}
    >
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{task.title}</h3>
        <p className="text-sm text-gray-700">{task.description}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onToggleCompleted(task._id)}
          className={`px-3 py-1 rounded-full text-sm font-medium
          ${task.completed ? "bg-green-500 text-white" : "bg-gray-300 text-gray-800"}`}
        >
          {task.completed ? "Completed" : "Pending"}
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="px-3 py-1 rounded-full bg-red-500 text-white text-sm font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
