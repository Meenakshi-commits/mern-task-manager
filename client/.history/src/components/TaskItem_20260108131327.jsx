export default function TaskItem({ task, onDelete }) {
  return (
    <div className="bg-white/30 backdrop-blur-md p-3 rounded-md flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-gray-800">{task.description}</h3>
        <p className="text-gray-500">{task.completed ? "Completed" : "Pending"}</p>
      </div>
      <button
        onClick={() => onDelete(task._id)}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
      >
        Delete
      </button>
    </div>
  );
}
