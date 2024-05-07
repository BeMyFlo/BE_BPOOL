import Bars from "../../model/bar.js";
import Table from "../../model/table.js";

export const getListBars = async(req,res) => {
    try{
        const bars = await Bars.find({});
        res.status(200).json({success: true, data: bars});
    }catch(error){
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi xem các bài viết' });
    }
}

export const create = async(req,res) => {
    try{
        const data = {
            name: req.body.name,
            content: req.body.content,
            imageUrl: req.body.imageUrl,
            amount_table: req.body.amount_table,
        }
        const newBar = await Bars.create(data);
        const tables = [];
        for(let i = 1; i <= req.body.amount_table; i++){
            const table = Table.create({
                bar_id: newBar._id,
                table_number: i, 
                status: Table.STATUS_AVAILABLE,
            });
            tables.push(table);
        }
        Bars.addTableIdForBar(newBar._id, tables);
        res.status(200).json({success: true, data: newBar});
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}


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