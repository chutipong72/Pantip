import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDb from "./mongodb/connect.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const startServer = async () => {
  try {
    connectDb(process.env.MONGODB_URL);
    app.listen(process.env.PORT, () => {
      console.log("Starting server on port " + process.env.PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req, res) => {
  res.send("Hello, Pantip!");
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

const ProductModel = mongoose.model("Product", productSchema);

const cartItemSchema = new mongoose.Schema({
  product: productSchema,
  quantity: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema({
  items: [cartItemSchema],
});

const Cart = mongoose.model("Cart", cartSchema);

const orderSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  products: [productSchema],
});

const Order = mongoose.model("Order", orderSchema);

app.get("/products", async (req, res) => {
  let products = await ProductModel.find({});
  console.log("Products fetched successfully");
  res.send(products);
});

app.get("/products/:id", async (req, res) => {
  let productId = req.params.id;
  let product = await ProductModel.findById(productId);
  console.log("Product fetched successfully");
  res.send(product);
});

app.post("/addtocart", async (req, res) => {
  try {
    let cartId = req.body.cartId;
    let productId = req.body.productId;
    let quantity = req.body.quantity || 1;

    console.log(
      `Adding to cart: Cart ID = ${cartId}, Product ID = ${productId}, Quantity = ${quantity}`
    );

    let product = await ProductModel.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    let cart;
    if (cartId) {
      cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }

      let itemIndex = cart.items.findIndex((item) =>
        item.product._id.equals(productId)
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product, quantity });
      }
    } else {
      cart = new Cart({ items: [{ product, quantity }] });
    }

    let savedCart = await cart.save();
    console.log("Cart updated successfully");
    res.send(savedCart);
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(500).send("Failed to add to cart");
  }
});

app.post("/addOrder", async (req, res) => {
  const newOrder = new Order({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    products: req.body.products,
  });
  newOrder.save();
  res.json({
    success: 1,
    message: "Order added successfully",
  });
});

// Endpoint to fetch all orders
app.get("/orders", async (req, res) => {
  try {
    let orders = await Order.find({});
    console.log("Orders fetched successfully");
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).send("Failed to fetch orders");
  }
});

startServer();
