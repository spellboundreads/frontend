type WorkOverviewProps = {
  title: string;
  authorName: string;
  publishedYear: number;
  quote: string;
};

export default function WorkOverview({
  title,
  authorName,
  publishedYear,
  quote,
}: WorkOverviewProps) {
  return (
    <div className="flex flex-col gap-3 px-2">
      <h1 className="text-4xl font-semibold">{title}</h1>
      <p className="text-lg">
        by{" "}
        <a href="#" className="underline">
          {authorName}
        </a>
      </p>
      <p className="text-lg">
        in{" "}
        <a href="#" className="underline">
          {publishedYear}
        </a>
      </p>
      <p>
        <i>“{quote}”</i>
      </p>
    </div>
  );
}
