import { Router } from 'express';
const router = Router();
import { getTodos, addTodo, deleteTodo } from '../controllers/todosController.js';

router.get('/', getTodos);
router.post('/', addTodo);
router.delete('/:id', deleteTodo);

export default router;
