"use client";
import { AuthorsWork } from "@/types/api";
import { getAuthorWorks } from "@/api/author";
import { getImage } from "@/api/work";
import WorkCard from "@/components/search/WorkCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState, useEffect } from "react";
import next from "next";

export default function AuthorsWorksSection({
  authorOlid,
}: {
  authorOlid: string;
}) {
  const limit = 10;
  const [data, setData] = useState<{
    size: number;
    entries: AuthorsWork[];
  } | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAuthorWorks(authorOlid, limit, offset);
      setData(response.data);
    };
    fetchData();
  }, [offset]);

  const size = data?.size || 0;
  const entries = data?.entries || [];

  const currentPage = Math.ceil(offset / limit) + 1;
  const prevPage = currentPage == 1 ? null : currentPage - 1;
  const nextPage =
    currentPage == Math.ceil(size / limit) ? null : currentPage + 1;

  return (
    entries.length > 0 && (
      <div className="flex flex-col gap-4 max-w-4xl">
        {entries.map((work) => (
          <WorkCard
            key={work.key}
            work_key={work.key.split("/").pop() || ""}
            title={work.title}
            first_publish_year={work.first_publish_year}
            cover={
              work.covers && work.covers.length > 0
                ? getImage(work.covers[0].toString())
                : undefined
            }
            description={work.description || undefined}
          />
        ))}
        <Pagination>
          <PaginationContent>
            {prevPage && (
              <>
                <PaginationItem>
                  <PaginationPrevious
                    href=""
                    onClick={() => setOffset(offset - limit)}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href=""
                    onClick={() => setOffset(offset - limit)}
                  >
                    {prevPage}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
            <PaginationItem>
              <PaginationLink href="" isActive>
                {currentPage}
              </PaginationLink>
            </PaginationItem>
            {nextPage && (
              <PaginationItem>
                <PaginationLink
                  href=""
                  onClick={() => setOffset(offset + limit)}
                >
                  {nextPage}
                </PaginationLink>
              </PaginationItem>
            )}
            {nextPage !== null && nextPage < Math.ceil(size / limit) && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {nextPage && (
              <PaginationItem>
                <PaginationNext
                  href=""
                  onClick={() => setOffset(offset + limit)}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    )
  );
}
