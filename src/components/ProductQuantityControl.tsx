import React, { useContext } from "react";
import { WishListsContext } from "../App";
import { ActionType } from "../reducers";

interface ProductQuantityControlProps {
  cartId: number;
  productId: number;
  quantity: number;
  approvedAmount: number;
}

function ProductQuantityControl({ cartId, productId, quantity, approvedAmount }: ProductQuantityControlProps) {
  const { dispatch } = useContext(WishListsContext);

  function increaseQuantity() {
    dispatch({ type: ActionType.INCREASE, payload: { cartId, productId } });
  }
  function decreaseQuantity() {
    dispatch({ type: ActionType.DECREASE, payload: { cartId, productId } });
  }
  return (
    <div>
      <button disabled={approvedAmount === 0} onClick={decreaseQuantity}>
        -
      </button>
      {/* TODO: consider indicating more than wished amount */}
      {approvedAmount} / {quantity}
      <button onClick={increaseQuantity}>+</button>
    </div>
  );
}

export default ProductQuantityControl;
