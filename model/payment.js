import mongoose from "mongoose";
const { Schema } = mongoose;

const PAYMENT_WAITING = 0;
const PAYMENT_SUCCESS = 1;

//method
const PAYMENT_METHOD_CASH = 1;
const PAYMENT_METHOD_BANK = 2;

const schema = new Schema({
    booking_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    },
    price: {
        type: Number,
        required: true
    },
    status_payment: {
        type: Number,
        required: true,
        default: PAYMENT_WAITING,
    },
    payment_method: {
        type: Number,
        required: true,
        default: PAYMENT_METHOD_CASH
    }
},
    { timestamps: true }
);

const model = mongoose.model("Payment", schema);
export const paymentModel = model;

//@Function
const create = (data) => {
    return new Promise((resolve, reject) => {
      try {
        const newDocument = new model({
            booking_id: data.booking_id,
            price: data.price,
            status_payment: data.status_payment,
            payment_method: data.payment_method
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

  const updateStatusPayment = async (idPayment, status) => {
      const payment = await Payment.findOne({_id: idPayment});
      if (!payment) {
          return false;
      }
      payment.status_payment = status;
      return payment.save();
  };
  
  const Payment = {
    PAYMENT_WAITING,
    PAYMENT_SUCCESS,
    PAYMENT_METHOD_CASH,
    PAYMENT_METHOD_BANK,
    create,
    findOne,
    find,
    deleteOne,
    updateStatusPayment,
  };
  export default Payment;