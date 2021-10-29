import { cleanup, screen, render } from "@testing-library/react";
import WishListsApproval from "./WishListsApproval";

beforeEach(cleanup);

describe("WishListsApproval", () => {
  it("initially shows loading spinner", async () => {
    render(<WishListsApproval />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  //it("shows error message when there is error", async () => {});
});
