export default function TaskForm({ description, setDescription, handleAddTask }) {
  return (
    <div className="flex mb-4 gap-3">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 p-3 rounded-xl bg-white/20 backdrop-blur-md border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
      <button
        onClick={handleAddTask}
        className="px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl shadow-md transition-all duration-300"
      >
        Add
      </button>
    </div>
  );
}
