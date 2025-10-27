import RegisterDialog from "@/components/auth/register-dialog";
import LoginDialog from "@/components/auth/login-dialog";
import UserDropdown from "@/components/user/dropdown";
import SearchBar from "./search/searchbar";
import { User } from "@/types/user";

export default function Header({ user }: { user: User | null }) {
  return (
    <header className="px-2 text-gray-700 shadow-sm py-4 bg-white flex justify-end gap-4 items-center border-b border-gray-300 sticky top-0 z-50">
      {!user ? (
        <>
          <LoginDialog />
          <RegisterDialog />
        </>
      ) : (
        <UserDropdown user={user} />
      )}
      <button className="rounded-md uppercase font-semibold hover:text-gray-800 hover:font-bold">
        works
      </button>
      <button className="rounded-md uppercase font-semibold hover:text-gray-800 hover:font-bold">
        shelves
      </button>
      <button className="rounded-md uppercase font-semibold hover:text-gray-800 hover:font-bold">
        members
      </button>
      <SearchBar />
    </header>
  );
}
