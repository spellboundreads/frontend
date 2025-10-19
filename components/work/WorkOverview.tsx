import Link from "next/link";

type WorkOverviewProps = {
  title: string;
  authorName: string;
  authorKey: string;
  publishedYear?: number;
  quote?: string;
};

export default function WorkOverview({
  title,
  authorName,
  authorKey,
  publishedYear,
  quote,
}: WorkOverviewProps) {
  return (
    <div className="flex flex-col gap-3 px-2">
      <h1 className="text-4xl font-semibold">{title}</h1>
      <p className="text-lg">
        by{" "}
        <Link href={`/authors/${authorKey}`} className="underline">
          {authorName}
        </Link>
      </p>
      {publishedYear && (
        <div className="text-lg flex items-center gap-2">
          in <p className="underline">{publishedYear}</p>
        </div>
      )}
      {quote && (
        <p>
          <i>“{quote}”</i>
        </p>
      )}
    </div>
  );
}
