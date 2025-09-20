type AuthorCardProps = {
  name: string;
  img: string;
  biography: string;
  workCount: number;
  href: string;
};

export default function AuthorCard({
  name,
  img,
  biography,
  workCount,
  href,
}: AuthorCardProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-4">
        <img
          src={img}
          alt={`Portrait of ${name}`}
          className="rounded-full w-16 h-16 object-cover"
        />
        <div className="flex flex-col justify-center">
          <a className="font-semibold hover:underline" href={href}>
            {name}
          </a>
          <p className="text-gray-700 text-sm">{workCount} works</p>
        </div>
      </div>

      <p className="text-sm">{biography}</p>
    </div>
  );
}
