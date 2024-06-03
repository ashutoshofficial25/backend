import { Router } from 'express';
import {
  createContact,
  getAllContracts,
} from '../controller/contact.controller.js';
import { checkAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(checkAuth);
router.get('/', getAllContracts);
router.post('/', createContact);

export default router;
