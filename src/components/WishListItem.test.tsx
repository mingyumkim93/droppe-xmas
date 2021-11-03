import { act, render, screen } from "@testing-library/react";
import { fakeWishLists } from "__mock__";
import WishListItem from "./WishListItem";

describe("WishListItem", () => {
  it("has grow-div height auto by default and the height become 0 when user clicks button", async () => {
    await act(async () => {
      const wishList = fakeWishLists[0];
      const { container } = render(<WishListItem wishList={wishList} />);
      const listButton = screen.getByRole("button", { name: new RegExp(wishList.userFirstName) });
      expect(listButton).toBeInTheDocument();
      const growDiv = container.getElementsByClassName("grow-div")[0];
      expect(growDiv).toHaveStyle("height:auto");
      await act(async () => listButton.click());
      expect(growDiv).toHaveStyle("height:0px");
    });
  });
});
