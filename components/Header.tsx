// "use client";
import { useAuth } from "@/context/AuthContext";
import SearchIcon from "@mui/icons-material/Search";

export default function Header({
  onLoginClick,
  onRegisterClick,
}: {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}) {
  const { user, login, register } = useAuth();

  return (
    <div className="px-2 text-gray-700 shadow-sm h-20 bg-white flex justify-end gap-4 items-center  border-b border-gray-300 sticky top-0 z-50">
      {user ? <UserInformation user={user} /> : <div>Hi</div>}
      {!user && (
        <>
          <button
            className="rounded-md uppercase font-semibold"
            onClick={onLoginClick}
          >
            Sign in
          </button>
          <button
            className="rounded-md uppercase font-semibold"
            onClick={onRegisterClick}
          >
            Create Account
          </button>
        </>
      )}
      <SearchBar />
    </div>
  );
}

function UserInformation({
  user,
}: {
  user: { username: string; avatar_url?: string } | null;
}) {
  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      <img
        src={user.avatar_url || "/globe.svg"}
        alt="User Avatar"
        className="w-8 h-8 rounded-full object-cover"
      />
      <div className="max-w-42 truncate block font-semibold">
        {user.username}
      </div>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="flex items-center border border-gray-300 rounded-full py-1 px-2 w-56">
      <SearchIcon className="text-gray-500" />
      <input
        type="text"
        placeholder="Search..."
        className="flex-1 outline-none border-none ml-2 text-gray-700 "
      />
    </div>
  );
}
