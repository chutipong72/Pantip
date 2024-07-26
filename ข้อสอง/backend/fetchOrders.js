const { MongoClient } = require("mongodb");

async function fetchOrders() {
  const url =
    "mongodb+srv://chutipong:snkuXJpD2iYHgEUI@cluster0.r0m1g98.mongodb.net/pantip";
  const client = new MongoClient(url);

  try {
    await client.connect();
    const database = client.db("pantip");
    const orders = database.collection("orders");
    const customers = database.collection("customers");

    const results = await orders
      .aggregate([
        {
          $lookup: {
            from: "customers",
            localField: "customer_id",
            foreignField: "_id",
            as: "customer_info",
          },
        },
        {
          $unwind: "$customer_info",
        },
      ])
      .toArray();

    if (results.length > 0) {
      results.forEach((order) => {
        console.log(`Order ID: ${order.order_id}`);
        console.log(`Room Type: ${order.room_type}`);
        console.log(`Check-in Date: ${order.check_in_date}`);
        console.log(`Check-out Date: ${order.check_out_date}`);
        console.log(`Total Price: ${order.total_price}`);
        console.log(`Customer Name: ${order.customer_info.customer_name}`);
        console.log(`Customer Email: ${order.customer_info.email}`);
        console.log("---------------------------");
      });
    } else {
      console.log("ไม่มีรายการ");
    }
  } finally {
    await client.close();
  }
}

fetchOrders().catch(console.error);
