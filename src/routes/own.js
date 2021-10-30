import express from 'express';
const router = express.Router();

import controllers from '../app/controllers/OwnController.js';

router.get('/stored/coffee', controllers.storedCoffee);
router.get('/stored/books', controllers.storedBooks);
router.get('/stored/users', controllers.storedUsers);
router.get('/stored/news', controllers.storedNews);

router.get('/trash/coffee', controllers.trashCoffee);
router.get('/trash/books', controllers.trashBooks);
router.get('/trash/users', controllers.trashUsers);
router.get('/trash/news', controllers.trashNews);

export default router;