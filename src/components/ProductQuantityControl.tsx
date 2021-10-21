import React, { useContext } from "react";
import { WishListsContext } from "../App";
import { ActionType } from "../reducers";

interface ProductQuantityControlProps {
  cartId: number;
  productId: number;
  currentQuantity: number;
}

function ProductQuantityControl({ cartId, productId, currentQuantity }: ProductQuantityControlProps) {
  const { dispatch } = useContext(WishListsContext);

  function increaseQuantity() {
    dispatch({ type: ActionType.INCREASE, payload: { cartId, productId } });
  }
  function decreaseQuantity() {
    dispatch({ type: ActionType.DECREASE, payload: { cartId, productId } });
  }
  return (
    <div>
      <button disabled={currentQuantity === 0} onClick={decreaseQuantity}>
        -
      </button>
      {currentQuantity}
      <button onClick={increaseQuantity}>+</button>
    </div>
  );
}

export default ProductQuantityControl;
