import React, { useContext, useMemo } from "react";
import "./CartPrice.scss";
import { WishListsContext } from "contexts/WishListsContext";
import WishList from "types/WishList";
import { getCartPrice } from "utils/WishlistUtils";

interface CartPriceProps {
  wishList: WishList;
}

function CartPrice({ wishList }: CartPriceProps) {
  const { wishLists } = useContext(WishListsContext);

  const price = useMemo(() => {
    return getCartPrice(wishLists, wishList);
  }, [wishLists, wishList]);

  return (
    <section className="cart-price">
      <div className="first-letter-capitalize">{wishList.userFirstName} </div>
      <b>{price} €</b>
    </section>
  );
}

export default CartPrice;
