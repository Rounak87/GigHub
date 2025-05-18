const API_BASE_URL = 'http://localhost:5000/api';

// Clients
export async function fetchClients() {
  const res = await fetch(`${API_BASE_URL}/clients`);
  return res.json();
}

// Freelancers
export async function fetchFreelancers() {
  const res = await fetch(`${API_BASE_URL}/freelancers`);
  return res.json();
}

// Projects
export async function fetchProjects() {
  const res = await fetch(`${API_BASE_URL}/projects`);
  return res.json();
}

// Tasks
export async function fetchTasks() {
  const res = await fetch(`${API_BASE_URL}/tasks`);
  return res.json();
}

// Payments
export async function fetchPayments() {
  const res = await fetch(`${API_BASE_URL}/payments`);
  return res.json();
}
