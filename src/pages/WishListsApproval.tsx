import React, { useState, useCallback, useEffect, useContext } from "react";
import api from "api";
import WishLists from "components/WishLists";
import SideBar from "components/SideBar";
import Loading from "components/Loading";
import Error from "components/Error";
import { WishListsContext } from "contexts/WishListsContext";
import { WishListsActionType } from "reducers/wishListReducer";
import { getProductIdsFromCarts, createWishLists } from "utils/WishlistUtils";

function WishListsApproval() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { wishListsDispatch } = useContext(WishListsContext);

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
      setErrorMessage("Something went wrong! Please try later.");
    } finally {
      setIsLoading(false);
    }
  }, [wishListsDispatch]);

  useEffect(() => {
    getWishLists();
  }, [getWishLists]);

  return (
    <main className="page-container">
      {isLoading ? (
        <Loading />
      ) : errorMessage ? (
        <Error message={errorMessage} />
      ) : (
        <>
          <WishLists />
          <SideBar />
        </>
      )}
    </main>
  );
}

export default WishListsApproval;
