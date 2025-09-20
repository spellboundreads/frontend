import { work } from "@/data/work";
import Header from "@/components/Header";
import WorkCard from "@/components/work/WorkCard";
import WorkOverview from "@/components/work/WorkOverview";
import WorkGenres from "@/components/work/WorkGenres";
import AuthorCard from "@/components/work/AuthorCard";
import WorkDetailItem from "@/components/work/WorkDetailItem";

export default function Page() {
  return (
    <div className="text-black flex flex-col gap-10 bg-[#eae7da]">
      <Header />
      {/* Work Overview & Genres */}
      <div className="bg-[#eae7da] flex gap-4 px-24">
        <div className="w-[20rem]">
          <WorkCard coverImage={work.coverImage} title={work.title} />
        </div>
        <div className="flex-1 flex flex-col p-4 gap-2">
          <WorkOverview
            title={work.title}
            authorName={work.author.name}
            publishedYear={work.publishedYear}
            quote={work.quote}
          />
          <WorkGenres genres={work.genres} />
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
                name={work.author.name}
                img={work.author.img!}
                biography={work.author.biography!}
                workCount={work.author.bookCount!}
                href={work.author.href!}
              />
            </div>
          </div>
        </div>

        {/* Other details */}
        <div className="flex flex-col gap-5">
          <WorkDetailItem label="Language" value={work.language} />
          <WorkDetailItem label="Page Count" value={`${work.pageCount} pages`} />
          <WorkDetailItem label="Publisher" value={work.publisher} />
          <WorkDetailItem label="ISBN" value={work.isbn} />
          <WorkDetailItem
            label="Average Rating"
            value={`${work.rating} (${work.ratingsCount} ratings)`}
          />
          <WorkDetailItem
            label="Published Year"
            value={work.publishedYear.toString()}
          />
        </div>
      </div>
    </div>
  );
}
