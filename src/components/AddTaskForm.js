import React, { useState } from 'react';

export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [dueDate, setDueDate] = useState('');

  async function submit(e) {
    e.preventDefault();
    if (!title.trim()) return alert('Title required');
    const payload = { title, description, assignee, dueDate: dueDate || null };
    await onAdd(payload);
    setTitle(''); setDescription(''); setAssignee(''); setDueDate('');
  }

  return (
    <form className="add-form" onSubmit={submit}>
      <input placeholder="Task title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Assignee (optional)" value={assignee} onChange={e => setAssignee(e.target.value)} />
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      <input placeholder="Description (optional)" value={description} onChange={e => setDescription(e.target.value)} />
      <button type="submit">Add Task</button>
    </form>
  );
}
