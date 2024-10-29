import mongoose from "mongoose";
import Payment from "./payment.js";
const { Schema } = mongoose;

const BOOKING_STATUS_PENDING = 1;
const BOOKING_STATUS_CONFIRMED = 2;
const BOOKING_STATUS_CANCELLED = 3;
const BOOKING_STATUS_COMPLETED = 4;
const BOOKING_STATUS_REJECT = 5;
const BOOKING_STATUS_REVERT = 6;
const BOOKING_WAITING_APPROVE_CANCEL = 7;

const schema = new Schema({
    bar_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bar'
    },
    table_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table'
    }],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Number,
        required: true
    },
    hour: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discount',
        default: null,
    },
    status: {
        type: Number,
        required: true,
        default: BOOKING_STATUS_PENDING,
    },
    payment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        default: null,
    },
    payment_method: {
        type: Number,
        required: true,
        default: Payment.PAYMENT_METHOD_CASH
    }
},
    { timestamps: true }
);

const model = mongoose.model("Booking", schema);
export const bookingModel = model;

//@Function
const create = (data) => {
    return new Promise((resolve, reject) => {
      try {
        const newDocument = new model({
            bar_id: data.barId,
            table_id: data.tableId,
            user_id: data.user_id,
            date: data.date,
            hour: data.hour,
            price: data.price,
            discount_id: data.discount_id,
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

  const updateStatusBooking = async (idBooking, status) => {
      const booking = await Booking.findOne({_id: idBooking});
      if (!booking) {
          return false;
      }
      booking.status = status;
      return booking.save();
  };

  const updatePaymentId = async (idBooking, idPayment) => {
      const booking = await Booking.findOne({_id: idBooking});
      if (!booking) {
          return false;
      }
      booking.payment_id = idPayment;
      return booking.save();
  }
  
  const Booking = {
    BOOKING_STATUS_PENDING,
    BOOKING_STATUS_CONFIRMED,
    BOOKING_STATUS_CANCELLED,
    BOOKING_STATUS_COMPLETED,
    BOOKING_STATUS_REJECT,
    BOOKING_STATUS_REVERT,
    BOOKING_WAITING_APPROVE_CANCEL,
    create,
    findOne,
    find,
    deleteOne,
    updateStatusBooking,
    updatePaymentId
  };
  export default Booking;