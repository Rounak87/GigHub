import React, { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [tasksRes, projectsRes, freelancersRes] = await Promise.all([
          fetch('http://localhost:5000/api/tasks'),
          fetch('http://localhost:5000/api/projects'),
          fetch('http://localhost:5000/api/freelancers'),
        ]);

        if (!tasksRes.ok || !projectsRes.ok || !freelancersRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const tasksData = await tasksRes.json();
        const projectsData = await projectsRes.json();
        const freelancersData = await freelancersRes.json();

        setTasks(tasksData);
        setProjects(projectsData);
        setFreelancers(freelancersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const handleFormSubmit = (updatedTask) => {
    // Update tasks list after create or edit
    setTasks(prev => {
      const existingIndex = prev.findIndex(t => t.task_id === updatedTask.task_id);
      if (existingIndex >= 0) {
        const newTasks = [...prev];
        newTasks[existingIndex] = updatedTask;
        return newTasks;
      } else {
        return [updatedTask, ...prev];
      }
    });
    setShowForm(false);
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tasks Management</h1>
      <button
        onClick={handleCreate}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create New Task
      </button>

      {showForm && (
        <TaskForm
          task={editingTask}
          projects={projects}
          freelancers={freelancers}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
        />
      )}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Task ID</th>
            <th className="border border-gray-300 p-2">Project</th>
            <th className="border border-gray-300 p-2">Freelancer</th>
            <th className="border border-gray-300 p-2">Deadline</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-4">No tasks found.</td>
            </tr>
          ) : (
            tasks.map(task => (
              <tr key={task.task_id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{task.task_id}</td>
                <td className="border border-gray-300 p-2">
                  {task.project_description 
                    ? `${task.project_description} (#${task.project_id})`
                    : `#${task.project_id}`}
                </td>
                <td className="border border-gray-300 p-2">
                  {freelancers.find(f => f.freelancer_id === task.freelancer_id)?.name || 'Unassigned'}
                </td>
                <td className="border border-gray-300 p-2">{task.deadline}</td>
                <td className="border border-gray-300 p-2">{task.status}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
