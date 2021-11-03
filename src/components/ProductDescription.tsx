import React, { useState } from "react";
import "./ProductDescription.scss";

interface ProductDescriptionProps {
  description: string;
}

function ProductDescription({ description }: ProductDescriptionProps) {
  const [readMore, setReadMore] = useState(true);
  function toggleReadMore() {
    setReadMore(!readMore);
  }

  return (
    <span className="product-description first-letter-capitalize">
      {readMore ? description.slice(0, 100) : description}
      <span onClick={toggleReadMore} className="read-more-or-less">
        {description.length > 100 ? (readMore ? " ...read more" : " show less") : ""}
      </span>
    </span>
  );
}

export default ProductDescription;
