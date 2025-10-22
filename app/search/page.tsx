import WorkCard from "@/components/search/WorkCard";
import { Suspense } from "react";
import { findWorks, getImage } from "@/api/work";
import Loading from "./loading";
import { SearchWorkEntry } from "@/types/api";

async function SearchResults({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const works = await findWorks(searchParams);
  return (
    <div className="w-3xl flex flex-col gap-4">
      <div className="text-sm p-2">
        {works && <p>Found {works.num_found} works</p>}
      </div>
      <div className="flex flex-col gap-2">
        {works &&
          works.docs.map((work: SearchWorkEntry, index: number) => {
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
