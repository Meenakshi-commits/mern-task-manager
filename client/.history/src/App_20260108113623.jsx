import { useEffect, useState } from "react";
import { getTasks, getTaskCount } from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [count, setCount] = useState({ total: 0, completed: 0, pending: 0 });

  useEffect(() => {
    fetchTasks();
    fetchCount();
  }, []);

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  const fetchCount = async () => {
    const res = await getTaskCount();
    setCount(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Manager</h1>

      <p>Total: {count.total}</p>
      <p>Completed: {count.completed}</p>
      <p>Pending: {count.pending}</p>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} — {task.completed ? "✅" : "⏳"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
