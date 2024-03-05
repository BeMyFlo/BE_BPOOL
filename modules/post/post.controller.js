import Posts from "../../model/post.js";

export const list = async(req,res) => {
    const posts = await Posts.find({});
    res.status(200).json({success: true, data: posts});
}
export const create = async(req,res) => {
    try{
        const data = {
            title: req.body.title,
            content: req.body.content,
            userId: req.body.userId,
            checkOwner: req.body.checkOwner,
            imageUrl: req.body.imageUrl,
        }
        const newPost = await Posts.create(data);
        res.status(200).json({success: true, data: newPost});
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}


export const detailPost = async(req,res) => {
    const id = req.params.id;
    const post = await Posts.findOne({_id: id});
    res.status(200).json({success: true, data: post});
}