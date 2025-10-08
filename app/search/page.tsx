"use client";

import WorkCard from "@/components/search/WorkCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { findWorks, getImage } from "@/api/work";
import { SearchWorkResponse } from "@/types/api";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  const [works, setWorks] = useState<any[]>([]);

  useEffect(() => {
    async function fetchWorks() {
      try {
        const response: SearchWorkResponse = await findWorks(query);
        const normalizedWorks = response.data?.docs.map((doc) => ({
          work_key: doc.key,
          title: doc.title,
          first_published_year: doc.first_publish_year,
          cover: doc.cover_i ? getImage(doc.cover_i.toString()) : null,
          authors: doc.author_name
            ? doc.author_name.map((a_name: string, index: number) => ({
                author_name: a_name,
                author_key: doc.author_key[index],
              }))
            : [],
        }));

        setWorks(normalizedWorks || []);
      } catch (err) {
        console.error(err);
      }
    }
    fetchWorks();
  }, [query]);

  return (
    <div className="flex gap-4 px-32 py-6 text-black">
      <div className="w-xl flex flex-col gap-8">
        <div className="border-b p-2">
          <p>Showing results for search</p>
        </div>
        {works.map((work, index) => (
          <WorkCard
            key={index}
            work_key={work.work_key}
            title={work.title}
            first_published_year={work.first_published_year}
            authors={work.authors}
            cover={work.cover}
          />
        ))}
      </div>
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
