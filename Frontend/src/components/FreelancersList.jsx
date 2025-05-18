import React, { useEffect, useState } from 'react';
import { fetchFreelancers } from '../services/api';

export default function FreelancersList() {
  const [freelancers, setFreelancers] = useState([]);

  useEffect(() => {
    fetchFreelancers().then(setFreelancers);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Freelancers</h2>
      <ul>
        {freelancers.map(freelancer => (
          <li key={freelancer.freelancer_id} className="mb-2">
            {freelancer.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
