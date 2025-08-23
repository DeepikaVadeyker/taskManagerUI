const BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';  // DynamoDB or Local URL

export async function fetchTasks(status) {
  const q = status ? `?status=${status}` : '';
  const res = await fetch(`${BASE}/api/tasks${q}`);
  return res.json();
}

export async function createTask(payload) {
  const res = await fetch(`${BASE}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function updateTask(id, payload) {
  const res = await fetch(`${BASE}/api/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${BASE}/api/tasks/${id}`, { method: 'DELETE' });
  return res.json();
}

export async function sendChatMessage(message) {
  const res = await fetch(`${BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });
  return res.json();
}

