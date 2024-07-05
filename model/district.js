import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    city_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
        required: true
    },
},
    { timestamps: true }
);

const model = mongoose.model("District", schema);
export const districtModel = model;

//@Function
const create = (data) => {
    return new Promise((resolve, reject) => {
      try {
        const newDocument = new model({
            name: data.name,
            city_id: data.city_id
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

  const updateStatus = (id, newStatus) => {
    return new Promise((resolve, reject) => {
      try {
        model
          .findOneAndUpdate({ _id: id }, { status: newStatus }, { new: true })
          .then((document) => {
            resolve(document);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  }
  
  const District = {
    create, 
    findOne, 
    find, 
    deleteOne, 
    updateStatus, 
  };
  export default District;