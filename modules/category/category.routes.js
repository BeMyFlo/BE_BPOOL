import { Router } from 'express';
import * as Category from './category.controller.js';
const router = new Router();

// @route GET api/profile
// @desc Get Profile
// @access Public
router.route('/').get(Category.list);
// @route GET api/profile
// @desc Get Profile
// @access Public
router.route('/').post(Category.create);
// // @route GET api/profile
// // @desc Get Profile
// // @access Public
// router.route('/:id').get(Category.oneProduct);
// // @route GET api/profile
// // @desc Get Profile
// // @access Public
// router.route('/').delete(Product.deleteUser);
// router.route('/login').post(Product.login);

export default router;