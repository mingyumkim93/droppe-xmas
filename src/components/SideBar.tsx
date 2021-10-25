import React, { useContext, useMemo } from "react";
import { WishListsContext } from "../App";
import { trimNumber } from "../utils/MathUtils";
import { getApprovedNumberSum, getTotalDiscount, getTotalPriceBeforeDiscount } from "../utils/WishlistUtils";
import "./SideBar.css";

function SideBar() {
  const { wishLists } = useContext(WishListsContext);
  const totalItemNum = useMemo(() => getApprovedNumberSum(wishLists), [wishLists]);
  const totalBeforeDiscount = useMemo(() => getTotalPriceBeforeDiscount(wishLists), [wishLists]);
  const totalDiscount = useMemo(() => getTotalDiscount(wishLists), [wishLists]);
  const finalPrice = useMemo(
    () => trimNumber(parseFloat(totalBeforeDiscount) - parseFloat(totalDiscount)),
    [totalBeforeDiscount, totalDiscount]
  );

  return (
    <div className="side-bar">
      <h4>Order summary</h4>
      <div>
        <div>Total of {totalItemNum} products</div>
        <div>
          <div>
            Total price: <b>{totalBeforeDiscount} €</b>
          </div>
          <div>
            Discount: <b>{totalDiscount} €</b>
          </div>
          <div>
            Final price: <b>{finalPrice} €</b>
          </div>
        </div>
      </div>
      <button>Proceed</button>
    </div>
  );
}

export default SideBar;
