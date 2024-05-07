import { Router } from "express";
import * as Table from "./table.controller.js";
import checkLogin from "../../middlewares/checkLogin.js";
import checkAdmin from "../../middlewares/checkAdmin.js";
const router = new Router();


// router.route("/").get(Table.getListBars);

// router.route("/create").post(Table.create);

router.route("/change-status/:id").post(Table.changeStatus);

// router.route("/delete/:id").delete(checkAdmin, Table.deleteBar);

export default router;
