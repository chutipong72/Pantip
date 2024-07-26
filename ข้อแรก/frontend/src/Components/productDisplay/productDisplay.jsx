import React, { useContext } from "react";
import "./productDisplay.css";
import { ShopContext } from "../../Context/shopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  return (
    <div className="product-display">
      <div className="product-left">
        <div className="product-main">
          <img className="productdisplay-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="product-right">
        <h1>{product.name}</h1>
        <p>{product.desc}</p>
        <div className="product-price">{product.price} Point</div>
        <div className="product-stock">
          เหลือ {product.stock} ชิ้น | คุณสามารถแลกได้สูงสุด 1 ชิ้น
        </div>
        <button
          type="button"
          onClick={() => {
            addToCart(product.id);
          }}
          className="button-right"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDisplay;
