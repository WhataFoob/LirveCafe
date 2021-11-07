import express from 'express';
import controllers from '../app/controllers/AuthController.js';
import validate from '../app/validate/user.validate.js';

const router = express.Router();

router.get('/index', controllers.index);
router.post('/login', validate.postLogin, controllers.login);
router.get('/logout', controllers.logout);

export default router;