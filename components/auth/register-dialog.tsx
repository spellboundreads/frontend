import RegisterForm from "./RegisterForm";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";

export default function RegisterDialog() {
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
          <DialogDescription className="text-center mt-2 mb-6">
            Fill in the details to create your account.
          </DialogDescription>
        </DialogHeader>
        <RegisterForm />
      </DialogContent>
    </Dialog>
  );
}
