import LoginForm from "@/components/auth/LoginForm";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function LoginDialog() {
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
          <DialogDescription className="text-center mt-2 mb-6">
            Welcome back! Enter your credentials to continue.
          </DialogDescription>
        </DialogHeader>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
}
