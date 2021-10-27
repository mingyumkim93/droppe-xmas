import React, { useContext } from "react";
import "./WishLists.scss";
import WishListItem from "./WishListItem";
import { WishListsContext } from "../App";

function WishLists() {
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
