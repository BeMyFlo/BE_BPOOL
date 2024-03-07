import mongoose from "mongoose";
const { Schema } = mongoose;


const schema = new Schema({
  username: {
      type: String,
      required: true
  },
  password: {
      type: String,
      required: true
  },
  role: {
      type: String,
      required: true,
      enum: ['user', 'admin', 'owner'],
      default: 'user'
  },
}, { timestamps: true });

const model = mongoose.model("User", schema);
export const userModel = model;

const create = (data) => {
    return new Promise((resolve, reject) => {
      try {
        const newDocument = new model({
          username: data.username,
          password: data.encryptedPassword,
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
  const Users = {create, findOne, find, deleteOne};
  export default Users;