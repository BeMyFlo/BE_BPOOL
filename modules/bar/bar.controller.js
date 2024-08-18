import Bars from "../../model/bar.js";
import Table from "../../model/table.js";
import * as BarService from "./bar.service.js";

/**
 * Lấy ra danh sách các quán (Trang chủ)
 * @param {*} req 
 * @param {*} res 
 */
export const getListBars = async (req, res) => {
    try {
        let filter = {};
        const city = req.query.city;
        if (city) {
            filter.city_id = city;
        }
        const district = req.query.district;
        if (district) {
            filter.district_id = district;
        }
        const type = req.query.type;
        if (type) {
            filter.type = type;
        }
        let bars = await Bars.find(filter);
        res.status(200).json({ success: true, data: bars });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi xem các bài viết' });
    }
}

/**
 * Lấy ra danh sách các quán bida theo type
 * @param {*} req 
 * @param {*} res 
 */
export const getListBarsByType = async (req, res) => {
    try {
        let filter = {};
        const city = req.query.city;
        if (city) {
            filter.city_id = city;
        }
        const district = req.query.district;
        if (district) {
            filter.district_id = district;
        }
        const type = req.query.type;
        if (type) {
            filter.type = type;
        }
        let bars = await Bars.find(filter);
        res.status(200).json({ success: true, data: bars });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi xem các bài viết' });
    }
}


/**
 * Tạo quán bida mới
 * @param {*} req 
 * @param {*} res 
 */
export const create = async(req,res) => {
    try{
        const data = {
            name: req.body.name,
            content: req.body.content,
            imageUrl: req.body.imageUrl,
            amount_table_type_hole: req.body.amount_table_type_hole,
            amount_table_type_carom: req.body.amount_table_type_carom,
            address: req.body.address,
            district_id: req.body.district_id,
            city_id: req.body.city_id,
            owner: req.body.owner,
            like: 0,
            price: req.body.price,
        }
        const newBar = await Bars.create(data);
        const totalTable = newBar.amount_table_type_hole + newBar.amount_table_type_carom;
        Bars.updateTotalTable(newBar._id, totalTable);
        Bars.updateType(newBar._id, newBar.amount_table_type_hole, newBar.amount_table_type_carom);
        BarService.createTable(newBar);
        res.status(200).json({success: true, data: newBar});
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}

/**
 * Xem chi tiết quán bida
 * @param {*} req 
 * @param {*} res 
 */
export const detailBar = async(req,res) => {
    try{
        const bar = await Bars.findOne({_id: req.params.id});
        if(bar){
            res.status(200).json({success: true, data: bar});
        }else {
            res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
        }
    }catch(error){
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi xem bài viết' });
    }

}

/**
 * Xóa quán bida
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const deleteBar = async (req, res) => {
    try {
        const bar = await Bars.findOne({ _id: req.params.id, userId: req.user._id });
        if (!bar) {
            return res.status(403).json({ success: false, message: 'Không có quyền xóa bài viết' });
        }
        await Bars.deleteOne({ _id: req.params.id });
        res.status(200).json({ success: true, message: 'Xóa bài viết thành công' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi xóa bài viết' });
    }
};