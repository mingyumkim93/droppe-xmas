import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import api from "./api";
import Loading from "./components/Loading";
import Error from "./components/Error";
import CartApproval from "./components/WishListsApproval";

function App() {
  //necessary assumption: fetch all carts will return carts from the user's 5 children.
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchWishLists = useCallback(async () => {
    try {
      //TODO: put wishLists into context
      const wishLists = await api.getWishLists();
      setIsLoading(false);
    } catch (e) {
      setErrorMessage("Something went wrong! Please try later.");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWishLists();
  }, [fetchWishLists]);

  return (
    <div className="App">
      {isLoading ? <Loading /> : errorMessage ? <Error message={errorMessage} /> : <CartApproval />}
    </div>
  );
}

export default App;
