import SearchIcon from "@mui/icons-material/Search";

export default function Header() {
  return (
    <div className="shadow-sm bg-white flex justify-between items-center py-4 px-8 border-b border-gray-300 sticky top-0 z-50">
      <SearchBar />
      <UserInformation />
    </div>
  );
}

function UserInformation() {
  return (
    <div className="flex items-center gap-3">
      <img
        src={user.pfp}
        alt="User Avatar"
        className="w-10 h-10 rounded-full object-cover"
      />
      <span className="max-w-42 truncate block">{user.username}</span>
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
        className="flex-1 outline-none border-none ml-2"
      />
    </div>
  );
}

