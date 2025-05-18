// src/components/ClientsList.jsx
import React, { useEffect, useState } from 'react';
import { fetchClients } from '../services/api';

export default function ClientsList() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients().then(setClients);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Clients</h2>
      <ul>
        {clients.map(client => (
          <li key={client.client_id} className="mb-2">
            {client.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
