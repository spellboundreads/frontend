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
          <div className="flex gap-2 items-center">
            <p className="text-sm text-gray-800">
              Review by{" "}
              <Link
                href={`/users/${userId}`}
                className="font-semibold hover:underline"
              >
                {userDisplayName}
              </Link>
            </p>
            <Rating
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
