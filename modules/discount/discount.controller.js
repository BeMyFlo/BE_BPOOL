import Discount from "../../model/discount.js";

export const createDiscount = async(req,res) => {
    try{
        const data = {
            barId: req.body.barId,
            price: req.body.price,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
        }
        const discount = await Discount.create(data);
        if(discount){
            res.status(200).json({success: true, data: discount});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi tạo mã giảm giá' });
    }
}