"use client";

import WorkCard from "@/components/search/WorkCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { findWorks, getImage, getWork } from "@/api/work";
import { SearchWorkResponse } from "@/types/api";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  const [works, setWorks] = useState<any[]>([]);

  useEffect(() => {
    async function fetchWorks() {
      try {
        const response: SearchWorkResponse = await findWorks(query);
        const normalizedWorks: {
          work_key: string;
          title: string;
          first_published_year?: string;
          authors: { author_name: string; author_key: string }[];
          cover?: string | null;
          description?: string;
        }[] = [];

        if (response.data?.docs) {
          for (const doc of response.data.docs) {
            const workDetails = await getWork(doc.key.replace("/works/", ""));
            normalizedWorks.push({
              work_key: doc.key,
              title: workDetails.data.title,
              first_published_year:
                workDetails.data.first_published_date || undefined,
              authors: workDetails.data.works_authors.map((wa) => ({
                author_name: wa.authors.name,
                author_key: wa.authors.openlibrary_id,
              })),
              cover: workDetails.data.covers?.[0]
                ? getImage(workDetails.data.covers[0])
                : null,
              description: workDetails.data.description || undefined,
            });
          }
        }

        setWorks(normalizedWorks);
      } catch (err) {
        console.error(err);
      }
    }
    fetchWorks();
  }, [query]);

  return (
    <div className="flex gap-4 px-32 py-6 text-black">
      <div className="w-2xl flex flex-col gap-8">
        <div className="border-b p-2">
          <p>Showing results for search</p>
        </div>
        <div className="flex flex-col gap-4">
          {works.map((work, index) => (
            <WorkCard
              key={index}
              work_key={work.work_key}
              title={work.title}
              first_published_year={work.first_published_year}
              authors={work.authors}
              cover={work.cover}
              description={work.description}
            />
          ))}
        </div>
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
