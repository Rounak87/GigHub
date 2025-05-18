// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import DashboardLayout from './components/DashboardLayout';
import Home from './pages/Home';
import ClientsPage from './pages/ClientsPage';
import FreelancersPage from './pages/FreelancersPage';
import ProjectsPage from './pages/ProjectsPage';
import AdminPage from './pages/AdminPage';
import FreelancerPage from './pages/FreelancerPage';
import FreelancerRegisterPage from './pages/FreelancerRegisterPage';
import TasksPage from './pages/TasksPage';  // Import TasksPage

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Admin dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="clients" replace />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="freelancers" element={<FreelancersPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="tasks" element={<TasksPage />} />  {/* Tasks route */}
        </Route>

        {/* Admin dummy page */}
        <Route path="/admin" element={<AdminPage />} />

        {/* Freelancer routes */}
        <Route path="/freelancer/register" element={<FreelancerRegisterPage />} />
        <Route path="/freelancer" element={<FreelancerPage />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
