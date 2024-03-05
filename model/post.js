import mongoose from "mongoose";
const { Schema } = mongoose;


const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true  
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    checkOwner: {
      type: Boolean,
      required: true,
      default: false,
    },
    like: {
      type: Number,
      required: false
    },
    imageUrl: {
        type: String,
        required: true
    },
},
    { timestamps: true }
);

const model = mongoose.model("Post", schema);
export const PostModel = model;

const create = (data) => {
    return new Promise((resolve, reject) => {
      try {
        const newDocument = new model({
          title: data.title,
          content: data.content,
          userId: data.userId,
          checkOwner: data.checkOwner,
          imageUrl: data.imageUrl,
        });
        newDocument
          .save()
          .then((createdDocument) => {
            resolve(createdDocument);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  };

  const findOne = (filter) => {
    return new Promise((resolve, reject) => {
        try{
            model
            .findOne({...filter})
            .then((document) => {
                resolve(document)
            })
            .catch((error) => {
                reject(error);
            });
        }catch(error){
            reject(error);
        }
    })
  }

  const find = (filter) => {
    return new Promise((resolve, reject) => {
      try {
        model
          .find({ ...filter})
          .then((documents) => {
            resolve(documents);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  };

  const deleteOne = (filter) => {
    return new Promise((resolve, reject) => {
      try {
        model
          .deleteOne(filter)
          .then((result) => {
            if (!result.deletedCount) {
              resolve(false);
            } else {
              resolve(true);
            }
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  };
  const Posts = {create, findOne, find, deleteOne};
  export default Posts;