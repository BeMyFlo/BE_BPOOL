import City from "../../model/city.js";

export const create = async(req,res) => {
    try{
        const data = {
            name: req.body.name,
        }
        const city = await City.create(data);
        if(city){
            res.status(200).json({success: true, data: city});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi tạo' });
    }
}

export const getListCity = async (req, res) => {
    try {
        let cities = await City.find();
        res.status(200).json({ success: true, data: cities });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi xem các bài viết' });
    }
}

export const getCityById = async(req, res) => {
    try{
        const city = await City.findOne({ _id: req.params.id });
        res.status(200).json({ success: true, data: city });
    }catch(error){
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi xem chi tiết' });
    }
}