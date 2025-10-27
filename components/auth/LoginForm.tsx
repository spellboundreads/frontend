"use client";
import Input from "@/components/Input";
import { ErrorMessage, FieldError } from "@/components/form/error";
import { login } from "@/app/actions/auth";
import { useFormStatus } from "react-dom";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.message && state.message === "Success") {
      toast.success("Login successful!");
      router.push("/works");
    }
  }, [state]);
  return (
    <form className="flex flex-col gap-4 " action={action}>
      {state?.message && <ErrorMessage message={state.message} />}
      <div className="flex flex-col gap-2">
        <Input label="Email" id="email" name="email" required />
        {state?.errors?.email && <FieldError message={state.errors.email[0]} />}
      </div>
      <Input
        label="password"
        type="password"
        id="password"
        name="password"
        required
      />
      <button
        aria-disabled={pending}
        type="submit"
        className={`rounded-sm uppercase font-bold border p-2 bg-black text-white  text-center max-h-1/2 ${
          pending ? "bg-gray-400 cursor-not-allowed" : "bg-black"
        }`}
      >
        {pending ? "signing in..." : "sign in"}
      </button>
    </form>
  );
}
