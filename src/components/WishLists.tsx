import React from "react";
import "./WishListItem.css";
import WishList from "../types/WishList";
import WishListItem from "./WishListItem";

function WishLists() {
  //get wishlist from context
  //loop each cart to UI
  const wishLists: WishList[] = [];
  return (
    <div>
      {wishLists.map((wishList) => (
        <WishListItem wishList={wishList} />
      ))}
    </div>
  );
}

export default WishLists;
