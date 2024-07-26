import * as dotenv from "dotenv";
import products from "./data/products.js";
import connectDb from "./mongodb/connect.js";
import ProductModel from "./model/Product.js";

dotenv.config();

connectDb();

const importData = async () => {
  try {
    await ProductModel.deleteMany();
    await ProductModel.insertMany(products);
    console.log("Data imported successfully!");

    process.exit();
  } catch (error) {
    console.error("Error importing data: ", error);
    process.exit(1);
  }
};

importData();
