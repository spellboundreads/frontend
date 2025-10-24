import { getImage } from "@/api/work";
import { getAuthor, getAuthorWorks } from "@/api/author";
import { Work } from "@/types/work";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AuthorsWorksSection from "@/components/author/authors-works-section";
import WorkCard from "@/components/search/WorkCard";
import { Spinner } from "@/components/ui/spinner";

export default async function Page({
  params,
}: {
  params: Promise<{ authorOlid: string }>;
}) {
  const { authorOlid } = await params;
  const author = (await getAuthor(authorOlid)).data;

  if (!author) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
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
      <div className="px-24 flex py-8">
        <div className="mx-16">
          <h2 className="text-2xl font-semibold w-full mb-4">
            Showing {author.name}'s works
          </h2>
          <AuthorsWorksSection authorOlid={authorOlid} />
        </div>
      </div>
    </div>
  );
}

type AuthorOverviewProps = {
  name: string;
  portrait?: string;
  bio?: string;
};

function AuthorOverview({ name, portrait, bio }: AuthorOverviewProps) {
  return (
    <div className="p-8 flex gap-12 min-h-xl max-w-5xl min-w-3xl mx-auto w-full">
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
            <AuthorDescriptionDialog name={name} bio={bio} />
          </>
        )}
      </div>
    </div>
  );
}

function AuthorDescriptionDialog({ name, bio }: { name: string; bio: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-transparent text-xs text-gray-700 underline hover:underline w-fit text-left">
          See full details
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl text-center">
            About {name}
          </DialogTitle>
          <DialogDescription className="mt-2 text-xs text-gray-800">
            {bio}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}