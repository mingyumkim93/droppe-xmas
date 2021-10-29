import React, { useContext } from "react";
import ProductDetail from "types/ProductDetail";
import { WishListsActionType } from "reducers/wishListReducer";
import { WishListsContext } from "App";

interface ProductAmountControlsProps {
  product: {
    productDetail: ProductDetail;
    quantity: number;
    approvedAmount: number;
  };
  cartId: number;
}

function ProductAmountControls({ product, cartId }: ProductAmountControlsProps) {
  const { wishListsDispatch } = useContext(WishListsContext);

  function increaseQuantity() {
    wishListsDispatch({ type: WishListsActionType.INCREASE, payload: { cartId, productId: product.productDetail.id } });
  }

  function decreaseQuantity() {
    wishListsDispatch({ type: WishListsActionType.DECREASE, payload: { cartId, productId: product.productDetail.id } });
  }

  return (
    <div>
      <button disabled={product.approvedAmount < 1} onClick={decreaseQuantity} className="control-button">
        -
      </button>
      {product.approvedAmount} / {product.quantity}
      <button onClick={increaseQuantity} className="control-button">
        +
      </button>
    </div>
  );
}

export default ProductAmountControls;
