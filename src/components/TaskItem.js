import React, { useState } from 'react';

export default function TaskItem({ task, onToggleComplete, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [assignee, setAssignee] = useState(task.assignee || '');
  const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate.split('T')[0] : '');

  function save() {
    onUpdate({ title, assignee, dueDate: dueDate || null });
    setEditing(false);
  }

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="left">
        <input type="checkbox" checked={task.completed} onChange={onToggleComplete} />
      </div>

      <div className="main">
        {editing ? (
          <>
            <input value={title} onChange={e => setTitle(e.target.value)} />
            <input value={assignee} onChange={e => setAssignee(e.target.value)} placeholder="Assignee" />
            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
          </>
        ) : (
          <>
            <div className="title">{task.title}</div>
            {task.assignee && <div className="meta">Assigned to: {task.assignee}</div>}
            {task.dueDate && <div className="meta">Due: {new Date(task.dueDate).toLocaleDateString()}</div>}
            {task.description && <div className="desc">{task.description}</div>}
          </>
        )}
      </div>

      <div className="actions">
        {editing ? (
          <>
            <button onClick={save}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={onDelete}>Delete</button>
          </>
        )}
      </div>
    </li>
  );
}
