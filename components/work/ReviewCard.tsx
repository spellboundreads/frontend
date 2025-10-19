import Rating from "@mui/material/Rating";
import Link from "next/link";

interface ReviewCardProps {
  userId: string;
  userAvatar: string;
  userDisplayName: string;
  createdAt: string;
  reviewText: string;
  rating: number;
}

export default function ReviewCard({
  userId,
  userAvatar,
  userDisplayName,
  createdAt,
  reviewText,
  rating,
}: ReviewCardProps) {
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
        </div>
      </div>
    </div>
  );
}
