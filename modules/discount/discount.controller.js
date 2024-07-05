import Discount from "../../model/discount.js";

/**
 * Tạo mã giảm giá
 * @param {*} req 
 * @param {*} res 
 */
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

/**
 * Lấy danh sách tất cả các mã giảm giá
 * @param {*} req 
 * @param {*} res 
 */
export const getListDiscount = async (req, res) => {
    try {
        let discounts = await Discount.find();
        res.status(200).json({ success: true, data: discounts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi xem các bài viết' });
    }
}

/**
 * Lấy mã giảm giá theo id
 * @param {*} req 
 * @param {*} res 
 */
export const getDiscountById = async(req, res) => {
    try{
        const discount = await Discount.findOne({ _id: req.params.id });
        res.status(200).json({ success: true, data: discount });
    }catch(error){
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi xem chi tiết' });
    }
}

/**
 * Lấy danh sách mã giảm giá của 1 quán bida
 * @param {*} req 
 * @param {*} res 
 */
export const getListDiscountByBarId = async(req, res) => {
    try{
        const discounts = await Discount.find({ barId: req.params.barId });
        res.status(200).json({ success: true, data: discounts });
    }catch(error){
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi xem danh sách mã giảm giá' });
    }
}