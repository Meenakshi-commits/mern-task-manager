// src/components/TaskList.jsx
import React, { useRef } from "react";
import TaskItem from "./TaskItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../taskAnimations.css"; // make sure this exists

export default function TaskList({ tasks, onDelete, onToggleCompleted }) {
  return (
    <TransitionGroup className="space-y-3">
      {tasks.map((task) => {
        const nodeRef = useRef(null); // React 18-compatible
        return (
          <CSSTransition
            key={task._id}
            timeout={300}
            classNames="fade"
            nodeRef={nodeRef}
          >
            <div ref={nodeRef}>
              <TaskItem
                task={task}
                onDelete={onDelete}
                onToggleCompleted={onToggleCompleted}
              />
            </div>
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
}
