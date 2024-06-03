import { Router } from 'express';
import { sendMessage } from '../controller/message.controller.js';
import { checkAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(checkAuth);

router.post('/', sendMessage);

export default router;
