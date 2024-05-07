import { Router } from "express";
import * as Bar from "./bar.controller.js";
import checkLogin from "../../middlewares/checkLogin.js";
import checkAdmin from "../../middlewares/checkAdmin.js";
const router = new Router();


router.route("/").get(Bar.getListBars);

router.route("/create").post(Bar.create);

router.route("/:id").get(Bar.detailBar);

router.route("/delete/:id").delete(checkAdmin, Bar.deleteBar);

export default router;
