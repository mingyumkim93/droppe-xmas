import { render, screen } from "@testing-library/react";
import Error from "./Error";

describe("Error", () => {
  it("should show error message given via props", () => {
    const mockErrorMessage = "error message for test";
    render(<Error message={mockErrorMessage} />);
    expect(screen.getByText(mockErrorMessage)).toBeInTheDocument();
  });
});
