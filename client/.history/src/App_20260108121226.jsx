return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
    
    {/* Glassmorphism Card */}
    <div className="max-w-xl mx-auto bg-white/20 backdrop-blur-lg p-6 rounded-xl text-white shadow-lg">

      <h1 className="text-3xl font-bold text-center mb-4">
        Task Manager
      </h1>

      <div className="flex justify-between mb-4">
        <span>Total: {tasks.length}</span>
        <span>Completed: {completed}</span>
        <span>Pending: {pending}</span>
      </div>

      <TaskForm fetchTasks={fetchTasks} />
      <TaskList tasks={tasks} fetchTasks={fetchTasks} />

    </div>
  </div>
);
