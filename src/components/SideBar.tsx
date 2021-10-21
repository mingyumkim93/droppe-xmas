import React, { useContext, useMemo } from "react";
import { WishListsContext } from "../App";
import "./SideBar.css";

function SideBar() {
  const { wishLists } = useContext(WishListsContext);
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
    wishLists.forEach((wishList) => {
      wishList.products.forEach((product) => {
        if (product.approvedAmount > 1)
          totalDiscount += trimNumber((product.productDetail.price / 10) * product.approvedAmount);
      });
    });
    return trimNumber(totalDiscount);
  }, [wishLists]);

  const finalPrice = useMemo(() => trimNumber(totalSum - totalDiscount), [totalSum, totalDiscount]);

  function trimNumber(number: number) {
    return Math.round(100 * number) / 100;
  }

  return (
    <div>
      <div className="side-bar">
        <ul>
          {wishLists.map((wishList) => (
            <li key={wishList.userId}>
              <b>{wishList.userFirstName}</b>
              <ol>
                {wishList.products.map((product) => (
                  <li key={product.productDetail.id}>
                    {product.productDetail.title} X {product.approvedAmount}
                    <div>
                      €
                      {product.approvedAmount > 1 ? (
                        <span>
                          <span className="before-discount">
                            {trimNumber(product.productDetail.price * product.approvedAmount)}
                          </span>
                          <b>
                            {trimNumber(
                              product.productDetail.price * product.approvedAmount -
                                (product.productDetail.price / 10) * product.approvedAmount
                            )}
                          </b>
                        </span>
                      ) : (
                        <span>
                          <b>{product.productDetail.price * product.approvedAmount}</b>
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
        <div>
          <div>Total sum: {totalSum}</div>
          <div>Discount: {totalDiscount}</div>
          <div>Final price: {finalPrice}</div>
          <button>Buy</button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
