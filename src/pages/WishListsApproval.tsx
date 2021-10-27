import React, { useState, useCallback, useEffect, useContext } from "react";
import "./WishListsApproval.scss";
import WishLists from "../components/WishLists";
import SideBar from "../components/SideBar";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { WishListsContext } from "../App";
import api from "../api";
import { WishListsActionType } from "../reducers";
import { getProductIdsFromCarts, createWishLists } from "../utils/WishlistUtils";

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
      setIsLoading(false);
    } catch (e) {
      setErrorMessage("Something went wrong! Please try later.");
      setIsLoading(false);
    }
  }, [wishListsDispatch]);

  useEffect(() => {
    getWishLists();
  }, [getWishLists]);

  return (
    <div className="page-container">
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
    </div>
  );
}

export default WishListsApproval;
