import { render, screen } from "@testing-library/react";
import ProductDescription from "./ProductDescription";

//Very long random text of length more than 100
const LONG_TEXT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

//Short text of length less than 100
const SHORT_TEXT = "Short text";

describe("ProductDescription", () => {
  it("shows read more option when text length is more than 100 and show all text once read more is clicked", () => {
    render(<ProductDescription description={LONG_TEXT} />);
    const readMore = screen.getByText("...read more");
    expect(readMore).toBeVisible();
    readMore.click();
    expect(screen.getByText(LONG_TEXT)).toBeInTheDocument();
  });

  it("doesn't show read more option for short text", () => {
    const { container } = render(<ProductDescription description={SHORT_TEXT} />);
    const readMoreOrLess = container.getElementsByClassName("read-more-or-less")[0];
    expect(readMoreOrLess.innerHTML).toBe("");
  });
});
