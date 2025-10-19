"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import SearchIcon from "@mui/icons-material/Search";
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

export default function Header() {
  const { user } = useAuth();

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

function UserDropdown({
  user,
}: {
  user: { username: string; avatar_url?: string } | null;
}) {
  if (!user) return null;
  function handleLogout() {
    localStorage.removeItem("accessToken");
    window.location.reload();
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-sm bg-transparent border-none shadow-none text-gray-800 hover:bg-[#f0f0f0] hover:text-gray-800 p-1.5">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar_url || "/placeholder/user.png"}
              alt="User Avatar"
              className="size-7 rounded-full object-cover border-1"
            />
            <div className="max-w-42 truncate block font-semibold">
              {user.username}
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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
          <DialogDescription className="mt-2 text-sm text-center text-gray-800">
            Discover your next favorite books.
          </DialogDescription>
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
          <DialogDescription className="mt-2 text-sm text-center text-gray-800">
            Welcome back! Please enter your details.
          </DialogDescription>
        </DialogHeader>
        <LoginForm />
      </DialogContent>
    </Dialog>
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
