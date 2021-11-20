import express from 'express';
import controllers from '../app/controllers/';

const router = express.Router();

router.post('/multi-search', controllers.multiSearch)

export default router;