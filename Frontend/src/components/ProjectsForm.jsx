import React, { useEffect, useState } from 'react';

export default function ProjectForm({ onProjectAdded }) {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    client_id: '',
    description: '',
    budget: '',
    status: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch clients on mount
  useEffect(() => {
    fetch('http://localhost:5000/api/clients')
      .then(res => res.json())
      .then(data => setClients(data))
      .catch(() => setClients([]));
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.client_id) {
      setError('Please select a client');
      setLoading(false);
      return;
    }
    if (!formData.budget || isNaN(formData.budget)) {
      setError('Please enter a valid budget');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to create project');

      setFormData({ client_id: '', description: '', budget: '', status: '' });
      onProjectAdded();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Add New Project</h2>

      <select
        name="client_id"
        value={formData.client_id}
        onChange={handleChange}
        required
        className="border p-2 w-full mb-3 rounded"
      >
        <option value="">Select Client</option>
        {clients.map(client => (
          <option key={client.client_id} value={client.client_id}>
            {client.name} {client.company ? `(${client.company})` : ''}
          </option>
        ))}
      </select>

      <textarea
        name="description"
        placeholder="Description (optional)"
        value={formData.description}
        onChange={handleChange}
        className="border p-2 w-full mb-3 rounded"
      />

      <input
        type="number"
        name="budget"
        placeholder="Budget (required)"
        value={formData.budget}
        onChange={handleChange}
        required
        step="0.01"
        min="0"
        className="border p-2 w-full mb-3 rounded"
      />

      <input
        type="text"
        name="status"
        placeholder="Status (optional)"
        value={formData.status}
        onChange={handleChange}
        className="border p-2 w-full mb-3 rounded"
      />

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Adding...' : 'Add Project'}
      </button>
    </form>
  );
}
