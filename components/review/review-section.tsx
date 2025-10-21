import { Review } from "@/types/review";
import ReviewCard from "../work/ReviewCard";

interface ReviewSectionProps {
  reviews: Review[];
}

export default function ReviewSection({ reviews }: ReviewSectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Community Reviews</h2>
      <div className="flex flex-col gap-8 mt-4">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            userId={review.users.id}
            userAvatar={review.users.avatar_url || "/placeholder/user.png"}
            userDisplayName={review.users.display_name || review.users.username}
            createdAt={review.created_at}
            reviewText={review.review_text || ""}
            rating={review.rating}
          />
        ))}
      </div>
    </div>
  );
}
