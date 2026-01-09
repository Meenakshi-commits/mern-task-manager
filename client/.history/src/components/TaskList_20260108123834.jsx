import TaskItem from "./TaskItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./taskAnimations.css"; // Import the animation CSS

export default function TaskList({ tasks, fetchTasks }) {
  return (
    <TransitionGroup className="space-y-3">
      {tasks.map((task) => (
        <CSSTransition
          key={task._id}
          timeout={300} // animation duration
          classNames="task"
        >
          <TaskItem task={task} fetchTasks={fetchTasks} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}
