import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onToggleComplete, onUpdate, onDelete }) {
  if (!tasks.length) return <p>No tasks yet.</p>;
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          onToggleComplete={() => onToggleComplete(task)}
          onUpdate={(patch) => onUpdate(task._id, patch)}
          onDelete={() => onDelete(task._id)}
        />
      ))}
    </ul>
  );
}
