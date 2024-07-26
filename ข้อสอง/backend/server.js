const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const CustomerModel = require("./model/customer");
const OrderModel = require("./model/order");
const connectDb = require("./mongodb/connect.js");

dotenv.config();
connectDb();

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const orders = await OrderModel.find().populate("customer_id").exec();
    res.render("index", { orders });
  } catch (error) {
    console.error("Error fetching orders: ", error);
    res.status(500).send("Error fetching orders");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
