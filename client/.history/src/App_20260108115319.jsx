import { useEffect, useState } from "react";
import { getTasks, getTaskCount, createTask } from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [count, setCount] = useState({ total: 0, completed: 0, pending: 0 });
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const taskRes = await getTasks();
    setTasks(taskRes.data);

    const countRes = await getTaskCount();
    setCount(countRes.data);
  };

  // ➕ Add task
  const handleAddTask = async () => {
    if (!title.trim()) {
      alert("Please enter a task");
      return;
    }

    await createTask({ title });
    setTitle("");
    fetchAll();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
     <h1 className="text-white text-4xl font-bold">

      {/* Counts */}
      <p>Total: {count.total}</p>
      <p>Completed: {count.completed}</p>
      <p>Pending: {count.pending}</p>

      {/* Add Task */}
      <div style={{ margin: "15px 0" }}>
        <input
          type="text"
          placeholder="Enter new task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleAddTask} style={{ marginLeft: "10px" }}>
          Add
        </button>
      </div>

      {/* Task List */}
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} {task.completed ? "✅" : "⏳"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
