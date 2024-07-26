import { Link } from "react-router-dom";
import "./item.css";
import { ShopContext } from "../../Context/shopContext";
import React, { useContext } from "react";

const Item = (props) => {
  const { addToCart } = useContext(ShopContext);
  return (
    <div className="item">
      <Link to={`/product/${props.id}`}>
        <img
          className="item-image"
          onClick={window.scrollTo(0, 0)}
          src={props.image}
          alt=""
        />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price">
          {props.price} Point | เหลือ {props.stock} ชิ้น
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          addToCart(props.id);
        }}
        className="button"
      >
        Add to cart
      </button>
    </div>
  );
};

export default Item;
