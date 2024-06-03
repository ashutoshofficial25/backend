import { Router } from 'express';
import {
  GLogin,
  GRegister,
  getAllUsers,
  getProfile,
  login,
  register,
} from '../controller/auth.controller.js';
import { checkAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/g-login', GLogin);

router.post('/g-register', GRegister);

router.post('/login', login);

router.post('/register', register);

router.use(checkAuth);

router.get('/@me', getProfile);

router.get('/users', getAllUsers);

export default router;
