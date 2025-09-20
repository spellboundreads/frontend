type WorkCardProps = {
  title: string;
  coverImage: string;
};

export default function WorkCard({ title, coverImage }: WorkCardProps) {
  return (
    <div className="flex flex-col gap-5 items-center ">
      <div className="items-center flex flex-col justify-center ">
        <img
          src={coverImage}
          alt={`Cover of ${title}`}
          className="shadow-lg shadow-amber-50 max-h-98"
        />
      </div>
      <AddToShelfButton />
    </div>
  );
}

function AddToShelfButton() {
  return (
    <button className="rounded-4xl py-2 w-full font-semibold bg-white border-2 border-gray-500 active:bg-gray-200">
      Add to Shelf
    </button>
  );
}
