import express from 'express';
import controllers from '../app/controllers/EmailController.js';

const router = express.Router();

router.post('/send-token', controllers.sendToken);

export default router;