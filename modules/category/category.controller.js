import Category from "../../model/category.js";

export const list = async(req,res) => {
    const categorys = await Category.find({});
    res.status(200).json({success: true, data: categorys});
}
export const create = async(req,res) => {
    try{
        const data = {
            name: req.body.name,
            nameURL: req.body.nameURL,
        }
        // console.log(nameURL);
        const newCategory = await Category.create(data);
        res.status(200).json({success: true, data: newCategory});
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}