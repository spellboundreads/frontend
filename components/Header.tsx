"use client";

import SearchIcon from "@mui/icons-material/Search";

export default function Header() {
  return (
    <div className=" text-gray-700 shadow-sm bg-white flex justify-between items-center py-4 px-8 border-b border-gray-300 sticky top-0 z-50">
      <SearchBar />
      <UserInformation user={user} />
    </div>
  );
}

function UserInformation({
  user,
}: {
  user: { username: string; pfp: string };
}) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={user.pfp}
        alt="User Avatar"
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="max-w-42 truncate block font-semibold">
        {user.username}
      </div>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="flex items-center border border-gray-300 rounded-full py-2 px-4 w-96">
      <SearchIcon className="text-gray-500" />
      <input
        type="text"
        placeholder="Search books, authors, genres..."
        className="flex-1 outline-none border-none ml-2 text-gray-700 "
      />
    </div>
  );
}
