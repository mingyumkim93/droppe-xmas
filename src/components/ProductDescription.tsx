import React, { useState } from "react";
import "./ProductDescription.css";

interface ProductDescriptionProps {
  description: string;
}

function ProductDescription({ description }: ProductDescriptionProps) {
  const [readMore, setReadMore] = useState(true);
  function toggleReadMore() {
    setReadMore(!readMore);
  }

  return (
    <div className="product-description">
      {readMore ? description.slice(0, 100) : description}
      <span onClick={toggleReadMore} className="read-more-or-less">
        {description.length > 100 ? (readMore ? " ...read more" : " show less") : ""}
      </span>
    </div>
  );
}

export default ProductDescription;
