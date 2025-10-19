"use client";
import { getImage } from "@/api/work";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAuthor, getAuthorWorks } from "@/api/author";
import { GetAuthorWorkResponse } from "@/types/api";
import { Author } from "@/types/author";
import { toast } from "sonner";
import WorkCard from "@/components/search/WorkCard";

export default function AuthorWorksSection() {
  const { authorOlid } = useParams<{ authorOlid: string }>();
  const [author, setAuthor] = useState<Author>();
  const [authorWorks, setAuthorWorks] =
    useState<GetAuthorWorkResponse["data"]>();

  useEffect(() => {
    async function fetchAuthor() {
      try {
        const response = await getAuthor(authorOlid);
        setAuthor((prev) => {
          return {
            ...prev,
            ...response.data,
          };
        });
      } catch (err) {
        toast("Can't fetch author's data.");
      }
    }

    async function fetchAuthorWorks() {
      try {
        const response = await getAuthorWorks(authorOlid);
        setAuthorWorks(response.data);
        console.log(response.data.entries);
      } catch (err) {
        toast("Can't fetch author's works.");
      }
    }

    fetchAuthor();
    fetchAuthorWorks();
  }, []);

  return (
    author && (
      <div className="flex flex-col">
        <div className="w-full bg-[#eae7da]">
          <AuthorOverview
            name={author.name}
            bio={author.bio || undefined}
            portrait={
              author.photos && author.photos.length > 0
                ? getImage(author.photos[0]) || undefined
                : undefined
            }
          />
        </div>
        {authorWorks && (
          <div className="p-4 flex">
            {/* Authors' works */}
            <div className="mx-16">
              <h2 className="text-2xl font-semibold w-full mb-4">
                Showing {author.name}'s works
              </h2>
              <div className="flex flex-col gap-4 w-full">
                {authorWorks.entries.slice(0, 5).map((work) => (
                  <WorkCard
                    key={work.key.split("/").pop()}
                    work_key={work.key.split("/").pop() || ""}
                    title={work.title}
                    first_publish_year={work.first_publish_year}
                    cover={
                      work.covers && work.covers.length > 0
                        ? getImage(work.covers[0].toString())
                        : undefined
                    }
                    description={
                      work.description ? work.description : undefined
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
}

type AuthorOverviewProps = {
  name: string;
  portrait?: string;
  bio?: string;
};

function AuthorOverview({ name, portrait, bio }: AuthorOverviewProps) {
  return (
    <div className=" p-8 flex gap-6 min-h-xl max-w-4xl min-w-3xl mx-auto w-full">
      <div className="h-42 w-42 flex-shrink-0">
        <img
          src={portrait || "/placeholder/author.png"}
          alt={`Portrait of ${name}`}
          className="h-full w-full object-cover rounded-full"
        />
      </div>
      <div className="w-2/3 flex flex-col gap-4">
        <h1 className="font-semibold text-2xl">{name}</h1>
        {bio && (
          <>
            <p className="text-sm line-clamp-10">{bio}</p>
          </>
        )}
      </div>
    </div>
  );
}
