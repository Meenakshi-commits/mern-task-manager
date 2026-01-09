import TaskItem from "./TaskItem";

export default function TaskList({ tasks, fetchTasks }) {
  return (
    <div className="mt-4">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          fetchTasks={fetchTasks}
        />
      ))}
    </div>
  );
}
