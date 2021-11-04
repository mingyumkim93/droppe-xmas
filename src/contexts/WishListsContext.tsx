import React, { createContext, ReactNode, useReducer } from "react";
import { wishListsReducer, WishListsAction } from "reducers/wishListReducer";
import WishList from "types/WishList";

export const WishListsContext = createContext<{
  wishLists: WishList[];
  wishListsDispatch: React.Dispatch<WishListsAction>;
}>({
  wishLists: [],
  wishListsDispatch: () => null
});

interface WishListsProviderProps {
  children: ReactNode;
}

function WishListsProvider({ children }: WishListsProviderProps) {
  const [wishLists, wishListsDispatch] = useReducer(wishListsReducer, []);

  return <WishListsContext.Provider value={{ wishLists, wishListsDispatch }}>{children}</WishListsContext.Provider>;
}

export default WishListsProvider;
