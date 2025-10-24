import { getAuthorWorks } from "@/api/author";
import { getImage } from "@/api/work";
import WorkCard from "@/components/search/WorkCard";

export default async function AuthorsWorksSection({
  authorOlid,
}: {
  authorOlid: string;
}) {
  const data = (await getAuthorWorks(authorOlid)).data;
  const size = data.size;
  const entries = data.entries;

  return (
    entries.length > 0 && (
      <div className="flex flex-col gap-4 max-w-4xl">
        {entries.slice(0, 10).map((work) => (
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
      </div>
    )
  );
}
