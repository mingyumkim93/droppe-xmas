import React, { useContext } from "react";
import { WishListsContext } from "../App";
import { ActionType } from "../reducers";
import ProductDetail from "../types/ProductDetail";
import "./ProductRow.css";

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
        <p>
          {product.productDetail.rating.rate}({product.productDetail.rating.count})
        </p>
      </div>
      <div>€{product.productDetail.price}</div>
      <button onClick={() => alert("create product detail dialog!")}>🔍</button>
      <div>
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
