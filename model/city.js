import mongoose from "mongoose";
import District from "./district.js";
const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    district: [{
        name: {
            type: String,
            required: true
        },
        districtId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'District',
            required: true
        }
    }]
},
    { timestamps: true }
);

const model = mongoose.model("City", schema);
export const cityModel = model;

//@Function
const create = (data) => {
    return new Promise((resolve, reject) => {
      try {
        const newDocument = new model({
            name: data.name,
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

  const updateDistrict = async (cityId, districtId) => {
    const district = await District.findOne({_id: districtId});
    return new Promise((resolve, reject) => {
      try {
        model
          .findOneAndUpdate({ _id: cityId }, { $push: {district: {name: district.name, districtId: districtId}} }, { new: true })
            .then((document) => {
                resolve(document);
            })
            .catch((error) => {
                reject(error);
            });
        }catch(error){
            reject(error);
        }
    });
 }
  
  const City = {
    create, 
    findOne, 
    find, 
    deleteOne, 
    updateStatus, 
    updateDistrict
  };
  export default City;