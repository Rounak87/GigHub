// src/components/ProjectsList.jsx
import React, { useEffect, useState } from 'react';

export default function ProjectsList({ refreshFlag }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(() => setProjects([]));
  }, [refreshFlag]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Projects</h2>
      <ul>
        {projects.map(project => (
          <li key={project.project_id} className="mb-2 border-b pb-2">
            <strong>{project.description || 'No Description'}</strong><br />
            Budget: ${project.budget} <br />
            Status: {project.status || 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
}
