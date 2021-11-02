import { render, screen } from "@testing-library/react";
import { WishListsContext } from "App";
import { fakeWishLists } from "__mock__";
import SideBar from "./SideBar";

let SideBarContainer: HTMLElement;
beforeEach(() => {
  const { container } = render(
    <WishListsContext.Provider value={{ wishLists: fakeWishLists, wishListsDispatch: () => {} }}>
      <SideBar />
    </WishListsContext.Provider>
  );
  SideBarContainer = container;
});

describe("SideBar", () => {
  it("should show order summary", () => {
    expect(screen.getByText(new RegExp("Order summary"))).toBeInTheDocument();
    expect(screen.getByText(new RegExp("Total price"))).toBeInTheDocument();
    expect(screen.getByText(new RegExp("Discount"))).toBeInTheDocument();
    expect(screen.getByText(new RegExp("Final price"))).toBeInTheDocument();
  });

  it("should have check button", () => {
    const checkOutButton = SideBarContainer.getElementsByTagName("button");
    expect(checkOutButton.length).toBe(1);
    expect(checkOutButton[0].innerHTML).toBe("Check out");
  });
});
