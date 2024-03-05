import { Router } from 'express';
import * as User from './user.controller.js';
import checkLogin from '../../middlewares/checkLogin.js'
const router = new Router();

//Get all users
router.route('/').get(User.getUser);
//Register
router.route('/register').post(User.createUser);
//Update user
router.route('/:id/update-user').put(User.updateUser);
//Xóa user
router.route('/').delete(User.deleteUser);
//Đăng nhập
router.route('/login').post(User.login);
//Đổi mật khẩu
router.route('/:id/update-password').put(User.updatePassword);




export default router;