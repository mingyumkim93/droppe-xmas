import { render, screen } from "@testing-library/react";
import { WishListsContext } from "App";
import { fakeWishLists } from "__mock__";
import SelectedWishSummary from "./SelectedWishSummary";

describe("SelectedWishSummary", () => {
  it("should show price summary when there is selected wish", () => {
    render(
      <WishListsContext.Provider value={{ wishLists: fakeWishLists, wishListsDispatch: () => {} }}>
        <SelectedWishSummary />
      </WishListsContext.Provider>
    );
    expect(screen.getByText(new RegExp("Before discount"))).toBeInTheDocument();
    expect(screen.getByText(new RegExp("Discount"))).toBeInTheDocument();
    expect(screen.getByText(new RegExp("To pay"))).toBeInTheDocument();
  });

  it("should show 'none' if there is no selected wish", () => {
    let allDiscardedWishLists = [...fakeWishLists];
    allDiscardedWishLists[0].products[0].approvedAmount = 0;
    render(
      <WishListsContext.Provider value={{ wishLists: allDiscardedWishLists, wishListsDispatch: () => {} }}>
        <SelectedWishSummary />
      </WishListsContext.Provider>
    );
    expect(screen.getByText("None")).toBeInTheDocument();
  });
});
