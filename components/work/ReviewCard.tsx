"use client";
import Rating from "@mui/material/Rating";
import Link from "next/link";
import { EditReviewDialog } from "../review/editreview";
import { Review } from "@/types/review";
import { User } from "@/types/user";
import { useState } from "react";

interface ReviewCardProps {
  review: Review;
  user?: User | null;
}

export default function ReviewCard({ review, user }: ReviewCardProps) {
  const [rating, setRating] = useState(review.rating);
  const [reviewText, setReviewText] = useState(review.review_text);

  return (
    <div className="flex ">
      {/* User Avatar */}
      <div>
        <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
          <img
            src={review.users.avatar_url || "/placeholder/user.png"}
            alt={review.users.display_name || review.users.username}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-2 ml-4">
          <div className="flex flex-col">
            <div className="flex items-center text-sm text-gray-800">
              <p>
                Review by{" "}
                <Link
                  href={`/users/${review.users.id}`}
                  className="font-semibold hover:underline"
                >
                  {user ? "you" : review.users.username}
                </Link>
              </p>
              <p className="text-xs">
                , at {new Date(review.created_at).toLocaleString()}
              </p>
            </div>
            <Rating
              size="small"
              name="read-only"
              value={rating / 2}
              readOnly
              precision={0.5}
            />
          </div>
          <div className="text-sm">{reviewText}</div>
          {user ? (
            <EditReviewDialog
              review={review}
              onUpdate={(rating, reviewText) => {
                setRating(rating);
                setReviewText(reviewText);
              }}
            />
          ) : (
            <button
              onClick={() => {}}
              className="bg-transparent text-xs text-gray-700 hover:underline w-fit text-left"
            >
              Like
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
