"use client";
import { redirect } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = (event.target as HTMLFormElement).search.value;
    redirect(`/search?title=${query}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center border border-gray-300 rounded-full py-1 px-2 w-42"
    >
      <SearchIcon className="text-gray-500" />
      <input
        name="search"
        type="text"
        placeholder="Search..."
        className="flex-1 outline-none border-none ml-2 text-gray-700 text-xs"
      />
    </form>
  );
}
