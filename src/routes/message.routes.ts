import { Router } from 'express';
import { getMessages, sendMessage } from '../controller/message.controller.js';
import { checkAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(checkAuth);

router.post('/', sendMessage);
router.get('/:contactId', getMessages);

export default router;
