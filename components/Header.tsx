"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "./LoginForm";
import RegisterForm from "./RegisterForm";
import SearchIcon from "@mui/icons-material/Search";

export default function Header() {
  const { user } = useAuth();
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  return (
    <header className="px-2 text-gray-700 shadow-sm py-4 bg-white flex justify-end gap-4 items-center border-b border-gray-300 sticky top-0 z-50">
      {!isLoginOpen ? (
        <>
          {user && <UserInformation user={user} />}

          {!user && (
            <>
              <button
                className="rounded-md uppercase font-semibold hover:text-gray-800 hover:font-bold"
                onClick={() => {
                  setLoginOpen(true);
                  setRegisterOpen(false);
                }}
              >
                Sign in
              </button>
              <button
                className="rounded-md uppercase font-semibold hover:text-gray-800 hover:font-bold"
                onClick={() => {
                  setRegisterOpen(true);
                  setLoginOpen(false);
                }}
              >
                Create Account
              </button>
            </>
          )}

          <button className="rounded-md uppercase font-semibold hover:text-gray-800 hover:font-bold">
            works
          </button>
          <button className="rounded-md uppercase font-semibold hover:text-gray-800 hover:font-bold">
            shelves
          </button>
          <button className="rounded-md uppercase font-semibold hover:text-gray-800 hover:font-bold">
            works
          </button>
          <button className="rounded-md uppercase font-semibold hover:text-gray-800 hover:font-bold">
            members
          </button>
          <SearchBar />
        </>
      ) : (
        <div className="flex gap-4 items-end">
          <button
            onClick={() => setLoginOpen(false)}
            className="mb-1.5 font-semibold"
          >
            x
          </button>
          <LoginModal onSubmit={() => setLoginOpen(false)} />
        </div>
      )}

      {isRegisterOpen && (
        <div className="absolute top-20 bg-gray-600 h-screen w-full flex justify-center">
          <div className="z-50 max-w-1/3 pt-5">
            <RegisterForm onSubmit={() => setRegisterOpen(false)} />
          </div>
        </div>
      )}
    </header>
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
        src={user.avatar_url || "/default_pfp.png"}
        alt="User Avatar"
        className="size-7 rounded-full object-cover border-1"
      />
      <div className="max-w-42 truncate block font-semibold">
        {user.username}
      </div>
    </div>
  );
}

function SearchBar() {
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
