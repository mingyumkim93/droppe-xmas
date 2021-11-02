import { render, screen } from "@testing-library/react";
import { fakeWishLists } from "__mock__";
import WishListItem from "./WishListItem";

describe("WishListItem", () => {
  it("is open by default and closed when user clicks the list button", () => {
    const wishList = fakeWishLists[0];
    const { container } = render(<WishListItem wishList={wishList} />);
    const listButton = screen.getByRole("button", { name: wishList.userFirstName });
    const expandedList = container.getElementsByClassName("expanded-wish-list")[0];
    expect(listButton).toBeInTheDocument();
    expect(expandedList).toBeVisible();

    listButton.click();
    expect(expandedList).not.toBeVisible();
  });
});
