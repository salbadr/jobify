import express from 'express';
import { login, register, updateUser } from '../controllers/authController.js';
import authMiddleWare from '../middleware/auth.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/updateUser').patch(authMiddleWare, updateUser);

export default router;