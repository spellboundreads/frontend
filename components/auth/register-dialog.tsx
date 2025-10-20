import RegisterForm from "./RegisterForm";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
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
        </DialogHeader>
        <RegisterForm />
      </DialogContent>
    </Dialog>
  );
}
