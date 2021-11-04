import express from 'express';
import controllers from '../app/controllers/PromoController.js';
import validate from '../app/validate/promo.validate.js';

const router = express.Router();

router.get('/list', controllers.index);
router.get('/create', controllers.create);
router.get('/:id', controllers.show);
router.post('/save', validate.postCreatePromo, controllers.save)
router.get('/:id/edit', controllers.edit)
router.patch('/:id', controllers.update);
router.delete('/:id', controllers.softDelete);
router.delete('/:id/force', controllers.deepDelete);
router.patch('/:id/restore', controllers.restore);

export default router;