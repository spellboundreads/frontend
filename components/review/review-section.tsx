import { Review } from "@/types/review";
import ReviewCard from "../work/ReviewCard";
import CreateReviewForm from "./create-review-form";
import { User } from "@/types/user";
import { getReviewByUserWork } from "@/api/review";

interface ReviewSectionProps {
  reviews: Review[];
  workId: string;
  user: User | null;
}

export default async function ReviewSection({
  reviews,
  workId,
  user,
}: ReviewSectionProps) {
  const currentUserReview = user
    ? (await getReviewByUserWork(workId, user.id)).data
    : null;

  return (
    <>
      {user && !currentUserReview && <CreateReviewForm workId={workId} />}
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
