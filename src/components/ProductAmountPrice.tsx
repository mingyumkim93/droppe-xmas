import React, { useContext, useMemo } from "react";
import { WishListsContext } from "contexts/WishListsContext";
import ProductDetail from "types/ProductDetail";
import { getTotalApprovedNumberByProductId } from "utils/WishlistUtils";
import { trimNumber } from "utils/MathUtils";

interface ProductAmountPriceProps {
  product: {
    productDetail: ProductDetail;
    quantity: number;
    approvedAmount: number;
  };
}

function ProductAmountPrice({ product }: ProductAmountPriceProps) {
  const { wishLists } = useContext(WishListsContext);
  const totalApprovedNumber = useMemo(
    () => getTotalApprovedNumberByProductId(wishLists, product.productDetail.id),
    [wishLists, product]
  );

  return (
    <div>
      {product.approvedAmount === 0 ? (
        <b>{trimNumber(product.productDetail.price * product.approvedAmount) + " €"}</b>
      ) : totalApprovedNumber > 1 ? (
        <div>
          <s>{trimNumber(product.productDetail.price * product.approvedAmount) + " €"}</s>
          <b> {trimNumber(product.productDetail.price * product.approvedAmount * 0.9) + " €"}</b>
        </div>
      ) : (
        <b>{trimNumber(product.productDetail.price * product.approvedAmount) + " €"}</b>
      )}
    </div>
  );
}

export default ProductAmountPrice;
