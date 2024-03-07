import { Router } from "express";
import * as Post from "./post.controller.js";
import checkLogin from "../../middlewares/checkLogin.js";
import checkAdmin from "../../middlewares/checkAdmin.js";
const router = new Router();


router.route("/").post(checkLogin, Post.create);
// router.route("/").get(Product.list);
// router.get("/", checkLogin, Product.list);
// router.route("/:id").get(Product.oneProduct);
// // router.route('/').delete(Product.deleteUser);
// // router.route('/login').post(Product.login);

export default router;
