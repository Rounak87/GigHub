// src/pages/ProjectsPage.jsx
import React, { useState } from 'react';
import ProjectForm from '../components/ProjectsForm.jsx';
import ProjectsList from '../components/ProjectsList';

export default function ProjectsPage() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const refreshProjects = () => setRefreshFlag(prev => !prev);

  return (
    <div>
      <ProjectForm onProjectAdded={refreshProjects} />
      <ProjectsList refreshFlag={refreshFlag} />
    </div>
  );
}

