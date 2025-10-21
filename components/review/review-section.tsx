"use client";

import { Review } from "@/types/review";
import ReviewCard from "../work/ReviewCard";
import CreateReviewForm from "./create-review-form";
import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { getReviewByUserWork } from "@/api/review";
import { AxiosError } from "axios";

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
  const [currentUserReview, setCurrentUserReview] = useState<Review | null>();

  useEffect(() => {
    async function fetchCurrentUserReview() {
      try {
        if (user) {
          const response = await getReviewByUserWork(workId, user.id);
          setCurrentUserReview(response.data);
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.status === 404) {
          setCurrentUserReview(null);
        }
      }
    }
    fetchCurrentUserReview();
  }, []);

  return (
    <>
      {user && !currentUserReview && (
        <CreateReviewForm
          workId={workId}
          onSubmit={(review) => setCurrentUserReview(review)}
        />
      )}
      <div>
        <h2 className="text-2xl font-semibold">Community Reviews</h2>
        <div className="flex flex-col gap-8 mt-4">
          {currentUserReview && (
            <ReviewCard review={currentUserReview} user={user} />
          )}
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
