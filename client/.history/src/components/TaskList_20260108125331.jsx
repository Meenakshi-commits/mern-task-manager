import TaskItem from "./TaskItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "../taskAnimations.css";

export default function TaskList({ tasks, fetchTasks }) {
  return (
    <TransitionGroup className="space-y-3">
      {tasks.map((task) => (
        <CSSTransition key={task._id} timeout={300} classNames="fade">
          <div>
            <TaskItem task={task} />
          </div>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}
