import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <nav className="w-48 bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-3">
          <li>
            <NavLink
              to="clients"
              className={({ isActive }) =>
                isActive ? 'font-semibold text-blue-600' : ''
              }
            >
              Clients
            </NavLink>
          </li>
          <li>
            <NavLink
              to="freelancers"
              className={({ isActive }) =>
                isActive ? 'font-semibold text-blue-600' : ''
              }
            >
              Freelancers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="projects"
              className={({ isActive }) =>
                isActive ? 'font-semibold text-blue-600' : ''
              }
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="tasks"
              className={({ isActive }) =>
                isActive ? 'font-semibold text-blue-600' : ''
              }
            >
              Tasks
            </NavLink>
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
