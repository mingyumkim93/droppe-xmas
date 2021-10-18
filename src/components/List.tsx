import React, { useState } from "react";
import WishList from "../types/WishList";
import "./List.css";

interface ListProps {
  wishList: WishList;
}

function List({ wishList }: ListProps) {
  const [open, setOpen] = useState(false);
  function toggleOpen() {
    setOpen(!open);
  }

  return (
    <>
      <button className="list" onClick={toggleOpen}>
        {wishList.owner}
      </button>
      {open && <div className="content">show products here</div>}
    </>
  );
}

export default List;
