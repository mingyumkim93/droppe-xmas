import React from "react";
import WishList from "../types/WishList";
import List from "./List";

interface WishListContainerProps {
  wishLists: WishList[];
}
function WishListContainer({ wishLists }: WishListContainerProps) {
  return (
    <div>
      {wishLists.map((wishList) => (
        <List wishList={wishList} key={wishList.owner} />
      ))}
    </div>
  );
}

export default WishListContainer;
