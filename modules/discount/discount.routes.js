import { Router } from "express";
import * as Discount from "./discount.controller.js";
import checkLogin from "../../middlewares/checkLogin.js";
import checkAdmin from "../../middlewares/checkAdmin.js";
const router = new Router();


router.route("/create").post(checkLogin, Discount.createDiscount);

export default router;
