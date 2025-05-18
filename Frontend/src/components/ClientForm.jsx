import React, { useState } from 'react';

export default function ClientForm({ onClientAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    contact: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to create client');

      setFormData({ name: '', company: '', contact: '' });
      onClientAdded();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Add New Client</h2>

      <input
        type="text"
        name="name"
        placeholder="Client Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="border p-2 w-full mb-3 rounded"
      />

      <input
        type="text"
        name="company"
        placeholder="Company (optional)"
        value={formData.company}
        onChange={handleChange}
        className="border p-2 w-full mb-3 rounded"
      />

      <input
        type="text"
        name="contact"
        placeholder="Contact Info (optional)"
        value={formData.contact}
        onChange={handleChange}
        className="border p-2 w-full mb-3 rounded"
      />

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Adding...' : 'Add Client'}
      </button>
    </form>
  );
}
