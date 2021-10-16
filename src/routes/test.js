import express from 'express';
const router = express.Router();

import testController from '../app/controllers/TestController.js';

router.get('/', testController.index);

export default router;