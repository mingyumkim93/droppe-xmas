import { cleanup, render, screen, act } from "@testing-library/react";
import App from "./App";
import api from "api";
import { fakeCarts, fakeProductDetails, fakeUsers } from "__mock__";

beforeEach(cleanup);
jest.mock("./api");
const mockedAPI = api as jest.Mocked<typeof api>;

async function setup() {
  mockedAPI.fetchCarts.mockResolvedValue(fakeCarts);
  mockedAPI.fetchProductsByIds.mockResolvedValue(fakeProductDetails);
  mockedAPI.fetchUsersByIds.mockResolvedValue(fakeUsers);

  await act(async () => {
    render(<App />);
  });
}

describe("App", () => {
  it("calls api to fetch data and show wish lists", async () => {
    await setup();
    expect(api.fetchCarts).toHaveBeenCalled();
    expect(api.fetchProductsByIds).toHaveBeenCalled();
    expect(api.fetchUsersByIds).toHaveBeenCalled();
    expect(screen.getByTestId("wish-lists")).toBeInTheDocument();
  });

  it("shows modal when user click check out button", async () => {
    await setup();
    const checkOutButton = screen.getByText("Check out");
    expect(checkOutButton).toBeInTheDocument();
    checkOutButton.click();
    expect(screen.getByText("Confirmation")).toBeInTheDocument();
  });

  it("interact with user's input", async () => {
    await setup();
    const plusButton = screen.getByText("+");
    expect(plusButton).toBeInTheDocument();
    plusButton.click();
    const productQuantity = screen.getByText(`Total of ${fakeCarts[0].products[0].quantity + 1} products`);
    expect(productQuantity).toBeInTheDocument();
  });
});
