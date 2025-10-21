export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-32 px-32 py-6 text-black">
      {children}
      <aside className="flex flex-col gap-2 w-56">
        <div className="border-b border-gray-400 p-2 ">
          <h2 className="uppercase">Show results for</h2>
        </div>
        <ul className="flex-col flex px-2 text-sm overflow-y-auto ">
          <li className="p-2 hover:bg-gray-200 hover:text-gray-700 hover:font-semibold">
            <a href="#">Works</a>
          </li>
          <li className="p-2 hover:bg-gray-200 hover:text-gray-700 hover:font-semibold">
            <a href="#">Authors</a>
          </li>
          <li className="p-2 hover:bg-gray-200 hover:text-gray-700 hover:font-semibold">
            <a href="#">Shelves</a>
          </li>
          <li className="p-2 hover:bg-gray-200 hover:text-gray-700 hover:font-semibold">
            <a href="#">Members</a>
          </li>
        </ul>
      </aside>
    </div>
  );
}
