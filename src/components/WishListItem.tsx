import React, { useState } from "react";
import WishList from "../types/WishList";
import ProductCard from "./ProductCard";
import ProductQuantityControl from "./ProductQuantityControl";

interface WishListProps {
  wishList: WishList;
}

function WishListItem({ wishList }: WishListProps) {
  const [open, setOpen] = useState(false);
  function toggleOpen() {
    setOpen(!open);
  }

  return (
    <>
      <button className="list" onClick={toggleOpen}>
        {wishList.userFirstName}
      </button>
      {open && (
        <div className="content-container">
          {wishList.products.map((product) => (
            <div className="content" key={product.productDetail.id}>
              <ProductCard productDetail={product.productDetail} />
              <ProductQuantityControl />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default WishListItem;
