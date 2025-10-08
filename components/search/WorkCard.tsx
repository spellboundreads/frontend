import Link from "next/link";

interface WorkCardProps {
  title: string;
  first_published_year?: number;
  description?: string;
  authors: AuthorChipProps[];
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
  return (
    <div className="flex gap-4 w-full h-42 text-black text-xs border-b border-gray-400 p-3">
      <div className="w-32 bg-white flex justify-center ">
        <img src={cover} alt={`Cover of ${title}`} className="h-full " />
      </div>

      <div className="flex flex-col gap-2">
        <Link href={`${work_key}`}>
          <div className="flex gap-2">
            <h2 className="text-sm font-semibold">{title}</h2>
            <p className="text-sm ">{first_published_year}</p>
          </div>
        </Link>
        <p className="line-clamp-6">{description}</p>
        <div className="flex gap-2 items-center">
          Written by
          {authors.map((author) => {
            return (
              <AuthorChip
                key={author.author_key}
                author_name={author.author_name}
                author_key={author.author_key}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function AuthorChip({ author_name, author_key }: AuthorChipProps) {
  return (
    <Link href={`/authors/${author_key}`}>
      <button className="rounded-xs border-[1.5px] border-gray-300 p-1 font-semibold bg-amber-50 shadow-lg">
        {author_name}
      </button>
    </Link>
  );
}
