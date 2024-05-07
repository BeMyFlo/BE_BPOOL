import mongoose from "mongoose";
const { Schema } = mongoose;


const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true  
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    like: {
      type: Number,
      required: false
    },
    amount_table: {
      type: Number,
      required: true
    },
    tables: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Table' }],
    imageUrl: {
        type: String,
        required: true
    },
},
    { timestamps: true }
);

const model = mongoose.model("Bar", schema);
export const BarModel = model;

//@Function
  const create = (data) => {
    return new Promise((resolve, reject) => {
      try {
        const newDocument = new model({
          name: data.name,
          content: data.content,
          imageUrl: data.imageUrl,
          amount_table: data.amount_table,
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

  const addTableIdForBar = async (barId, tablesList) => {
    try {
        const tablesInfo = await Promise.all(tablesList);
        const bar = await BarModel.findOne({ _id: barId });
        bar.tables = tablesInfo;
        await bar.save();
        return tablesInfo;
    } catch (error) {
        throw error;
    }
};

  const Bars = {
    create, 
    findOne, 
    find, 
    deleteOne, 
    addTableIdForBar
  };
  export default Bars;