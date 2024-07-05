import City from "../../model/city.js";
import District from "../../model/district.js";

export const create = async(req,res) => {
    try{
        const data = {
            name: req.body.name,
            city_id: req.body.city_id
        }
        const district = await District.create(data);
        await City.updateDistrict(req.body.city_id, district._id);

        if(district){
            res.status(200).json({success: true, data: district});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi tạo' });
    }
}