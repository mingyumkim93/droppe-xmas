import { render, screen } from "@testing-library/react";
import { WishListsContext } from "App";
import { fakeWishLists } from "__mock__";
import DiscardedWishSummary from "./DiscardedWishSummary";

describe("DiscardedWishSummary", () => {
  it("should show 'none' if there is no discarded wish", () => {
    render(
      <WishListsContext.Provider value={{ wishLists: fakeWishLists, wishListsDispatch: () => {} }}>
        <DiscardedWishSummary />
      </WishListsContext.Provider>
    );
    expect(screen.getByText("None")).toBeInTheDocument();
  });
});
