"use client";
import Input from "@/components/Input";
import { login } from "@/app/actions/auth";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form className="flex flex-col gap-4 items-center" action={action}>
      {state?.message && (
        <p className="text-red-500 text-sm text-center">{state.message}</p>
      )}
      <Input label="Email" type="email" id="email" name="email" required />

      <Input
        label="password"
        type="password"
        id="password"
        name="password"
        required
      />

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      aria-disabled={pending}
      type="submit"
      className="rounded-sm uppercase font-bold border p-2 bg-black text-white  text-center max-h-1/2"
    >
      {pending ? "signing in..." : "sign in"}
    </button>
  );
}
