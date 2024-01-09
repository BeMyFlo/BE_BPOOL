import Products from "../../model/product.js";

export const list = async(req,res) => {
    const products = await Products.find({});
    res.status(200).json({success: true, data: products});
}
export const create = async(req,res) => {
    try{
        const data = {
            name: req.body.name,
            quantity: req.body.quantity,
            price: req.body.price,
            available: req.body.available,
        }
        const newProduct = await Products.create(data);
        res.status(200).json({success: true, data: newProduct});
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}


export const oneProduct = async(req,res) => {
    const id = req.params.id;
    const product = await Products.findOne({_id: id});
    res.status(200).json({success: true, data: product});

}