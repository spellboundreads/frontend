import WorkOverview from "@/components/work/WorkOverview";
import WorkSubjects from "@/components/work/WorkSubjects";
import AuthorCard from "@/components/work/AuthorCard";
import { getWorksReviews } from "@/api/work.server";
import { getWork, getImage } from "@/api/work";
import { Work } from "@/types/work";
import { getMe } from "@/lib/auth";
import ReviewSection from "@/components/review/review-section";
import { WorksReviewsResponse } from "@/types/review";
import AddToShelfDialog from "@/components/shelf/add-to-shelf-dialog";
import { getReviewByUserWork } from "@/api/review.server";
import { getUserShelves, getShelvesWithWork } from "@/api/shelves.server";

export default async function Page({
  params,
}: {
  params: Promise<{ workOlid: string }>;
}) {
  const { workOlid } = await params;
  const work: Work = (await getWork(workOlid)).data;
  const reviews = (await getWorksReviews(work.id, 10, 0)).data;
  const user = await getMe();
  const currentUserReview = user
    ? (await getReviewByUserWork(user.id, work.id)).data
    : null;

  const userShelves = user ? (await getUserShelves(user.id)).data.shelves : [];
  const shelvesWithWork = user
    ? (await getShelvesWithWork(user.id, work.id)).data
    : [];

  return (
    <div className="text-black flex flex-col gap-10 pt-4 bg-[#eae7da]">
      {/* Work Overview & Genres */}
      <div className="bg-[#eae7da] flex gap-4 lg:px-24 px-12">
        <div className="w-[20rem]">
          {/* Work cover & Add to Shelf */}
          <div className=" flex-col gap-5 items-center flex">
            <div className="items-center flex flex-col justify-center ">
              <img
                src={
                  work.covers && work.covers.length > 0
                    ? getImage(work.covers[0])
                    : "/placeholder/work.png"
                }
                alt={`Cover of ${work.title}`}
                className="shadow-lg shadow-amber-50 h-98"
              />
            </div>
            <AddToShelfDialog
              shelves={userShelves}
              workId={work.id}
              shelvesWithWork={shelvesWithWork}
            />
          </div>
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

      <div className="bg-[#F8F5EA] flex lg:flex-row flex-col lg:gap-36 gap-8 pl-24 pr-92 py-8">
        <div className="min-w-xl flex flex-col gap-8">
          {/* Description */}
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-2xl">Description</h2>
            <div className="text-sm">
              {work.description || (
                <i>No description has been provided for this work.</i>
              )}
            </div>
          </div>
          {/* Author */}
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

          {/* Reviews */}
          {work.reviews && (
            <ReviewSection
              workId={work.id}
              reviews={reviews.reviews}
              user={user || null}
              currentUserReview={currentUserReview}
            />
          )}
        </div>
      </div>
    </div>
  );
}
