import React, { useContext, useMemo, useState } from "react";
import { WishListsContext } from "../App";
import {
  getApprovedNumberSum,
  getFinalPrice,
  getTotalDiscount,
  getTotalPriceBeforeDiscount
} from "../utils/WishlistUtils";
import "./SideBar.scss";
import CheckOutModal from "./CheckOutModal";

function SideBar() {
  const { wishLists } = useContext(WishListsContext);
  const [modalOpen, setModalOpen] = useState(false);
  const totalItemNum = useMemo(() => getApprovedNumberSum(wishLists), [wishLists]);
  const totalBeforeDiscount = useMemo(() => getTotalPriceBeforeDiscount(wishLists), [wishLists]);
  const totalDiscount = useMemo(() => getTotalDiscount(wishLists), [wishLists]);
  const finalPrice = useMemo(() => getFinalPrice(wishLists), [wishLists]);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

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
      <button onClick={openModal}>Check out</button>
      {modalOpen && <CheckOutModal closeModal={closeModal} />}
    </div>
  );
}

export default SideBar;
