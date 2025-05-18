import React, { useState } from 'react';
// import FreelancerForm from '../components/FreelancerForm';
import FreelancersList from '../components/FreelancersList'; // You need to create this

export default function FreelancersPage() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const refreshFreelancers = () => setRefreshFlag(prev => !prev);

  return (
    <div>
      
      <FreelancersList refreshFlag={refreshFlag} />
    </div>
  );
}
