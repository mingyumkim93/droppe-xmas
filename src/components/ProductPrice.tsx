import React from "react";

interface ProductPriceProps {
  price: string;
}

function ProductPrice({ price }: ProductPriceProps) {
  return <span>{price} €/Count</span>;
}

export default ProductPrice;
