import express from 'express';
import { authController } from '../../controllers/index.js';
const router = express.Router();
// Auth API
router.post('/login-user', authController.loginUser);
router.delete('/logout-user', authController.logoutUser);
export default router;
