import Link from "next/link";
export default function Chip({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <div className="bg-white text-gray-800 px-4 py-1 border-gray-500 rounded-full text-sm border-1 hover:shadow-md cursor-pointer">
      {href ? <Link href={href}>{children}</Link> : children}
    </div>
  );
}
