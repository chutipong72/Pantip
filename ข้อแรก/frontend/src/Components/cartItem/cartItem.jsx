import React, { useContext, useState } from "react";
import "./cartItem.css";
import { ShopContext } from "../../Context/shopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

const CartItem = () => {
  const {
    all_product,
    cartItem,
    removeFromCart,
    getTotalCartAmount,
    clearCart,
  } = useContext(ShopContext);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();

    console.log("Form Submitted", {
      data,
      products: all_product,
    });

    fetch("http://localhost:4000/addOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        products: all_product,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
    window.location.replace("/");
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItem[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>{e.price}</p>
                <button className="cartitems-quantity">{cartItem[e.id]}</button>
                <p>{e.price * cartItem[e.id]}</p>
                <img
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                  className="cartremove-icon"
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()} Point</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>{getTotalCartAmount()} Point</h3>
            </div>
          </div>
          <form onSubmit={submit}>
            <input
              required
              name="firstname"
              value={data.firstname}
              onChange={changeHandler}
              type="text"
              placeholder="First Name"
              className="input"
            />
            <input
              required
              name="lastname"
              value={data.lastname}
              onChange={changeHandler}
              type="text"
              placeholder="Last Name"
              className="input"
            />
            <button type="submit" onClick={clearCart}>
              CHECKOUT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
