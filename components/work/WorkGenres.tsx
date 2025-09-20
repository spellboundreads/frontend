import Chip from "@/components/Chip";

type WorkGenres = {
    genres: string[];
}

export default function WorkGenres({ genres }: WorkGenres) {
  return (
    <div className="flex flex-col gap-2 px-2">
      <h2 className="font-semibold">Genres</h2>
      <div className="flex flex-wrap gap-1">
        {genres.map((genre) => (
          <Chip key={genre} href="#">
            {genre}
          </Chip>
        ))}
      </div>
    </div>
  );
}
