import React, { useState } from "react";
import "./WishListItem.css";
import WishList from "../types/WishList";
import ProductRow from "./ProductRow";
import CartPrice from "./CartPrice";

interface WishListProps {
  wishList: WishList;
}

function WishListItem({ wishList }: WishListProps) {
  const [open, setOpen] = useState(true);
  function toggleOpen() {
    setOpen(!open);
  }

  return (
    <>
      <button className="list" onClick={toggleOpen}>
        {wishList.userFirstName}
      </button>
      {open && (
        <div>
          {wishList.products.map((product) => (
            <ProductRow product={product} cartId={wishList.cartId} key={product.productDetail.id} />
          ))}
          <CartPrice wishList={wishList} />
        </div>
      )}
    </>
  );
}

export default WishListItem;
