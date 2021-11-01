import express from 'express';
const router = express.Router();

import homeController from '../app/controllers/HomeController.js';

router.get('/', homeController.index);

export default router;