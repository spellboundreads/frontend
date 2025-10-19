"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { logout } from "@/api/auth";

export default function UserDropdown({
  user,
}: {
  user: { username: string; avatar_url?: string } | null;
}) {
  if (!user) return null;
  async function handleLogout() {
    await logout();
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
