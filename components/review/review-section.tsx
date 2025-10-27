import { Review } from "@/types/review";
import ReviewCard from "../work/ReviewCard";
import CreateReviewForm from "./create-review-form";
import { User } from "@/types/user";
import { getReviewByUserWork } from "@/api/review.server";

interface ReviewSectionProps {
  reviews: Review[] | null;
  user: User | null;
  currentUserReview: Review | null;
  workId: string;
}

export default async function ReviewSection({
  reviews,
  user,
  currentUserReview,
  workId,
}: ReviewSectionProps) {
  return (
    <>
      {!user ? (
        <div className="text-gray-800 italic">
          You must log in to see reviews.
        </div>
      ) : (
        <>
          {user && !currentUserReview && <CreateReviewForm workId={workId} />}
          <div>
            <h2 className="text-2xl font-semibold">Community Reviews</h2>
            <div className="flex flex-col gap-8 mt-4">
              {currentUserReview && (
                <ReviewCard review={currentUserReview} user={user} />
              )}
              {reviews && reviews.length > 0 ? (
                reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))
              ) : (
                <div className="text-gray-800">
                  <i>No reviews have been left for this work yet.</i>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
