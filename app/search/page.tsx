import WorkCard from "@/components/search/WorkCard";
// import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { findWorks, getImage, getWork } from "@/api/work";
import Loading from "./loading";

interface SearchProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function SearchResults({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const works = await findWorks(searchParams);

  console.log(searchParams);

  return (
    <div className="w-3xl flex flex-col gap-8">
      <div className="border-b border-gray-400 p-2">
        {works && <p>There are {works.num_found} results</p>}
      </div>
      <div className="flex flex-col gap-4">
        {works !== undefined &&
          works.docs.map((work, index: number) => {
            const authors =
              work.author_key?.map((key: string, i: number) => ({
                key,
                name: work.author_name?.[i] ?? "Unknown Author",
              })) ?? [];

            return (
              <WorkCard
                key={index}
                work_key={work.key.split("/").pop() || ""}
                title={work.title}
                first_publish_year={work.first_publish_year}
                authors={authors}
                cover={
                  work.cover_i
                    ? getImage(work.cover_i.toString())
                    : "/placeholder/cover.png"
                }
              />
            );
          })}
      </div>
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const filters = await searchParams;

  return (
    <Suspense fallback={<Loading />}>
      <SearchResults searchParams={filters} />
    </Suspense>
  );
}
