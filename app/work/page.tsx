"use client";
import { work } from "@/data/work";
import Header from "@/components/Header";
import WorkCard from "@/components/work/WorkCard";
import WorkOverview from "@/components/work/WorkOverview";
import WorkGenres from "@/components/work/WorkGenres";
import AuthorCard from "@/components/work/AuthorCard";
import WorkDetailItem from "@/components/work/WorkDetailItem";
import { useState, useEffect } from "react";
import { Work } from "@/api/work";
import { getWork, getImage } from "@/api/work";

export default function Page() {
  const [work, setWork] = useState(null);

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const workDetails = await getWork(
          "e2bb6430-039d-4e43-8c36-6f72a5114996"
        );
        setWork(workDetails.data);
        console.log(workDetails);
      } catch (error) {
        console.error("Error fetching work details:", error);
      }
    };

    fetchWork();
  }, []);

  if (!work) {
    return (
      <div className="text-black flex flex-col gap-10 bg-[#eae7da]">
        <Header />
        <div className="flex justify-center items-center h-96">
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="text-black flex flex-col gap-10 bg-[#eae7da]">
      <Header />
      {/* Work Overview & Genres */}
      <div className="bg-[#eae7da] flex gap-4 lg:px-24 px-12">
        <div className="w-[20rem]">
          <WorkCard coverImage={getImage(work.covers[0])} title={work.title} />
        </div>
        <div className="flex-1 flex flex-col p-4 gap-2">
          <WorkOverview
            title={work.title}
            authorName={work.works_authors[0].authors.name}
            publishedYear={work.first_publish_date}
            quote={work.excerpts[0]}
          />
          <WorkGenres genres={work.subjects} />
        </div>
      </div>

      {/* Work Details */}

      <div className="bg-[#F8F5EA] flex lg:flex-row flex-col lg:gap-36 gap-8 px-24 py-8 ">
        {/* Description and author */}
        <div className="max-w-2xl flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-xl">Description</h2>
            <div className="text-sm">{work.description}</div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-xl">About the Author</h2>
            <div>
              <AuthorCard
                name={work.works_authors[0].authors.name}
                img={getImage(work.works_authors[0].authors.photos[0])}
                biography={work.works_authors[0].authors.bio}
                workCount={200}
                href={"#"}
              />
            </div>
          </div>
        </div>

        {/* Other details */}
        <div className="flex flex-col gap-5">
          {/* <WorkDetailItem label="Language" value={work.language} />
          <WorkDetailItem
            label="Page Count"
            value={`${work.pageCount} pages`}
          /> */}
          {/* <WorkDetailItem label="Publisher" value={work.publisher} />
          <WorkDetailItem label="ISBN" value={work.isbn} /> */}
          {/* <WorkDetailItem
            label="Average Rating"
            value={`${work.rating} (${work.ratingsCount} ratings)`}
          /> */}
          {/* <WorkDetailItem
            label="Published Year"
            value={work.first_publish_date.toString()}
          /> */}
        </div>
      </div>
    </div>
  );
}
