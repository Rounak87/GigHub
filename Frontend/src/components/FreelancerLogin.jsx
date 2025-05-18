import React, { useEffect, useState } from 'react';

export default function FreelancerLogin({ onLogin }) {
  const [freelancers, setFreelancers] = useState([]);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/freelancers')
      .then(res => res.json())
      .then(data => setFreelancers(data))
      .catch(() => setFreelancers([]));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedId) {
      const freelancer = freelancers.find(f => f.freelancer_id === parseInt(selectedId));
      onLogin(freelancer);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <label className="block mb-2 font-semibold text-lg">Select Your Name to Login</label>
      <select
        value={selectedId}
        onChange={e => setSelectedId(e.target.value)}
        required
        className="border p-2 w-full mb-4 rounded"
      >
        <option value="">-- Select Freelancer --</option>
        {freelancers.map(f => (
          <option key={f.freelancer_id} value={f.freelancer_id}>
            {f.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Login
      </button>
    </form>
  );
}
