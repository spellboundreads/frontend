import Chip from "@/components/Chip";

export default function Page() {
  return (
    <div>
      {/* Work Details */}
      <div className="bg-[#eae7da] flex gap-5 p-4">
        <div className="w-[20rem]">
          <WorkCard />
        </div>
        <div className="flex-1 flex flex-col p-8 gap-2 justify-between">
          <WorkDetails />

          <WorkGenres />
        </div>
      </div>
    </div>
  );
}

function WorkCard() {
  return (
    <div className="flex flex-col px-4 gap-5 items-center">
      <div className="w-52 items-center flex justify-center">
        <img
          src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1650033243i/41733839.jpg"
          alt=""
          className="w-full shadow-lg shadow-amber-50"
        />
      </div>
      <button className="rounded-4xl py-2 w-full font-semibold bg-white border-2 border-gray-500 active:bg-gray-200">
        Add to Shelf
      </button>
    </div>
  );
}

function WorkDetails() {
  return (
    <div className="flex flex-col gap-4 px-2">
      <h1 className="text-5xl font-semibold">The Great Gatsby</h1>
      <p className="text-xl">
        by{" "}
        <a href="#" className="underline">
          F. Scott Fitzgerald
        </a>
      </p>
      <p className="text-lg">
        in{" "}
        <a href="#" className="underline">
          1925
        </a>
      </p>
      <p>
        <i>
          “And so with the sunshine and the great bursts of leaves growing on
          the trees, just as things grow in fast movies, I had that familiar
          conviction that life was beginning over again with the summer.”
        </i>
      </p>
    </div>
  );
}

function WorkGenres() {
  return (
    <div className="flex flex-col gap-2 px-2">
      <h2 className="font-semibold">Genres</h2>
      <div className="flex flex-wrap gap-1">
        {work.genres.map((genre) => (
          <Chip key={genre}>{genre}</Chip>
        ))}
      </div>
    </div>
  );
}
