import { Router } from "express";
import * as Booking from "./booking.controller.js";
import checkLogin from "../../middlewares/checkLogin.js";
import checkAdmin from "../../middlewares/checkAdmin.js";
const router = new Router();


router.route("/create").post(checkLogin, Booking.createBooking);

router.route("/list").get(checkLogin, Booking.getListBookingByUserId);

router.route("/update-status/:id").put(checkAdmin, Booking.updateStatusBooking);

router.route("/cancel").post(checkLogin, Booking.cancelBooking);

router.route("/list-booking-waiting-approve").get(checkAdmin, Booking.getListBookingWaitingApproveCancel);

router.route("/approve-cancel/:id").post(checkAdmin, Booking.approveCancelBooking);

router.route("/revenue").get(checkAdmin, Booking.getRevenue);

export default router;
