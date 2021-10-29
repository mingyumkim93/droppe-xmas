import React from "react";
import "./ProductRow.scss";
import ProductDetail from "types/ProductDetail";
import RatingStars from "./RatingStars";
import ProductDescription from "./ProductDescription";
import ProductAmountControls from "./ProductAmountControls";
import ProductAmountPrice from "./ProductAmountPrice";

interface ProductRowProps {
  product: {
    productDetail: ProductDetail;
    quantity: number;
    approvedAmount: number;
  };
  cartId: number;
}

function ProductRow({ product, cartId }: ProductRowProps) {
  return (
    <div
      //these css properties are not applied from css file for some reason.
      style={{ display: "flex", alignItems: "center", borderBottom: "1px solid black" }}
      className="product-container"
    >
      <img className="product-img" src={product.productDetail.image} alt="product" />
      <div className="wide-section">
        <b>{product.productDetail.title}</b>
        <RatingStars rating={product.productDetail.rating} />
      </div>
      <div className="wide-section">
        <ProductDescription description={product.productDetail.description} />
      </div>
      <div className="narrow-section">{product.productDetail.price.toFixed(2)} €/Count</div>
      <div className="narrow-section">
        <ProductAmountControls product={product} cartId={cartId} />
        <ProductAmountPrice product={product} />
      </div>
    </div>
  );
}

export default ProductRow;
