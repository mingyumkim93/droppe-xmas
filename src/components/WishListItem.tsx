import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import "./WishListItem.scss";
import WishList from "types/WishList";
import ProductRow from "./ProductRow";
import CartPrice from "./CartPrice";

interface WishListProps {
  wishList: WishList;
}

function WishListItem({ wishList }: WishListProps) {
  const [open, setOpen] = useState(true);
  const growDiv = useRef() as MutableRefObject<HTMLDivElement>;
  const expandedList = useRef() as MutableRefObject<HTMLDivElement>;
  const [growDivHeight, setGrowDivHeight] = useState("auto");

  function toggleOpen() {
    setOpen(!open);
  }

  useEffect(() => {
    if (open) {
      setGrowDivHeight(expandedList.current.clientHeight + "px");
    } else setGrowDivHeight("0px");
  }, [open]);

  return (
    <>
      <button className="list" onClick={toggleOpen}>
        <div className="first-letter-capitalize">{wishList.userFirstName}</div>
        <span className="arrow-icon" style={{ transform: open ? "rotate(180deg)" : "" }}>
          ▼
        </span>
      </button>
      <div ref={growDiv} className="grow-div" style={{ height: growDivHeight }}>
        <div ref={expandedList} className="expanded-wish-list">
          {wishList.products.map((product) => (
            <ProductRow product={product} cartId={wishList.cartId} key={product.productDetail.id} />
          ))}
          <CartPrice wishList={wishList} />
        </div>
      </div>
    </>
  );
}

export default WishListItem;
