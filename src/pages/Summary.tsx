import React, { useCallback, useContext, useEffect, useState } from "react";
import "./Summary.scss";
import api from "api";
import { useHistory } from "react-router";
import { stageContext, WishListsContext } from "App";
import { Stages } from "reducers/stageReducer";
import SelectedWishSummary from "components/SelectedWishSummary";
import DiscardedWishSummary from "components/DiscardedWishSummary";
import Loading from "components/Loading";
import Error from "components/Error";
import { createSelectedItemsCarts, createDiscardedItemsCarts } from "utils/WishlistUtils";

function Summary() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { stage } = useContext(stageContext);
  const { wishLists } = useContext(WishListsContext);
  const history = useHistory();

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
    if (stage !== Stages.SUMMARY) history.push("/");
    else {
      postCarts();
    }
  }, [stage, history, postCarts]);

  return (
    <div className="page-container">
      {isLoading ? (
        <Loading />
      ) : errorMessage ? (
        <Error message={errorMessage} />
      ) : (
        <div className="summary-container">
          <h2 className="summary-title">Thank you for your approval!</h2>
          <div className="product-summary">
            <SelectedWishSummary />
            <DiscardedWishSummary />
          </div>
        </div>
      )}
    </div>
  );
}

export default Summary;
