import React, { useState } from "react";
import WishList from "../types/WishList";
import ProductCard from "./ProductCard";
import "./List.css";

interface ListProps {
  wishList: WishList;
}

function List({ wishList }: ListProps) {
  const [open, setOpen] = useState(false);
  function toggleOpen() {
    setOpen(!open);
  }

  return (
    <>
      <button className="list" onClick={toggleOpen}>
        {wishList.owner}
      </button>
      {open && (
        <div className="content">
          {wishList.products.map((product) => (
            <ProductCard productDetail={product.productDetail} key={product.productDetail.id} />
          ))}
        </div>
      )}
    </>
  );
}

export default List;
