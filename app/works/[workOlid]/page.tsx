"use client";
import WorkCard from "@/components/work/WorkCard";
import WorkOverview from "@/components/work/WorkOverview";
import WorkSubjects from "@/components/work/WorkSubjects";
import AuthorCard from "@/components/work/AuthorCard";
import { useState, useEffect } from "react";
import { getWork, getImage } from "@/api/work";
import { createReview, getReviewByUserWork } from "@/api/review";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { Work } from "@/types/work";
import ReviewCard from "@/components/work/ReviewCard";
import Rating from "@mui/material/Rating";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export default function Page() {
  const [work, setWork] = useState<Work>();
  const { workOlid } = useParams<{ workOlid: string }>();
  const { user } = useAuth();
  const [review, setReview] = useState<
    { rating: number; review_text: string } | undefined
  >(undefined);
  const [hasExistingReview, setHasExistingReview] = useState(false);

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const response = await getWork(workOlid);
        setWork(response.data);
      } catch (error) {
        toast("An error occurred while fetching the work data.");
      }
    };

    fetchWork();
  }, []);

  useEffect(() => {
    async function fetchUserReview() {
      if (!work || !user) return;

      try {
        const response = await getReviewByUserWork(work.id, user.id);
        if (!response || !response.data) throw new Error("No review found");
        setReview({
          rating: response.data.rating / 2,
          review_text: response.data.review_text || "",
        });
        console.log("response:", response);

        setHasExistingReview(true);
      } catch (error) {
        setHasExistingReview(false);
        setReview({ rating: 0, review_text: "" });
      }
    }
    fetchUserReview();
  }, [work, user]);

  async function handleReviewSubmitClick(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();
    try {
      if (review && work) {
        if (!review.rating) {
          toast("Choose a rating!");
        } else {
          const response = await createReview({
            work_id: work?.id,
            review_text: review.review_text,
            rating: review.rating * 2,
          });
          toast("Review has been created successfully.");
          setWork((prev) => {
            if (prev) {
              return {
                ...prev,
                reviews: [...(prev.reviews || []), response.data],
              };
            }
            return prev;
          });
          setReview(undefined);
        }
      }
    } catch (error) {
      toast("An error occurred while submitting your review.");
    }
  }

  if (!work) {
    return (
      <div className="text-black flex flex-col gap-10 bg-[#eae7da]">
        <div className="flex justify-center items-center h-96">
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="text-black flex flex-col gap-10 pt-4 bg-[#eae7da]">
      {/* Work Overview & Genres */}
      <div className="bg-[#eae7da] flex gap-4 lg:px-24 px-12">
        <div className="w-[20rem]">
          <WorkCard
            coverImage={
              work.covers && work.covers.length > 0
                ? getImage(work.covers[0])
                : "/placeholder/work.png"
            }
            title={work.title}
          />
        </div>
        <div className="flex-1 flex flex-col p-4 gap-2">
          <WorkOverview
            title={work.title}
            authorName={work.works_authors[0].authors.name}
            authorKey={work.works_authors[0].authors.openlibrary_id}
            publishedYear={
              work.first_publish_year
                ? new Date(work.first_publish_year).getUTCFullYear()
                : undefined
            }
            quote={work.excerpts ? work.excerpts[0] : undefined}
          />
          {work.subjects && work.subjects.length > 0 && (
            <WorkSubjects subjects={work.subjects} />
          )}
        </div>
      </div>

      {/* Work Details */}

      <div className="bg-[#F8F5EA] flex lg:flex-row flex-col lg:gap-36 gap-8 px-24 py-8 ">
        {/* Description and author */}
        <div className="max-w-2xl flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-2xl">Description</h2>
            <div className="text-sm">
              {work.description || (
                <i>No description has been provided for this work.</i>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-2xl">About the Author</h2>
            <div>
              <AuthorCard
                name={work.works_authors[0].authors.name}
                img={
                  work.works_authors?.[0]?.authors?.photos?.[0]
                    ? getImage(work.works_authors[0].authors.photos[0])
                    : "/placeholder/author.png"
                }
                biography={work.works_authors[0].authors.bio || undefined}
                author_key={work.works_authors[0].authors.openlibrary_id}
              />
            </div>
          </div>

          {user && !hasExistingReview && (
            <div>
              <h2 className="text-2xl font-semibold">What do you think?</h2>
              <form className="mt-4 flex flex-col gap-2">
                <div className="text-center">
                  <Rating
                    size="large"
                    name="half-rating"
                    precision={0.5}
                    onChange={(e, value) => {
                      setReview((prev) => ({
                        review_text: prev?.review_text || "",
                        rating: value || 0,
                      }));
                    }}
                    value={review?.rating || 0}
                  />
                </div>

                <Textarea
                  placeholder="Leave a review"
                  rows={4}
                  className="border-gray-500 "
                  onChange={(e) => {
                    setReview({
                      review_text: e.target.value,
                      rating: review?.rating ?? 0,
                    });
                  }}
                  value={review?.review_text || ""}
                ></Textarea>
                <Button type="submit" onClick={handleReviewSubmitClick}>
                  Submit
                </Button>
              </form>
            </div>
          )}
          {/* User Review */}
          <div>
            <h2 className="text-2xl font-semibold">Community Reviews</h2>
            <div className="flex flex-col gap-8 mt-4">
              {work.reviews && work.reviews.length > 0 ? (
                work.reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    userId={review.users.id}
                    userAvatar={
                      review.users.avatar_url || "/placeholder/user.png"
                    }
                    userDisplayName={
                      review.users.display_name || review.users.username
                    }
                    createdAt={review.created_at}
                    reviewText={review.review_text || ""}
                    rating={review.rating}
                  />
                ))
              ) : (
                <div className="  text-gray-800">
                  <i>No reviews have been left for this work yet.</i>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Other details */}
        <div className="flex flex-col gap-5"></div>
      </div>
    </div>
  );
}
