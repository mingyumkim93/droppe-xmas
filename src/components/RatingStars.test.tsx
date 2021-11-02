import { render, screen } from "@testing-library/react";
import Rating from "types/Rating";
import RatingStars from "./RatingStars";

describe("RatingStars", () => {
  const fakeRating: Rating = { rate: 4, count: 32 };
  render(<RatingStars rating={fakeRating} />);

  it("should show rate and count given via props correctly", () => {
    expect(screen.getByText(fakeRating.rate)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeRating.count.toString()))).toBeInTheDocument();
  });
});
