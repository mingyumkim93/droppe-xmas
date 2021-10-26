import React, { useContext, useMemo } from "react";
import { WishListsContext } from "../App";
import { WishListsActionType } from "../reducers";
import ProductDetail from "../types/ProductDetail";
import RatingStars from "./RatingStars";
import { trimNumber } from "../utils/MathUtils";
import "./ProductRow.css";
import ProductDescription from "./ProductDescription";
import { getTotalApprovedNumberByProductId } from "../utils/WishlistUtils";

interface ProductRowProps {
  product: {
    productDetail: ProductDetail;
    quantity: number;
    approvedAmount: number;
  };
  cartId: number;
}

function ProductRow({ product, cartId }: ProductRowProps) {
  const { wishLists, wishListsDispatch } = useContext(WishListsContext);
  const totalApprovedNumber = useMemo(
    () => getTotalApprovedNumberByProductId(wishLists, product.productDetail.id),
    [wishLists, product]
  );

  function increaseQuantity() {
    wishListsDispatch({ type: WishListsActionType.INCREASE, payload: { cartId, productId: product.productDetail.id } });
  }

  function decreaseQuantity() {
    wishListsDispatch({ type: WishListsActionType.DECREASE, payload: { cartId, productId: product.productDetail.id } });
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
      <div className="narrow-section">{product.productDetail.price.toFixed(2)} €/Count</div>
      <div className="narrow-section">
        <div>
          <button disabled={product.approvedAmount < 1} onClick={decreaseQuantity} className="control-button">
            -
          </button>
          {product.approvedAmount} / {product.quantity}
          <button onClick={increaseQuantity} className="control-button">
            +
          </button>
        </div>
        <div>
          {product.approvedAmount === 0 ? (
            <b>{trimNumber(product.productDetail.price * product.approvedAmount) + " €"}</b>
          ) : totalApprovedNumber > 1 ? (
            <div>
              <span className="before-discount">
                {trimNumber(product.productDetail.price * product.approvedAmount) + " €"}
              </span>
              <b> {trimNumber(product.productDetail.price * product.approvedAmount * 0.9) + " €"}</b>
            </div>
          ) : (
            <b>{trimNumber(product.productDetail.price * product.approvedAmount) + " €"}</b>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductRow;
