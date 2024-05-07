import { Router } from 'express';
import * as User from './user.controller.js';
import checkLogin from '../../middlewares/checkLogin.js'
import checkAdmin from '../../middlewares/checkAdmin.js';
const router = new Router();

//Get all users
router.route('/').getcheckLogin,(User.getListUsers);

//Register
router.route('/register').post(User.createUser);

//Đăng nhập
router.route('/login').post(User.login);
    
//Update user
router.route('/:id/update-user').put(checkLogin,User.updateUser);

//Xóa user
router.route('/').delete(checkLogin,checkAdmin,User.deleteUser);

//Đổi mật khẩu
router.route('/:id/update-password').put(checkLogin,User.updatePassword);

export default router;