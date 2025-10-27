import {
  getMostReviewedWorks,
  getNewlyAddedWorks,
  getMostShelvedWorks,
} from "@/api/work.server";
import { getImage } from "@/api/work";
import Link from "next/link";
import { Work } from "@/types/work";

export default async function Page() {
  const newlyAddedWorks = (await getNewlyAddedWorks()).data;
  const mostReviewedWorks = (await getMostReviewedWorks()).data;
  const mostShelvedWorks = (await getMostShelvedWorks()).data;
  return (
    <>
      <WorkList title="Newly Added Works" works={newlyAddedWorks} />
      <WorkList title="Most Reviewed This Week" works={mostReviewedWorks} />
      <WorkList title="Most Shelved This Week" works={mostShelvedWorks} />
    </>
  );
}

interface WorkListProps {
  title: string;
  works: Work[];
  limit?: number;
}

export function WorkList({ title, works, limit = 5 }: WorkListProps) {
  if (!works || works.length === 0) return null;

  return (
    <div className="mt-12 px-24">
      <h2 className="uppercase font-semibold text-xl border-b border-gray-300">
        {title}
      </h2>
      <div className="flex gap-4 mt-4">
        {works
          .filter((work) => work.covers && work.covers.length > 0)
          .slice(0, limit)
          .map((work) => (
            <Link key={work.id} href={`/works/${work.openlibrary_id}`}>
              <div className="rounded-sm overflow-hidden flex flex-col items-center w-56 hover:cursor-pointer">
                <img
                  className="h-76 w-56 rounded-sm object-cover hover:border-2 hover:border-blue-500 hover:shadow-md"
                  src={
                    work.covers && work.covers.length > 0
                      ? getImage(work.covers[0])
                      : "/placeholder/work.png"
                  }
                  alt={work.title}
                />
                <div className="p-2">
                  <p className="text-black text-sm font-semibold ">
                    {work.title}
                  </p>
                  {work.first_publish_year && (
                    <p className="text-gray-800 text-xs text-center">
                      {work.first_publish_year}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
