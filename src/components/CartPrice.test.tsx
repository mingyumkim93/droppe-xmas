import { render, screen } from "@testing-library/react";
import CartPrice from "./CartPrice";
import { fakeWishLists } from "__mock__";
import { getCartPrice } from "../utils/WishlistUtils";
import { WishListsContext } from "contexts/WishListsContext";

describe("CartPrice", () => {
  it("should show firstname and total price of wish list", () => {
    const wishLists = fakeWishLists;
    const wishList = wishLists[0];
    const cartPrice = getCartPrice(fakeWishLists, wishList);

    render(
      <WishListsContext.Provider value={{ wishLists, wishListsDispatch: () => {} }}>
        <CartPrice wishList={wishList} />
      </WishListsContext.Provider>
    );

    expect(screen.getByText(wishList.userFirstName)).toBeInTheDocument();
    expect(screen.getByText(cartPrice + " €")).toBeInTheDocument();
  });
});
