import React from "react";
import WishLists from "components/WishLists";
import SideBar from "components/SideBar";
import Loading from "components/Loading";
import Error from "components/Error";
import useFakeStoreAPI, { useFakeStoreAPIParam } from "hooks/useFakeStoreAPI";

function WishListsApproval() {
  const { isLoading, errorMessage } = useFakeStoreAPI(useFakeStoreAPIParam.FETCH_WISHLISTS);

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
