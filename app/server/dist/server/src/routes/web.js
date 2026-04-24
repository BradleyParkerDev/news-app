import express from 'express';
const router = express.Router();
import { webController } from '../controllers/index.js';
// Web
router.get('*', webController.web);
export default router;
