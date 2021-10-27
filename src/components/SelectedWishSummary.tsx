import React, { useContext } from "react";
import { WishListsContext } from "../App";
import {
  getCartPrice,
  getSelectedWishLists,
  getTotalPriceBeforeDiscount,
  getTotalDiscount,
  getFinalPrice
} from "../utils/WishlistUtils";

function SelectedWishSummary() {
  const { wishLists } = useContext(WishListsContext);
  const selectedWishLists = getSelectedWishLists(wishLists);
  const totalPriceBeforeDiscount = getTotalPriceBeforeDiscount(wishLists);
  const totalDiscount = getTotalDiscount(wishLists);
  const finalPrice = getFinalPrice(wishLists);

  return (
    <div>
      <h2>Selected</h2>
      {selectedWishLists.length > 0 ? (
        <div>
          {selectedWishLists.map((wishList) => (
            <div key={wishList.userId}>
              <div className="first-letter-capitalize">{wishList.userFirstName}</div>
              <ul>
                {wishList.products.map((product) => (
                  <li key={product.productDetail.id}>
                    {product.approvedAmount} X {product.productDetail.title}
                  </li>
                ))}
              </ul>
              <div className="cart-price">
                <b>{getCartPrice(wishLists, wishList)} €</b>
              </div>
            </div>
          ))}
          <div className="cost-summary">
            <b>Before discount: {totalPriceBeforeDiscount} €</b>
            <b>Discounts: {totalDiscount} €</b>
            <b>To pay: {finalPrice} €</b>
          </div>
        </div>
      ) : (
        <div>None</div>
      )}
    </div>
  );
}

export default SelectedWishSummary;
