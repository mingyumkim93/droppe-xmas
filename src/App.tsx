import React, { useState, useEffect, useCallback, createContext, useReducer } from "react";
import api from "./api";
import AppBar from "./components/AppBar";
import Loading from "./components/Loading";
import Error from "./components/Error";
import CartApproval from "./components/WishListsApproval";
import WishList from "./types/WishList";
import { WishListsReducer, Action, ActionType } from "./reducers";

const emptyWishLists: WishList[] = [];
export const WishListsContext = createContext<{ wishLists: WishList[]; dispatch: React.Dispatch<Action> }>({
  wishLists: emptyWishLists,
  dispatch: () => null
});

function App() {
  //necessary assumption: fetch all carts will return carts from the user's 5 children.
  const [isLoading, setIsLoading] = useState(true);
  const [wishLists, dispatch] = useReducer(WishListsReducer, []);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchWishLists = useCallback(async () => {
    try {
      //TODO: put wishLists into context
      const wishLists = await api.getWishLists();
      dispatch({
        type: ActionType.SET,
        payload: { wishLists }
      });
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
    <WishListsContext.Provider value={{ wishLists, dispatch }}>
      <div className="App">
        <AppBar />
        {isLoading ? <Loading /> : errorMessage ? <Error message={errorMessage} /> : <CartApproval />}
      </div>
    </WishListsContext.Provider>
  );
}

export default App;
