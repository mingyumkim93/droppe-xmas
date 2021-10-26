import React, { useState, useCallback, useEffect, useContext } from "react";
import "./WishListsApproval.css";
import WishLists from "../components/WishLists";
import SideBar from "../components/SideBar";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { WishListsContext } from "../App";
import api from "../api";
import { WishListsActionType } from "../reducers";

function WishListsApproval() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { wishListsDispatch } = useContext(WishListsContext);

  const fetchWishLists = useCallback(async () => {
    try {
      const wishLists = await api.getWishLists();
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
    fetchWishLists();
  }, [fetchWishLists]);

  return (
    <div className="container">
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
