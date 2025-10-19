import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import UserDropdown from "@/components/user/dropdown";
import { getMeServer } from "@/api/auth.server";
import SearchBar from "./search/searchbar";
export default async function Header() {
  let user = null;
  try {
    user = await getMeServer();
  } catch (error) {
    console.error("Error fetching user:", error);
  }

  return (
    <header className="px-2 text-gray-700 shadow-sm py-4 bg-white flex justify-end gap-4 items-center border-b border-gray-300 sticky top-0 z-50">
      {user && <UserDropdown user={user} />}

      {!user && (
        <>
          <LoginDialog />
          <RegisterDialog />
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
    </header>
  );
}

function RegisterDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-md uppercase font-semibold hover:text-gray-800 hover:font-bold">
          Create Account
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={`text-3xl text-center`}>
            Create an Account
          </DialogTitle>
        </DialogHeader>
        <RegisterForm />
      </DialogContent>
    </Dialog>
  );
}

function LoginDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-md uppercase font-semibold hover:text-gray-800 hover:font-bold">
          Sign In
        </button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center w-fit py-12 px-24">
        <DialogHeader>
          <DialogTitle className={`text-3xl text-center`}>Sign In</DialogTitle>
        </DialogHeader>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
}
