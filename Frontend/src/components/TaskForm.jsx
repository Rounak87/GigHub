import React, { useState, useEffect } from 'react';

const STATUS_OPTIONS = ['Assigned', 'In Progress', 'Completed'];

export default function TaskForm({ task, projects, freelancers, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    project_id: '',
    freelancer_id: '',
    deadline: '',
    status: 'Assigned',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (task) {
      setFormData({
        project_id: task.project_id || '',
        freelancer_id: task.freelancer_id || '',
        deadline: task.deadline || '',
        status: task.status || 'Assigned',
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.project_id || !formData.deadline) {
      setError('Project and deadline are required');
      setLoading(false);
      return;
    }

    try {
      const method = task ? 'PUT' : 'POST';
      const url = task
        ? `http://localhost:5000/api/tasks/${task.task_id}`
        : 'http://localhost:5000/api/tasks';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save task');

      const savedTask = await res.json();
      onSubmit(savedTask);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 p-4 border rounded bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">{task ? 'Edit Task' : 'Create New Task'}</h2>
      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Project</label>
          <select
            name="project_id"
            value={formData.project_id}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded"
          >
            <option value="">Select Project</option>
            {projects.map(project => (
              <option key={project.project_id} value={project.project_id}>
                {project.description || `Project #${project.project_id}`}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Freelancer (optional)</label>
          <select
            name="freelancer_id"
            value={formData.freelancer_id}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            <option value="">Unassigned</option>
            {freelancers.map(freelancer => (
              <option key={freelancer.freelancer_id} value={freelancer.freelancer_id}>
                {freelancer.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded"
          >
            {STATUS_OPTIONS.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
