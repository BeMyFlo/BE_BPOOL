import { Router } from 'express';
import * as Product from './product.controller.js';
const router = new Router();

// @route GET api/profile
// @desc Get Profile
// @access Public
router.route('/').get(Product.list);
// @route GET api/profile
// @desc Get Profile
// @access Public
router.route('/').post(Product.create);
// // @route GET api/profile
// // @desc Get Profile
// // @access Public
router.route('/:id').get(Product.oneProduct);
// // @route GET api/profile
// // @desc Get Profile
// // @access Public
// router.route('/').delete(Product.deleteUser);
// router.route('/login').post(Product.login);

export default router;