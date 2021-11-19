import express from 'express';

import controllers from '../app/controllers/OrderController.js';

const router = express.Router();

router.get('/list/:username', controllers.index);
router.get('/detail/:orderId', controllers.show)

export default router;