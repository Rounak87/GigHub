import React, { useEffect, useState } from 'react';

export default function FreelancerTasks({ freelancerId }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!freelancerId) return;

    fetch(`http://localhost:5000/api/tasks?freelancer_id=${freelancerId}`)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(() => setTasks([]));
  }, [freelancerId]);

  if (!freelancerId) return <p>Please login to see your tasks.</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your Assigned Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks assigned yet.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.task_id} className="mb-3 border-b pb-2">
              <strong>
                {task.project_description || 'No Description'}
              </strong>
              <br />
              Status: {task.status || 'Pending'}<br />
              Deadline: {task.deadline || 'N/A'}<br />
              Task ID: {task.task_id}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
