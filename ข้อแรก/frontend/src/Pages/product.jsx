import React, { useContext } from "react";
import { ShopContext } from "../Context/shopContext";
import { useParams } from "react-router-dom";
import ProductDisplay from "../Components/productDisplay/productDisplay";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find(
    (product) => product.id === Number(productId)
  );

  return (
    <div>
      <ProductDisplay product={product} />
    </div>
  );
};

export default Product;
