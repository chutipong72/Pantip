const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true,
    unique: true,
  },
  room_type: {
    type: String,
    required: true,
  },
  check_in_date: {
    type: Date,
    required: true,
  },
  check_out_date: {
    type: Date,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  customer_name: {
    type: String,
    ref: "Customer",
    required: true,
  },
});
const OrderModel = new mongoose.model("Order", orderSchema);
module.exports = OrderModel;
