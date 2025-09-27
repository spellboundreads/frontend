// TODO: fixed w and h?
export type BookCardProps = {
  title: string;
  author: string;
  imageUrl: string;
  reverse?: boolean;
};

export default function BookCard({
  title,
  author,
  imageUrl,
  reverse = true,
}: BookCardProps) {
  return (
    <div className={`flex flex-col w-40 gap-1 justify-center overflow-visible`}>
      <div
        className={`w-full ${
          reverse ? "rounded-b-full order-1" : "rounded-t-full order-2"
        }  overflow-x-hidden overflow-y-visible`}
      >
        <img src={imageUrl} alt={`${title} by ${author}`} className="w-full " />
      </div>
      <div
        className={`${
          reverse ? "order-2" : "order-1"
        } text-[0.5rem] flex flex-col items-center`}
      >
        <p className="font-semibold text-black text-sm text-center">{title}</p>
        <p className="text-xs text-gray-700">{author}</p>
      </div>
    </div>
  );
}
