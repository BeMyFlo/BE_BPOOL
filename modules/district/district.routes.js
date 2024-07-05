import { Router } from "express";
import * as District from "./district.controller.js";
import checkLogin from "../../middlewares/checkLogin.js";
import checkAdmin from "../../middlewares/checkAdmin.js";
const router = new Router();


router.route("/create").post(District.create);

export default router;
