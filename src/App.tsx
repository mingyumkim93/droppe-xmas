import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import WishList from "./types/WishList";
import api from "./api";

function App() {
  //necessary assumption: fetch all carts will return carts from the user's 5 children.
  const [isLoading, setIsLoading] = useState(true);
  const [wishLists, setWishLists] = useState<WishList[]>([]);

  const fetchWishLists = useCallback(async () => {
    const wishLists = await api.fetchWishLists();
    setWishLists(wishLists);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchWishLists();
  }, [fetchWishLists]);

  useEffect(() => {
    console.log(wishLists);
  }, [wishLists]);

  return <div className="App">App component</div>;
}

export default App;
