"use client";

import { Review } from "@/types/review";
import ReviewCard from "../work/ReviewCard";
import CreateReviewForm from "./create-review-form";
import { useState } from "react";
import { User } from "@/types/user";

interface ReviewSectionProps {
  reviews: Review[];
  workId: string;
  user: User | null;
}

export default function ReviewSection({
  reviews,
  workId,
  user,
}: ReviewSectionProps) {
  const [hasUserReviewed, setHasUserReview] = useState(
    reviews.some((review) => review.user_id === user?.id)
  );

  console.log(hasUserReviewed);

  return (
    <>
      {!hasUserReviewed && (
        <CreateReviewForm
          workId={workId}
          onSubmit={() => setHasUserReview(true)}
        />
      )}
      <div>
        <h2 className="text-2xl font-semibold">Community Reviews</h2>
        <div className="flex flex-col gap-8 mt-4">
          {/* {hasUserReviewed && <ReviewCard />} */}
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          ) : (
            <div className="  text-gray-800">
              <i>No reviews have been left for this work yet.</i>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
