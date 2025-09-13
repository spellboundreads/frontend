import BookCard, { BookCardProps } from "@/components/BookCard";

export type HeroProps = {
  headline: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  cards?: BookCardProps[];
};

export default function Hero({
  headline,
  description,
  ctaText = "Explore now",
  ctaLink = "#",
  cards = [
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      imageUrl:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1650033243i/41733839.jpg",
    },
    {
      title: "1984",
      author: "George Orwell",
      imageUrl: "https://minh.la/wp-content/uploads/2020/11/1984.jpg.webp",
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      imageUrl:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1553383690i/2657.jpg",
    },
  ],
}: HeroProps) {
  return (
    <div className="grid grid-cols-2 items-center bg-hero-background">
      <div className="flex flex-col justify-center p-32 gap-4">
        <h1 className="text-3xl font-bold text-black">{headline}</h1>
        <p className="text-lg text-gray-700">{description}</p>
        <a href={ctaLink} className="w-max">
          <button className="bg-black text-white py-2 px-4 pointer">
            {ctaText}
          </button>
        </a>
      </div>
      <div className="flex justify-center items-center gap-4 p-16">
        {cards.map((card, index) => (
          <BookCard
            key={index}
            title={card.title}
            author={card.author}
            imageUrl={card.imageUrl}
            reverse={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
}
