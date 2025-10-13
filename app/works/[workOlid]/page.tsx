"use client";
import WorkCard from "@/components/work/WorkCard";
import WorkOverview from "@/components/work/WorkOverview";
import WorkSubjects from "@/components/work/WorkSubjects";
import AuthorCard from "@/components/work/AuthorCard";
import { useState, useEffect } from "react";
import { getWork, getImage } from "@/api/work";
import { useParams } from "next/navigation";
import { Work } from "@/types/work";
import ReviewCard from "@/components/work/ReviewCard";

export default function Page() {
  const [work, setWork] = useState<Work>();
  const { workOlid } = useParams<{ workOlid: string }>();
  useEffect(() => {
    const fetchWork = async () => {
      try {
        const response = await getWork(workOlid);
        setWork(response.data);
      } catch (error) {
        console.error("Error fetching work details:", error);
      }
    };

    fetchWork();
  }, []);

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
            publishedYear={
              work.first_published_date
                ? new Date(work.first_published_date).getUTCFullYear()
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
            <h2 className="font-bold text-xl">Description</h2>
            <div className="text-sm">
              {work.description || (
                <i>No description has been provided for this work.</i>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-xl">About the Author</h2>
            <div>
              <AuthorCard
                name={work.works_authors[0].authors.name}
                img={
                  work.works_authors?.[0]?.authors?.photos?.[0]
                    ? getImage(work.works_authors[0].authors.photos[0])
                    : "/placeholder/author.png"
                }
                biography={work.works_authors[0].authors.bio || undefined}
                workCount={200}
                author_key={work.works_authors[0].authors.openlibrary_id}
              />
            </div>
          </div>

          {/* User Review */}
          <div>
            <h2 className="font-bold text-xl mb-4">User Reviews</h2>
            <div className="flex flex-col gap-8">
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
                  <i>No reviews for this work yet.</i>
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
