import express from 'express';

import controllers from '../app/controllers/CartController.js';

const router = express.Router();

router.post('/add-book-to-cart', controllers.addBookToCart)

router.get('/:username', controllers.showCart)

router.post('/add-by-one', controllers.addByOne)
router.post('/subtract-by-one', controllers.subtractByOne)

export default router;