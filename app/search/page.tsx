"use client";

import WorkCard from "@/components/search/WorkCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { findWorks, getImage, getWork } from "@/api/work";
import { SearchWorkResponse } from "@/types/api";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  const [works, setWorks] = useState<SearchWorkResponse>();

  useEffect(() => {
    async function fetchWorks() {
      try {
        const response: SearchWorkResponse = await findWorks(query);
        console.log(response.data);
        setWorks(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchWorks();
  }, [query]);

  return (
    <div className="flex gap-32 px-32 py-6 text-black">
      <div className="w-3xl flex flex-col gap-8">
        <div className="border-b border-gray-400 p-2">
          {works && <p>Showing {works.num_found} results</p>}
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
                  work_key={work.key}
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

      <aside className="flex flex-col gap-2 w-56">
        <div className="border-b border-gray-400 p-2 ">
          <h2 className="uppercase">Show results for</h2>
        </div>
        <ul className="flex-col flex px-2 text-sm overflow-y-auto ">
          <li className="p-2 hover:bg-gray-200 hover:text-gray-700 hover:font-semibold">
            <a href="#">Works</a>
          </li>
          <li className="p-2 hover:bg-gray-200 hover:text-gray-700 hover:font-semibold">
            <a href="#">Authors</a>
          </li>
          <li className="p-2 hover:bg-gray-200 hover:text-gray-700 hover:font-semibold">
            <a href="#">Shelves</a>
          </li>
          <li className="p-2 hover:bg-gray-200 hover:text-gray-700 hover:font-semibold">
            <a href="#">Members</a>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8">Loading search...</div>}>
      <SearchResults />
    </Suspense>
  );
}
