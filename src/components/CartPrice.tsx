import React, { useMemo } from "react";
import WishList from "../types/WishList";
import "./CartPrice.css";

interface CardPriceProps {
  wishList: WishList;
}

function CartPrice({ wishList }: CardPriceProps) {
  const price = useMemo(() => {
    let price = 0;
    wishList.products.forEach((product) => (price += product.approvedAmount * product.productDetail.price));
    return price;
  }, [wishList]);
  return (
    <div className="cart-price">
      <div className="name">{wishList.userFirstName} </div>
      <b>{price.toFixed(2)}€</b>
    </div>
  );
}

export default CartPrice;
