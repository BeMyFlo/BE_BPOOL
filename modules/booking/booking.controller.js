import Booking from "../../model/booking.js";
import Discount from "../../model/discount.js";

/**
 * Tạo booking
 * @param {*} req 
 * @param {*} res 
 */
export const createBooking = async(req,res) => {
    try{
        const discount = await Discount.findOne({ _id: req.body.discount });
        let priceDiscounted = req.body.price;
        if (discount) {
            const priceDiscount = discount.price;
            
            priceDiscounted = priceDiscounted - priceDiscount;
        }

        const data = {
            barId: req.body.barId,
            tableId: req.body.tableId,
            userId: req.user._id,
            check_in_time: req.body.check_in_time,
            time: req.body.time,
            discount: req.body.discount,
            price: priceDiscounted,
        }
        const booking = await Booking.create(data);
        if(booking){
            res.status(200).json({success: true, data: booking});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi đặt bàn' });
    }
}

/**
 * Lấy ra danh sách booking của 1 user (Xem lịch sử đặt bàn)
 * @param {*} req 
 * @param {*} res 
 */
export const getListBookingByUserId = async(req,res) => {
    try{
        const bookings = await Booking.find({ userId: req.user._id });
        res.status(200).json({ success: true, data: bookings });
    }catch(error){
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi xem danh sách booking' });
    }
}

/**
 * Cập nhật trạng thái booking
 * @param {*} req 
 * @param {*} res 
 */
export const updateStatusBooking = async(req,res) => {
    try{
        const updatedBooking = await Booking.updateStatusBooking(req.params.id, req.body.status);
        res.status(200).json({ success: true, data: updatedBooking });
    }
    catch(error){
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi cập nhật trạng thái booking' });
    }
}

/**
 * Hủy booking
 * - Hủy sẽ trở thành chờ phê duyệt
 * @param {*} req 
 * @param {*} res 
 */
export const cancelBooking = async(req,res) => {
    try{
        const bookingUpdated = await Booking.updateStatusBooking(req.params.id, Booking.BOOKING_WAITING_APPROVE_CANCEL)
        if (bookingUpdated) {
            res.status(200).json({ success: true, data: bookingUpdated });
        } else {
            res.status(404).json({ success: false, message: 'Đã xảy ra lỗi khi hủy booking' });
        }
    }
    catch(error){
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi hủy booking' });
    }
}

/**
 * Lấy ra danh sách booking chờ phê duyệt hủy
 * @param {*} req 
 * @param {*} res 
 */
export const getListBookingWaitingApproveCancel = async(req,res) => {
    try{
        const bookings = await Booking.find({ status: Booking.BOOKING_WAITING_APPROVE_CANCEL });
        res.status(200).json({ success: true, data: bookings });
    }catch(error){
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi xem danh sách booking' });
    }
}

/**
 * Phê duyệt hủy booking
 * @param {*} req 
 * @param {*} res 
 */
export const approveCancelBooking = async(req,res) => {
    try{
        const bookingUpdated = await Booking.updateStatusBooking(req.params.id, Booking.BOOKING_STATUS_CANCELLED)
        if (bookingUpdated) {
            res.status(200).json({ success: true, data: bookingUpdated });
        } else {
            res.status(404).json({ success: false, message: 'Đã xảy ra lỗi khi hủy booking' });
        }
    }
    catch(error){
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi hủy booking' });
    }
}

/** Lấy thống kê thu nhập của quán
 * @param {*} req
 * @param {*} res
 */
export const getRevenue = async(req,res) => {
    try{
        const bookings = await Booking.find({ barId: req.body.barId });
        let totalIncome = 0;
        bookings.forEach(booking => {
            totalIncome += booking.price;
        });
        res.status(200).json({ success: true, data: totalIncome });
    }catch(error){
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi xem tổng thu nhập' });
    }
}