import { Router } from 'express';
const router = Router();
import { summarizeAndSend } from '../controllers/summarizeController.js';

router.post('/', summarizeAndSend);

export default router;
