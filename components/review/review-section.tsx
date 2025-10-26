import { Review } from "@/types/review";
import ReviewCard from "../work/ReviewCard";
import CreateReviewForm from "./create-review-form";
import { User } from "@/types/user";
import { getReviewByUserWork } from "@/api/review.server";

interface ReviewSectionProps {
  reviews: Review[];
  user: User | null;
  currentUserReview?: Review | null;
}

export default async function ReviewSection({
  reviews,
  user,
  currentUserReview,
}: ReviewSectionProps) {
  return (
    <>
      {user && !currentUserReview && (
        <CreateReviewForm workId={reviews[0].work_id} />
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
