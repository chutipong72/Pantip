import React from "react";
import "./product.css";
import all_product from "../Assets/all_product";
import Item from "../Item/item";

const Product = () => {
  return (
    <div className="product">
      <h1>สินค้าทั้งหมด</h1>
      <hr />
      <div className="product-item">
        {all_product.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
              stock={item.stock}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Product;
