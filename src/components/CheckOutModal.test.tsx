import { render, screen } from "@testing-library/react";
import CheckOutModal from "./CheckOutModal";

describe("CheckOutModal", () => {
  it("should call function given via props when user clicks button", () => {
    const mockCloseModal = jest.fn();
    const mockCheckOut = jest.fn();
    render(<CheckOutModal closeModal={mockCloseModal} handleCheckOut={mockCheckOut} />);
    const cancelButton = screen.getByText("Cancel");
    cancelButton.click();
    expect(mockCloseModal).toHaveBeenCalled();
    const proceedButton = screen.getByText("Proceed");
    proceedButton.click();
    expect(mockCheckOut).toHaveBeenCalled();
  });
});
