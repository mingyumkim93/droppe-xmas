import React, { useContext } from "react";
import { WishListsContext } from "../App";
import { ActionType } from "../reducers";
import ProductDetail from "../types/ProductDetail";
import RatingStars from "./RatingStars";
import "./ProductRow.css";
import ProductDescription from "./ProductDescription";

interface ProductRowProps {
  product: {
    productDetail: ProductDetail;
    quantity: number;
    approvedAmount: number;
  };
  cartId: number;
}

function ProductRow({ product, cartId }: ProductRowProps) {
  const { dispatch } = useContext(WishListsContext);

  function increaseQuantity() {
    dispatch({ type: ActionType.INCREASE, payload: { cartId, productId: product.productDetail.id } });
  }
  function decreaseQuantity() {
    dispatch({ type: ActionType.DECREASE, payload: { cartId, productId: product.productDetail.id } });
  }

  return (
    <div
      //these css properties are not applied from css file for some reason.
      style={{ display: "flex", alignItems: "center", borderBottom: "1px solid black" }}
      className="product-container"
    >
      <img src={product.productDetail.image} alt="product" />
      <div className="wide-section">
        <b>{product.productDetail.title}</b>
        <RatingStars rating={product.productDetail.rating} />
      </div>
      <div className="wide-section">
        <ProductDescription description={product.productDetail.description} />
      </div>
      <div className="narrow-section">{product.productDetail.price} €/Count</div>
      <div className="narrow-section">
        <button disabled={product.approvedAmount < 1} onClick={decreaseQuantity} className="control-button">
          -
        </button>
        {product.approvedAmount} / {product.quantity}
        <button onClick={increaseQuantity} className="control-button">
          +
        </button>
      </div>
    </div>
  );
}

export default ProductRow;
