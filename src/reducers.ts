import React from "react";
import WishList from "./types/WishList";

export enum ActionType {
  SET = "set",
  INCREASE = "increase",
  DECREASE = "decrease"
}

export interface Action {
  type: ActionType;
  payload: {
    cartId?: number;
    productId?: number;
    wishLists?: WishList[];
  };
}

function changeQuantityByOne(wishLists: WishList[], action: Action) {
  return wishLists.map((wishList) => {
    if (wishList.cartId !== action.payload.cartId) return wishList;
    else {
      return {
        ...wishList,
        products: wishList.products.map((product) => {
          if (product.productDetail.id !== action.payload.productId) return product;
          else
            return {
              ...product,
              quantity: action.type === ActionType.INCREASE ? product.quantity + 1 : product.quantity - 1
            };
        })
      };
    }
  });
}

export const WishListsReducer: React.Reducer<WishList[], Action> = (state, action) => {
  switch (action.type) {
    case ActionType.SET:
      return action.payload.wishLists ? action.payload.wishLists : state;
    case ActionType.INCREASE: {
      return changeQuantityByOne(state, action);
    }
    case ActionType.DECREASE:
      return changeQuantityByOne(state, action);
    default:
      return state;
  }
};
