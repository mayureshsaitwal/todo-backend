import 'dotenv/config';
import express, { json } from 'express';
import cors from 'cors';
import todosRoutes from './routes/todos.js';
import summarizeRoutes from './routes/summarize.js';

const app = express();
app.use(cors());
app.use(json());

app.use('/todos', todosRoutes);
app.use('/summarize', summarizeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
