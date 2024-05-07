import mongoose from "mongoose";
const { Schema } = mongoose;

const STATUS_AVAILABLE = 1;

const schema = new Schema({
    bar_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bar'
    },
    table_number: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true,
        default: "available"
    }
},
    { timestamps: true }
);

const model = mongoose.model("Table", schema);
export const tableModel = model;

//@Function
const create = (data) => {
    return new Promise((resolve, reject) => {
      try {
        const newDocument = new model({
          bar_id: data.bar_id,
          table_number: data.table_number,
          status: data.status,
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
  
  const Tables = {
    create, 
    findOne, 
    find, 
    deleteOne, 
    updateStatus, 
    STATUS_AVAILABLE
  };
  export default Tables;