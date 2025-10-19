import Rating from "@mui/material/Rating";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { EditReviewDialog } from "../review/editreview";
interface ReviewCardProps {
  userId: string;
  userAvatar: string;
  userDisplayName: string;
  createdAt: string;
  reviewText: string;
  rating: number;
  onChange: (rating: number, reviewText: string) => void;
  onUpdate?: (rating: number, reviewText: string) => void;
}

export default function ReviewCard({
  userId,
  userAvatar,
  userDisplayName,
  createdAt,
  reviewText,
  rating,
  onChange,
  onUpdate,
}: ReviewCardProps) {
  const { user } = useAuth();

  return (
    <div className="flex ">
      {/* User Avatar */}
      <div>
        <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
          <img
            src={userAvatar}
            alt={userDisplayName}
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
                  href={`/users/${userId}`}
                  className="font-semibold hover:underline"
                >
                  {userDisplayName}
                </Link>
              </p>
              <p className="text-xs">
                , at {new Date(createdAt).toLocaleString()}
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
          {user && user.id === userId && (
            <EditReviewDialog
              rating={rating}
              reviewText={reviewText}
              onChange={onChange}
              onUpdate={onUpdate || (() => {})}
            />
          )}

          {user && user.id !== userId && (
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
