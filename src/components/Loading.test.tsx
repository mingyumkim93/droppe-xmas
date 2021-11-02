import { render } from "@testing-library/react";
import Loading from "./Loading";

describe("Loading", () => {
  it("should show empty div with class name 'spinner'", () => {
    const { container } = render(<Loading />);
    const spinner = container.getElementsByClassName("spinner")[0];
    expect(spinner).toBeVisible();
    expect(spinner.innerHTML).toBe("");
  });
});
