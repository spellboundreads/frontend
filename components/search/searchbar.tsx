"use client";

import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  return (
    <div className="flex items-center border border-gray-300 rounded-full py-1 px-2 w-42">
      <SearchIcon className="text-gray-500" />
      <input
        type="text"
        placeholder="Search..."
        className="flex-1 outline-none border-none ml-2 text-gray-700 text-xs"
      />
    </div>
  );
}
