import React from "react";
import Rating from "../types/Rating";
import "./RatingStars.scss";

interface RatingProps {
  rating: Rating;
}

function RatingStars({ rating }: RatingProps) {
  return (
    <div>
      <div className="ratings">
        <div className="empty-stars">
          <div className="full-stars" style={{ width: (rating.rate / 5) * 100 + "%" }}></div>
        </div>
        <b>{rating.rate}</b>
        <span>({rating.count})</span>
      </div>
    </div>
  );
}

export default RatingStars;
