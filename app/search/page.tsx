import WorkCard from "@/components/search/WorkCard";
import { Suspense } from "react";
import { findWorks, getImage } from "@/api/work";
import Loading from "./loading";
import { SearchWorkEntry } from "@/types/api";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function makePageUrl(
  searchParams: Record<string, string | string[] | undefined>,
  newPage: number
) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) params.set(key, value[0]);
    else if (value) params.set(key, value);
  });

  params.set("page", newPage.toString());
  return `?${params.toString()}`;
}

async function SearchResults({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const works = await findWorks(searchParams);

  const limit = parseInt(
    Array.isArray(searchParams.limit)
      ? searchParams.limit[0]
      : searchParams.limit || "10"
  );
  const page = parseInt(
    Array.isArray(searchParams.page)
      ? searchParams.page[0]
      : searchParams.page || "1"
  );

  const totalPages = Math.ceil(works.num_found / limit);
  let start = Math.max(1, page - 2);
  let end = Math.min(totalPages, start + 4);

  if (end - start < 4) start = Math.max(1, end - 4);

  const visiblePages = range(start, end);

  return (
    <div className="w-3xl flex flex-col gap-4">
      <div className="text-sm p-2">
        {works && <p>Found {works.num_found} works</p>}
      </div>

      <div className="flex flex-col gap-2">
        {works.docs.map((work: SearchWorkEntry, index: number) => {
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

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={makePageUrl(searchParams, Math.max(1, page - 1))}
            />
          </PaginationItem>

          {visiblePages.map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                href={makePageUrl(searchParams, p)}
                isActive={p === page}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

          {totalPages > 5 && <PaginationEllipsis />}

          <PaginationItem>
            <PaginationNext
              href={makePageUrl(searchParams, Math.min(totalPages, page + 1))}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
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
