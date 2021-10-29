import React, { useContext } from "react";
import { WishListsContext } from "../App";
import { getDiscardedWishLists } from "../utils/WishlistUtils";

function DiscardedWishSummary() {
  const { wishLists } = useContext(WishListsContext);
  const discardedWishLists = getDiscardedWishLists(wishLists);

  return (
    <div>
      <h2>Discarded items</h2>
      {discardedWishLists.length > 0 ? (
        <div>
          {discardedWishLists.map((wishList) => (
            <div key={wishList.userId}>
              <div className="first-letter-capitalize">{wishList.userFirstName}</div>
              <ul>
                {wishList.products.map((product) => (
                  <li key={product.productDetail.id}>
                    {product.quantity - product.approvedAmount} X {product.productDetail.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div>None</div>
      )}
    </div>
  );
}

export default DiscardedWishSummary;
