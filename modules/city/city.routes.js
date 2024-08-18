import { Router } from "express";
import * as City from "./city.controller.js";
import checkLogin from "../../middlewares/checkLogin.js";
import checkAdmin from "../../middlewares/checkAdmin.js";
const router = new Router();


router.route("/create").post(City.create);
router.route("/").get(City.getListCity);
router.route("/:id").get(City.getCityById);
export default router;
