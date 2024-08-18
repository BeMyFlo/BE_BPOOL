import { Router } from "express";
import * as Bar from "./bar.controller.js";
import checkLogin from "../../middlewares/checkLogin.js";
import checkAdmin from "../../middlewares/checkAdmin.js";
const router = new Router();

//Customer
router.route("/").get(Bar.getListBars);
router.route("/:id").get(Bar.detailBar);
router.route("/:type").get(Bar.getListBarsByType);


//Admin
router.route("/create").post(checkAdmin, Bar.create);
router.route("/delete/:id").delete(checkAdmin, Bar.deleteBar);




export default router;
