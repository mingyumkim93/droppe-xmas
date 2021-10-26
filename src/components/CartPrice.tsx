import React, { useContext, useMemo } from "react";
import { WishListsContext } from "../App";
import WishList from "../types/WishList";
import { trimNumber } from "../utils/MathUtils";
import { getTotalApprovedNumberByProductId } from "../utils/WishlistUtils";
import "./CartPrice.css";

interface CardPriceProps {
  wishList: WishList;
}

function CartPrice({ wishList }: CardPriceProps) {
  const { wishLists } = useContext(WishListsContext);

  const price = useMemo(() => {
    let price = 0;
    wishList.products.forEach((product) => {
      if (getTotalApprovedNumberByProductId(wishLists, product.productDetail.id) > 1)
        price += product.approvedAmount * product.productDetail.price * 0.9;
      else price += product.approvedAmount * product.productDetail.price;
    });
    return price;
  }, [wishLists, wishList]);
  return (
    <div className="cart-price">
      <div className="first-letter-capitalize">{wishList.userFirstName} </div>
      <b>{trimNumber(price)} €</b>
    </div>
  );
}

export default CartPrice;
