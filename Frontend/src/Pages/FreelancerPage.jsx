import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FreelancerLogin from '../components/FreelancerLogin';
import FreelancerTasks from '../components/FreelancerTasks';

export default function FreelancerPage() {
  const [freelancer, setFreelancer] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto p-6">
      {!freelancer ? (
        <>
          <FreelancerLogin onLogin={setFreelancer} />
          <button
            onClick={() => navigate('/freelancer/register')}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 block mx-auto"
          >
            Register New Freelancer
          </button>
        </>
      ) : (
        <>
          <p className="mb-4 text-lg">
            Welcome, <strong>{freelancer.name}</strong>!
          </p>
          <FreelancerTasks freelancerId={freelancer.freelancer_id} />
          <button
            onClick={() => setFreelancer(null)}
            className="mt-6 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}
