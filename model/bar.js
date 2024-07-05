import mongoose from "mongoose";
const { Schema } = mongoose;

const TYPE_HOLE = 1;
const TYPE_CAROM = 2;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    district_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'District',
        required: true
    },
    city_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
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
      required: false
    },
    amount_table_type_hole: {
      type: Number,
      required: true
    },
    amount_table_type_carom: {
      type: Number,
      required: true
    },
    tables: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Table' }],
    imageUrl: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    price: {
        type: Number,
        required: false
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
          amount_table_type_hole: data.amount_table_type_hole,
          amount_table_type_carom: data.amount_table_type_carom,
          address: data.address,
          district_id: data.district_id,
          city_id: data.city_id,
          owner: data.owner,
          like: 0,
          price: data.price,
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

  const updateTotalTable = async (barId, totalTable) => {
    try {
        const bar = await BarModel.findOne({ _id: barId });
        bar.amount_table = totalTable;
        await bar.save();
    } catch (error) {
        throw error;
    }
  }

  const updateType = async (barId, amountTableTypeHole, amountTableTypeCarom) => {
    try {
        const bar = await BarModel.findOne({ _id: barId });
        if (amountTableTypeHole >= amountTableTypeCarom) {
            bar.type = Bars.TYPE_HOLE;
        } else {
            bar.type = Bars.TYPE_CAROM;
        }
        await bar.save();
    } catch (error) {
        throw error;
    }
  }

  const Bars = {
    TYPE_HOLE,
    TYPE_CAROM,
    create, 
    findOne, 
    find, 
    deleteOne, 
    addTableIdForBar,
    updateTotalTable,
    updateType,
  };
  export default Bars;