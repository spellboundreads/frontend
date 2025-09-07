// TODO: fixed w and h?
export type BookCardProps = {
  title: string;
  author: string;
  imageUrl: string;
  reverse?: boolean;
};

export default function BookCard({ title, author, imageUrl, reverse = true }: BookCardProps) {
  return (
    <div className={`flex flex-col h-60 w-24 gap-1 justify-center `}>
      <div
        className={`w-24 ${
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
        <p className="font-semibold">{title}</p>
        <p>{author}</p>
      </div>
    </div>
  );
}
