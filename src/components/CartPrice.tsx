import React, { useContext, useMemo } from "react";
import { WishListsContext } from "../App";
import WishList from "../types/WishList";
import { getCartPrice } from "../utils/WishlistUtils";
import "./CartPrice.scss";

interface CardPriceProps {
  wishList: WishList;
}

function CartPrice({ wishList }: CardPriceProps) {
  const { wishLists } = useContext(WishListsContext);

  const price = useMemo(() => {
    return getCartPrice(wishLists, wishList);
  }, [wishLists, wishList]);
  return (
    <div className="cart-price">
      <div className="first-letter-capitalize">{wishList.userFirstName} </div>
      <b>{price} €</b>
    </div>
  );
}

export default CartPrice;
