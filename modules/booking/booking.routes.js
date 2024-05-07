import { Router } from "express";
import * as Booking from "./booking.controller.js";
import checkLogin from "../../middlewares/checkLogin.js";
import checkAdmin from "../../middlewares/checkAdmin.js";
const router = new Router();


router.route("/create").post(checkLogin, Booking.createBooking);

// router.route("/create").post(Booking.create);

// router.route("/:id").get(Booking.detailBar);

// router.route("/delete/:id").delete(checkAdmin, Booking.deleteBar);

export default router;
