import React, { useContext } from "react";
import "./WishLists.css";
import WishListItem from "./WishListItem";
import { WishListsContext } from "../App";

function WishLists() {
  //get wishlist from context
  //loop each cart to UI

  const { wishLists } = useContext(WishListsContext);
  return (
    <div className="wish-lists">
      {wishLists.map((wishList) => (
        <WishListItem wishList={wishList} key={wishList.userId} />
      ))}
    </div>
  );
}

export default WishLists;
