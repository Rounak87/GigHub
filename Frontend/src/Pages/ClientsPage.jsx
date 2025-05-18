import React, { useState } from 'react';
import ClientForm from '../components/ClientForm';
import ClientsList from '../components/ClientsList';

export default function ClientsPage() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const refreshClients = () => setRefreshFlag((prev) => !prev);

  return (
    <div>
      <ClientForm onClientAdded={refreshClients} />
      <ClientsList refreshFlag={refreshFlag} />
    </div>
  );
}
