import { useState, useEffect, useContext, useCallback } from "react";
import { WishListsContext } from "contexts/WishListsContext";
import { getProductIdsFromCarts, createWishLists } from "utils/WishlistUtils";
import { createSelectedItemsCarts, createDiscardedItemsCarts } from "utils/WishlistUtils";
import { WishListsActionType } from "reducers/wishListReducer";
import api from "api";

export enum useFakeStoreAPIParam {
  FETCH_WISHLISTS = 0,
  POST_CARTS = 1
}

const GENERAL_ERROR_MESSAGE = "Something went wrong! Please try later.";

export default function useFakeStoreAPI(param: number) {
  const { wishLists, wishListsDispatch } = useContext(WishListsContext);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getWishLists = useCallback(async () => {
    try {
      const carts = await api.fetchCarts();
      const userIds = carts.map((cart) => cart.userId);
      const productIds = getProductIdsFromCarts(carts);
      const products = await api.fetchProductsByIds(productIds);
      const users = await api.fetchUsersByIds(userIds);
      const wishLists = createWishLists(carts, users, products);

      wishListsDispatch({
        type: WishListsActionType.SET,
        payload: { wishLists }
      });
    } catch (e) {
      setErrorMessage(GENERAL_ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  }, [wishListsDispatch]);

  const postCarts = useCallback(async () => {
    const selectedWishLists = createSelectedItemsCarts(wishLists);
    const discardedWishLists = createDiscardedItemsCarts(wishLists);
    try {
      await api.postCarts(selectedWishLists);
      await api.postCarts(discardedWishLists);
    } catch (e) {
      setErrorMessage("Something went wrong! Please try later.");
    } finally {
      setIsLoading(false);
    }
  }, [wishLists]);

  useEffect(() => {
    if (param === useFakeStoreAPIParam.FETCH_WISHLISTS) getWishLists();
  }, [param, getWishLists]);

  useEffect(() => {
    if (param === useFakeStoreAPIParam.POST_CARTS) postCarts();
  }, [param, postCarts]);

  return { isLoading, errorMessage };
}
