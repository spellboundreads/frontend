"use client";
import WorkCard from "@/components/search/WorkCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  findWorks,
  getImage,
  SearchWorkResponse,
  SearchWorkEntry,
} from "@/api/work";

export default function Page() {
  const [works, setWorks] = useState<any[]>([]);

  const searchParams = useSearchParams();
  const query = searchParams.toString();

  useEffect(() => {
    async function fetchWorks() {
      try {
        const response: SearchWorkResponse = await findWorks(query);
        const normalizedWorks = response.data?.docs.map((doc) => {
          return {
            title: doc.title,
            first_published_year: doc.first_published_year,
            cover: getImage(doc.cover_i),
            authors: doc.author_name
              ? []
              : doc.author_name.map((a_name: string, index: number) => {
                  return {
                    author_name: a_name,
                    author_key: doc.author_key[index],
                  };
                }),
          };
        });
        console.log(response.data.docs);
        setWorks(response.data.docs);
      } catch (err) {
        console.log(err);
      }
    }
    fetchWorks();
  }, []);

  return (
    <div className="flex gap-4 px-32 py-6 text-black">
      <div className="w-xl flex flex-col gap-8">
        <div className="border-b p-2">
          <p>Showing results for search</p>
        </div>
        {works.map((work) => {
          return (
            <WorkCard
              key={work.key}
              title={work.title}
              first_published_year={work.first_published_year}
              description={work.description}
              authors={[
                {
                  author_name: work.author_name[0],
                  author_key: work.author_key[0],
                },
              ]}
              cover={getImage(work.cover_i)}
            />
          );
        })}
      </div>
    </div>
  );
}
