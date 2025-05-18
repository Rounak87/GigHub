import React, { useState } from 'react';

const SKILL_OPTIONS = [
  'Web Developer',
  'AI Developer',
  'App Developer',
  'Database Developer',
];

export default function FreelancerRegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    skills: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!formData.name || !formData.skills) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/freelancers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to register freelancer');

      setFormData({ name: '', skills: '' });
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Freelancer Registration</h2>

      {success && <p className="mb-4 text-green-600">Registration successful! You can now log in.</p>}

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="border p-2 w-full mb-3 rounded"
      />

      <select
        name="skills"
        value={formData.skills}
        onChange={handleChange}
        required
        className="border p-2 w-full mb-3 rounded"
      >
        <option value="">Select Skill</option>
        {SKILL_OPTIONS.map(skill => (
          <option key={skill} value={skill}>{skill}</option>
        ))}
      </select>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}
