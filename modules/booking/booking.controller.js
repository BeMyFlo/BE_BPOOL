import Booking from "../../model/booking.js";
import Discount from "../../model/discount.js";

export const createBooking = async(req,res) => {
    try{
        const discount = await Discount.findOne({ _id: req.body.discount });
        const priceDiscount = discount.price;
        
        let price = req.body.price;
        let priceDiscounted;
        
        if(discount){
            priceDiscounted = price - priceDiscount;
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