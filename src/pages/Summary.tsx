import React from "react";
import "./Summary.scss";
import SelectedWishSummary from "components/SelectedWishSummary";
import DiscardedWishSummary from "components/DiscardedWishSummary";
import Loading from "components/Loading";
import Error from "components/Error";
import useFakeStoreAPI, { useFakeStoreAPIParam } from "hooks/useFakeStoreAPI";

function Summary() {
  const { isLoading, errorMessage } = useFakeStoreAPI(useFakeStoreAPIParam.POST_CARTS);

  return (
    <main className="page-container">
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
    </main>
  );
}

export default Summary;
