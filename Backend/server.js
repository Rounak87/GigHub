// server.js
import express from 'express';
import cors from 'cors';

import clientsRouter from './routes/clients.js';
import freelancersRouter from './routes/freelancers.js';
import projectsRouter from './routes/projects.js';
import tasksRouter from './routes/tasks.js';
import paymentsRouter from './routes/payments.js';




const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/clients', clientsRouter);
app.use('/api/freelancers', freelancersRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/payments', paymentsRouter);


app.get('/', (req, res) => {
  res.send('Freelance API running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
