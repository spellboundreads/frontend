// "use client";
import { useAuth } from "@/context/AuthContext";
import SearchIcon from "@mui/icons-material/Search";

export default function Header() {
  const { user, logout } = useAuth();
  console.log("Header user:", user);  

  return (
    <div className="text-gray-700 shadow-sm bg-white flex justify-between items-center py-4 px-8 border-b border-gray-300 sticky top-0 z-50">
      <SearchBar />
      {user ? <UserInformation user={user} /> : <div>Hi</div>}
    </div>
  );
}

function UserInformation({
  user,
}: {
  user: { username: string; avatar_url?: string } | null;
}) {
  if (!user) return null; // or render a placeholder

  return (
    <div className="flex items-center gap-3">
      <img
        src={user.avatar_url || "/globe.svg"} // fallback in public folder
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
