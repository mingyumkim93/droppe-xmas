import React from "react";
import "./ProductRow.scss";
import ProductDetail from "types/ProductDetail";
import RatingStars from "./RatingStars";
import ProductDescription from "./ProductDescription";
import ProductPrice from "./ProductPrice";
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
    <article
      //these css properties are not applied from css file for some reason.
      style={{ display: "flex", alignItems: "center", borderBottom: "1px solid black" }}
      className="product-container"
    >
      <img className="product-img" src={product.productDetail.image} alt="product" />
      <section className="wide-section">
        <b>{product.productDetail.title}</b>
        <RatingStars rating={product.productDetail.rating} />
      </section>
      <section className="wide-section">
        <ProductDescription description={product.productDetail.description} />
      </section>
      <section className="narrow-section">
        <ProductPrice price={product.productDetail.price.toFixed(2)} />
      </section>
      <section className="narrow-section">
        <ProductAmountControls product={product} cartId={cartId} />
        <ProductAmountPrice product={product} />
      </section>
    </article>
  );
}

export default ProductRow;
