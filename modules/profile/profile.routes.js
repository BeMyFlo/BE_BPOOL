import { Router } from 'express';
import * as Profile from './profile.controller.js';
import checkLogin from '../../middlewares/checkLogin.js'
import checkAdmin from '../../middlewares/checkAdmin.js';
const router = new Router();

// router.route('/create').get(checkLogin,Profile.create);

router.route('/update').post(checkLogin,Profile.updateInfo);

export default router;