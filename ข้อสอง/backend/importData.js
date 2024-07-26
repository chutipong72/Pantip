const dotenv = require("dotenv");
const customers = require("./data/customers");
const CustomerModel = require("./model/customer");
const OrderModel = require("./model/order");
const connectDb = require("./mongodb/connect.js");
const mongoose = require("mongoose");

dotenv.config();

async function importData() {
  try {
    await connectDb();
    await CustomerModel.deleteMany();
    const insertedCustomers = await CustomerModel.insertMany(customers);
    console.log("Customer imported successfully!");
    if (insertedCustomers.length === 0) {
      console.error("No customer found to associate with the order.");
      process.exit(1);
    }
    const orders = [];
    for (let i = 0; i < insertedCustomers.length; i++) {
      const customer = insertedCustomers[i];
      orders.push({
        order_id: (i + 1).toString(),
        room_type: i % 2 === 0 ? "Deluxe" : "Standard",
        check_in_date: new Date(),
        check_out_date: new Date(),
        total_price: i % 2 === 0 ? 500 : 300,
        customer_id: customer._id,
        customer_name: customer.customer_name,
      });
    }
    await OrderModel.deleteMany();
    await OrderModel.insertMany(orders);
    console.log("Orders imported successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error importing data: ", error);
    process.exit(1);
  }
}

importData();
