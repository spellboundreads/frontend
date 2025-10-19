"use client";
import { getImage } from "@/api/work";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAuthor } from "@/api/author";
import { Author } from "@/types/author";
import { toast } from "sonner";

export default function AuthorWorksSection() {
  const params = useParams<{ authorOlid: string }>();
  const [author, setAuthor] = useState<Author>();

  useEffect(() => {
    async function fetchAuthor() {
      try {
        const response = await getAuthor(params.authorOlid);
        setAuthor(response.data);
      } catch (err) {
        toast("Can't fetch author's data.");
      }
    }

    fetchAuthor();
  }, []);

  return (
    author && (
      <div className="flex flex-col items-center">
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
