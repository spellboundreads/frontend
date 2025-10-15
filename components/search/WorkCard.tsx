import Link from "next/link";

import { Author } from "@/types/work";
import { getImage } from "@/api/work";

interface WorkCardProps {
  title: string;
  first_published_year?: number;
  description?: string;
  authors: Author[];
  cover?: string;
  work_key: string;
}

interface AuthorChipProps {
  author_name: string;
  author_key: string;
}

export default function WorkCard({
  work_key,
  title,
  first_published_year,
  description,
  authors,
  cover,
}: WorkCardProps) {
  console.log("authors in WorkCard:", authors);
  return (
    <div className="flex gap-6 w-full h-56 text-black text-xs border-b-1 border-gray-400 p-4">
      <div className="min-w-32 max-w-32 bg-white flex justify-center ">
        <img
          src={cover}
          alt={`Cover of ${title}`}
          className="h-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Link href={`/works/${work_key}`}>
          <div className="flex gap-2">
            <h2 className="text-sm font-semibold">{title}</h2>
            <p className="text-sm ">{first_published_year}</p>
          </div>
        </Link>
        <p className="line-clamp-5 break-words overflow-hidden">
          {description}
        </p>
        <div className="flex gap-2 max-h-6 items-center">
          <span className="text-xs">Written by</span>
          {authors.slice(0, 2).map((author, index) => (
            <AuthorChip
              key={index}
              author_name={author.name}
              author_key={author.openlibrary_id}
            />
          ))}
          {authors.length > 2 && (
            <span className="text-xs">and {authors.length - 2} more</span>
          )}
        </div>
      </div>
    </div>
  );
}

function AuthorChip({ author_name, author_key }: AuthorChipProps) {
  return (
    <Link href={`/authors/${author_key}`}>
      <button className="rounded-xs border-[1.5px] border-gray-300 p-1 font-semibold bg-amber-50 shadow-lg max-w-82 overflow-hidden whitespace-nowrap text-ellipsis hover:bg-amber-100">
        {author_name}
      </button>
    </Link>
  );
}
