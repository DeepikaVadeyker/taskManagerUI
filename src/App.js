import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from './api';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // all | active | completed
  const [loading, setLoading] = useState(false);

  async function loadTasks() {
    setLoading(true);
    const data = await fetchTasks(filter === 'all' ? undefined : filter);
    setTasks(data);
    setLoading(false);
  }

  useEffect(() => {
    loadTasks();
  }, [filter]);

  async function handleAdd(task) {
    const created = await createTask(task);
    setTasks(prev => [created, ...prev]);
  }

  async function handleToggleComplete(task) {
    const updated = await updateTask(task._id, { completed: !task.completed });
    setTasks(prev => prev.map(t => (t._id === updated._id ? updated : t)));
  }

  async function handleUpdate(id, patch) {
    const updated = await updateTask(id, patch);
    setTasks(prev => prev.map(t => (t._id === updated._id ? updated : t)));
  }

  async function handleDelete(id) {
    await deleteTask(id);
    setTasks(prev => prev.filter(t => t._id !== id));
  }

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <AddTaskForm onAdd={handleAdd} />

      <div className="controls">
        <label>Filter: </label>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={loadTasks} disabled={loading}>Refresh</button>
      </div>

      {loading ? <p>Loading...</p> :
        <TaskList
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      }
    </div>
  );
}
