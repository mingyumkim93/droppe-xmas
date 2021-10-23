import React, { useContext, useMemo } from "react";
import { WishListsContext } from "../App";
import "./SideBar.css";

function SideBar() {
  const { wishLists } = useContext(WishListsContext);
  const approvedProductList = useMemo(() => {
    let approvedProductList: { id: number; title: string; quantity: number; price: number }[] = [];
    wishLists.forEach((wishList) => {
      wishList.products.forEach((product) => {
        const existingItem = approvedProductList.find((item) => item.id === product.productDetail.id);
        if (existingItem) {
          const index = approvedProductList.findIndex((item) => item.id === product.productDetail.id);
          approvedProductList[index] = {
            ...approvedProductList[index],
            quantity: approvedProductList[index].quantity + product.approvedAmount
          };
        } else if (product.approvedAmount > 0)
          approvedProductList.push({
            id: product.productDetail.id,
            title: product.productDetail.title,
            quantity: product.approvedAmount,
            price: product.productDetail.price
          });
      });
    });
    return approvedProductList;
  }, [wishLists]);

  const totalSum = useMemo(() => {
    let totalSum = 0;
    wishLists.forEach((wishList) => {
      wishList.products.forEach((product) => {
        totalSum += product.productDetail.price * product.approvedAmount;
      });
    });
    return trimNumber(totalSum);
  }, [wishLists]);

  const totalDiscount = useMemo(() => {
    let totalDiscount = 0;
    approvedProductList.forEach((product) => {
      if (product.quantity > 1) totalDiscount += product.quantity * (product.price / 10);
    });
    return trimNumber(totalDiscount);
  }, [approvedProductList]);

  const finalPrice = useMemo(
    () => trimNumber(parseFloat(totalSum) - parseFloat(totalDiscount)),
    [totalSum, totalDiscount]
  );

  function trimNumber(number: number) {
    return (Math.round(100 * number) / 100).toFixed(2);
  }

  return (
    <div className="side-bar">
      <div className="side-bar-top">
        <h4>List of products</h4>
        <ol>
          {approvedProductList.map((product) => (
            <li key={product.id}>
              {product.title} X {product.quantity}
              <div>
                {product.quantity > 1 ? (
                  <span>
                    <span className="before-discount">{trimNumber(product.price * product.quantity)}</span>
                    <b> {trimNumber(product.price * product.quantity - (product.price / 10) * product.quantity)}€</b>
                  </span>
                ) : (
                  <span>
                    <b>{trimNumber(product.price * product.quantity)}€</b>
                  </span>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="side-bar-bottom">
        <ul>
          <li>
            <b>Total sum: {totalSum}€</b>
          </li>
          <li>
            <b>Discount: {totalDiscount}€</b>
          </li>
          <li>
            <b>Final price: {finalPrice}€</b>
          </li>
        </ul>
        <button className="button-buy">Buy</button>
      </div>
    </div>
  );
}

export default SideBar;
