import { Router } from "express";
import * as Discount from "./discount.controller.js";
import checkLogin from "../../middlewares/checkLogin.js";
import checkAdmin from "../../middlewares/checkAdmin.js";
const router = new Router();


router.route("/create").post(checkLogin, Discount.createDiscount);
router.route("/list").get(Discount.getListDiscount);
router.route("/:id").get(Discount.getDiscountById);
router.route("/list-by-bar/:barId").get(Discount.getListDiscountByBarId);

export default router;
