import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete }) {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} onDelete={onDelete} />
      ))}
    </div>
  );
}
