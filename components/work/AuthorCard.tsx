import Link from "next/link";

type AuthorCardProps = {
  name: string;
  img?: string;
  biography?: string;
  author_key: string;
};

export default function AuthorCard({
  name,
  img,
  biography,
  author_key,
}: AuthorCardProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-4">
        <img
          src={img || ""}
          alt={`Portrait of ${name}`}
          className="rounded-full w-16 h-16 object-cover"
        />
        <div className="flex flex-col justify-center">
          <Link
            className="font-semibold hover:underline cursor-pointer"
            href={`/authors/${author_key}`}
          >
            {name}
          </Link>
          <p className="text-gray-700 text-sm">Author</p>
        </div>
      </div>

      {biography && <p className="text-sm">{biography}</p>}
    </div>
  );
}
