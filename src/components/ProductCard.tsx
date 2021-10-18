import React from "react";
import ProductDetail from "../types/ProductDetail";
import "./ProductCard.css";

interface ProductCardProps {
  productDetail: ProductDetail;
}

function ProductCard({ productDetail }: ProductCardProps) {
  return (
    <div className="product-card">
      <h4>{productDetail.title}</h4>
      <img src={productDetail.image} alt="product" className="product-image" />
      <p>{productDetail.description}</p>
      {/* TODO: make rating component to show rating in stars */}
      <div className="rating">
        {productDetail.rating.rate}/5 ({productDetail.rating.count})
      </div>
      <p>€{productDetail.price}</p>
    </div>
  );
}

export default ProductCard;
