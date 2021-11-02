import { render } from "@testing-library/react";
import { WishListsContext } from "App";
import { fakeProductDetails, fakeWishLists } from "__mock__";
import ProductAmountPrice from "./ProductAmountPrice";

describe("ProductAmountPrice", () => {
  const { container } = render(
    <WishListsContext.Provider value={{ wishLists: fakeWishLists, wishListsDispatch: () => {} }}>
      <ProductAmountPrice product={{ productDetail: fakeProductDetails[0], quantity: 2, approvedAmount: 2 }} />
    </WishListsContext.Provider>
  );

  it("should show orifinal price with line-through for more than 1 approved product", () => {
    const sTag = container.getElementsByTagName("s");
    expect(sTag.length).toBe(1);
  });
});
