import { Router } from 'express';
import * as User from './user.controller.js';
import checkLogin from '../../middlewares/checkLogin.js'
const router = new Router();

// @route GET api/profile
// @desc Get Profile
// @access Public
router.route('/').get(User.getUser);
// @route GET api/profile
// @desc Get Profile
// @access Public
router.route('/register').post(User.createUser);
// @route GET api/profile
// @desc Get Profile
// @access Public
router.route('/update/:id').put(User.getUser);
// @route GET api/profile
// @desc Get Profile
// @access Public
router.route('/').delete(User.deleteUser);
router.route('/login').post(User.login);
router.route('/:id/addCustomer').post(User.addCustomer);
// router.route('/:id/addCustomer').post(checkLogin, User.addCustomer);



export default router;