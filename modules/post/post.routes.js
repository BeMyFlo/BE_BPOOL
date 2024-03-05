import { Router } from "express";
import * as Post from "./post.controller.js";
// import checkLogin from "../../middlewares/checkLogin.js";
const router = new Router();

// // @route GET api/profile
// // @desc Get Profile
// // @access Public
// // router.route("/").get(Product.list);
// router.get("/", checkLogin, Product.list);

// // @route GET api/profile
// // @desc Get Profile
// // @access Public
router.route("/").post(Post.create);
// // // @route GET api/profile
// // // @desc Get Profile
// // // @access Public
// router.route("/:id").get(Product.oneProduct);
// // // @route GET api/profile
// // // @desc Get Profile
// // // @access Public
// // router.route('/').delete(Product.deleteUser);
// // router.route('/login').post(Product.login);

export default router;
