const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  customer_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
const CustomerModel = new mongoose.model("Customer", customerSchema);
module.exports = CustomerModel;
